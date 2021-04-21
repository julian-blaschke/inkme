import { List, TwoListLayout } from "@/components/List";
import { Header } from "@/components/PublicProfileHeader";
import { admin } from "@/firebase/admin";
import { Container, Divider } from "@chakra-ui/layout";
import { mapFirestoreCol, mapFirestoreDoc } from "lib/utils/helpers";
import { mapPublicGuestSpotArtist, mapPublicGuestSpotsArtist, mapPublicGuestSpotsShop, mapShopsArtist } from "lib/utils/mappers";
import { useMemo } from "react";

function MainContent({ shops, guestSpots }) {
  const listsAreOfEqualLength = useMemo(() => shops?.length === guestSpots?.length, [shops, guestSpots]);

  return (
    <Container px={8}>
      <TwoListLayout listsAreOfEqualLength={listsAreOfEqualLength}>
        {shops?.length > 0 && <List title="currently works at" columns={listsAreOfEqualLength ? 1 : 2} data={shops}></List>}
        {guestSpots?.length > 0 && <List title="current guestspots" columns={listsAreOfEqualLength ? 1 : 2} data={guestSpots}></List>}
      </TwoListLayout>
    </Container>
  );
}

export default function Artist({ artist, shops, guestSpots }) {
  const { username, bio, img } = artist;
  return (
    <>
      <Header title={username} subtitle={bio} avatar={img} />
      <Divider py={4} />
      <MainContent {...{ shops, guestSpots }} />
    </>
  );
}

export async function getStaticProps(context) {
  // TODO: maybe replace with queries stored in the firebase directory & make error handling robust
  try {
    const { username } = context.params;
    const db = admin.firestore();

    const artistDoc = db.collection("artists").doc(username);
    const artistRaw = await artistDoc.get();
    const artist = mapFirestoreDoc(artistRaw, "username");

    const shopsCol = db.collection("shops").where("artists", "array-contains", username);
    const shopsRaw = await shopsCol.get();
    const shopsData = mapFirestoreCol(shopsRaw, "name");
    const shops = mapShopsArtist(shopsData, artist.username);

    const guestSpotsCol = db.collectionGroup("guestspots").where("artist", "==", username);
    const guestSpotsRaw = await guestSpotsCol.get();
    const guestSpotsWithFirestoreDates = mapFirestoreCol(guestSpotsRaw);
    const guestSpots = mapPublicGuestSpotsArtist(guestSpotsWithFirestoreDates);

    return { props: { artist, shops, guestSpots } };
  } catch ({ message }) {
    console.log(message);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
