import { List, TwoListLayout } from "@/components/List";
import { Header } from "@/components/PublicProfileHeader";
import { admin } from "@/firebase/admin";
import { Container, Divider } from "@chakra-ui/layout";
import { mapFirestoreCol, mapFirestoreDoc } from "lib/utils/helpers";
import { mapPublicArtists, mapPublicGuestSpotsShop } from "lib/utils/mappers";
import { useMemo } from "react";

function MainContent({ artists, guestSpots }) {
  const listsAreOfEqualLength = useMemo(() => artists?.length === guestSpots?.length, [artists, guestSpots]);

  return (
    <Container px={8}>
      <TwoListLayout listsAreOfEqualLength={listsAreOfEqualLength}>
        {artists?.length > 0 && <List title="artists working here" columns={listsAreOfEqualLength ? 1 : 2} data={artists}></List>}
        {guestSpots?.length > 0 && <List title="current guestspots" columns={listsAreOfEqualLength ? 1 : 2} data={guestSpots}></List>}
      </TwoListLayout>
    </Container>
  );
}

export default function Artist({ shop, artists, guestSpots }) {
  return (
    <>
      <Header title={shop.name} subtitle={shop.bio} avatar={shop.img} />
      <Divider py={4} />
      <MainContent {...{ artists, guestSpots }} />
    </>
  );
}

export async function getStaticProps(context) {
  // TODO: maybe replace with queries stored in the firebase directory & make error handling robust
  try {
    const { name } = context.params;
    const db = admin.firestore();

    const shopDoc = db.collection("shops").doc(name);
    const shopRaw = await shopDoc.get();
    if (!shopRaw.exists) return { notFound: true };
    const shop = mapFirestoreDoc(shopRaw, "name");

    const artists = mapPublicArtists(shop._artists);
    delete shop._artists;

    const guestSpotsCol = db.collectionGroup("guestspots").where("shop", "==", name);
    const guestSpotsRaw = await guestSpotsCol.get();
    const guestSpotsWithFirestoreDates = mapFirestoreCol(guestSpotsRaw);
    console.log(guestSpotsWithFirestoreDates);
    const guestSpots = mapPublicGuestSpotsShop(guestSpotsWithFirestoreDates);

    return { props: { shop, artists, guestSpots } };
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
