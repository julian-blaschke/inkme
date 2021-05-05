import { Avatar } from "@/components/Avatar";
import { Section } from "@/components/layout/Section";
import { SideBarLayout } from "@/components/layout/SideBarLayout";
import { List } from "@/components/List";
import { Header } from "@/components/PublicProfileHeader";
import { admin } from "@/firebase/admin";
import { Container, Divider } from "@chakra-ui/layout";
import { mapFirestoreCol, mapFirestoreDoc } from "lib/utils/helpers";
import { mapPublicArtists, mapPublicGuestSpotsShop, mapShop } from "lib/utils/mappers";
import { useMemo } from "react";

const sublinks = [
  { href: "#guestspots", title: "Guest Spots" },
  { href: "#artists", title: "Artists" },
  { href: "#posts", title: "Posts" },
];

export default function Artist({ shop, artists, guestSpots }) {
  const { title, img } = shop;
  return (
    <SideBarLayout links={[{ href: `/shops/${title}`, title, sublinks }]}>
      <Section variant="h1" title={title} rightElement={<Avatar img={img} />} />
      <Section id="guestspots" title="Guest Spots" subtitle="Check out upcoming guest spots from other artists.">
        <List maxCols={3} title="upcoming guestpots" data={guestSpots}></List>
      </Section>
      <Section
        id="artists"
        title="Artists working here"
        subtitle="Check out who is currently working here. You can also go down the rabbithole & check out these artists and other shops that they are working at."
      >
        <List maxCols={3} title="shops" data={artists} />
      </Section>
      <Section id="posts" title="Instagram Posts" subtitle="Check out Instagram posts."></Section>
    </SideBarLayout>
  );
}

export async function getStaticProps(context) {
  const { name } = context.params;
  const db = admin.firestore();

  const shopDoc = db.collection("shops").doc(name);
  const shopRaw = await shopDoc.get();
  if (!shopRaw.exists) return { notFound: true };
  const shopData = mapFirestoreDoc(shopRaw, "name");

  const artists = mapPublicArtists(shopData._artists);

  const shop = mapShop(shopData);

  const guestSpotsCol = db.collectionGroup("guestspots").where("shop", "==", name);
  const guestSpotsRaw = await guestSpotsCol.get();
  const guestSpotsWithFirestoreDates = mapFirestoreCol(guestSpotsRaw);
  const guestSpots = mapPublicGuestSpotsShop(guestSpotsWithFirestoreDates);

  return { props: { shop, artists, guestSpots } };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
