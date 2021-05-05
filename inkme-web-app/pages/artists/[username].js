import { Avatar } from "@/components/Avatar";
import { Section } from "@/components/layout/Section";
import { SideBarLayout } from "@/components/layout/SideBarLayout";
import { List } from "@/components/List";
import { admin } from "@/firebase/admin";
import { mapFirestoreCol, mapFirestoreDoc } from "lib/utils/helpers";
import { mapPublicGuestSpotsArtist, mapShopsArtist } from "lib/utils/mappers";

const sublinks = [
  { href: "#guestspots", title: "Guest Spots" },
  { href: "#shops", title: "Shops" },
  { href: "#posts", title: "Posts" },
];

export default function Artist({ artist, shops, guestSpots }) {
  const { username, bio, img } = artist;
  return (
    <SideBarLayout links={[{ href: `/artists/${username}`, title: username, sublinks }]}>
      <Section variant="h1" title={username} subtitle={bio} rightElement={<Avatar img={img} />} />
      <Section id="guestspots" title="Guest Spots" subtitle={`Check out where & when ${username} is going to be guest-spotting at.`}>
        <List maxCols={3} title="upcoming guestpots" data={guestSpots}></List>
      </Section>
      <Section
        id="shops"
        title="Shops"
        subtitle={`Check out where ${username} is currently working at. You can also go down the rabbithole & check out these Shops and other artists that are working at this Shop.`}
      >
        <List maxCols={3} title="shops" data={shops} />
      </Section>
      <Section id="posts" title="Instagram Posts" subtitle={`Check out ${username}'s work via Instagram.`}></Section>
    </SideBarLayout>
  );
}

export async function getStaticProps(context) {
  const { username } = context.params;
  const db = admin.firestore();

  const artistDoc = db.collection("artists").doc(username);
  const artistRaw = await artistDoc.get();
  if (!artistRaw.exists) return { notFound: true };

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
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
