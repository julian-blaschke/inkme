import { Avatar } from "@/components/Avatar";
import { Section } from "@/components/layout/Section";
import { SideBarLayout } from "@/components/layout/SideBarLayout";
import { List } from "@/components/List";
import { InviteArtistsToGuestSpotModal } from "@/components/modals/InviteArtistsToGuestSpotModal";
import { InviteArtistsToShopModal } from "@/components/modals/InviteArtistsToShopModal";
import { useCollection, useDocument } from "@/firebase/hooks";
import { ALL_GUEST_SPOTS, ALL_INVITES, SHOP } from "@/firebase/queries";
import { SimpleGrid } from "@chakra-ui/layout";
import { mapInvites, mapPublicArtists, mapPublicGuestSpotsShop, mapShop } from "lib/utils/mappers";
import { useRouter } from "next/router";
import { useMemo } from "react";

const sublinks = [
  { href: "#artists", title: "Artists" },
  { href: "#guestspots", title: "Guest spots" },
  { href: "#invites", title: "Invitations" },
  { href: "#settings", title: "Settings" },
];

export default function MyShop() {
  const { shopname } = useRouter().query;

  const shopRef = useMemo(() => SHOP(shopname), [shopname]);
  const [shop, shopLoading] = useDocument(shopRef, "name");

  const guestSpotsRef = useMemo(() => ALL_GUEST_SPOTS(shopname), [shopname]);
  const [guestSpots, guestSpotsLoading] = useCollection(guestSpotsRef, "username");

  const invitesRef = useMemo(() => ALL_INVITES(shopname), [shopname]);
  const [invites, invitesLoading] = useCollection(invitesRef, "username");

  const shopLinks = useMemo(() => [{ title: shop?.name, href: `/me/${shop?.name}`, sublinks }], [shop]);

  return (
    <SideBarLayout links={shopLinks}>
      <Section title={shop?.name} variant="h1" rightElement={<Avatar img={mapShop(shop)?.img} />}></Section>
      <Section
        id="artists"
        title="Artists working here"
        subtitle="Here are all artists listed that currently work at this shop, whatever their role may be."
        rightElement={<InviteArtistsToShopModal shop={shopname} />}
      >
        <List maxCols={3} title="artists" data={mapPublicArtists(shop?._artists)} isLoading={shopLoading} />
      </Section>
      <Section
        id="guestspots"
        title="Guest Spots here"
        subtitle="Here are upcoming, as well as past guestspots listed. It is here where you can modify & cancel upcoming guest spots."
        rightElement={<InviteArtistsToGuestSpotModal />}
      >
        <SimpleGrid columns={1} gap={{ md: 4 }} spacing="12">
          <List
            title="upcoming guest spots"
            data={mapPublicGuestSpotsShop(guestSpots)}
            isLoading={guestSpotsLoading}
            gridProps={{ columns: { base: 1, sm: 2 } }}
          ></List>
          <List
            title="past guest spots"
            data={mapPublicGuestSpotsShop(guestSpots)}
            isLoading={guestSpotsLoading}
            gridProps={{ columns: { base: 1, sm: 2 } }}
          ></List>
        </SimpleGrid>
      </Section>
      <Section
        id="invites"
        title="Invitations"
        subtitle="All invites sent of this shop are listed here. Artists can be invited to either work-, or to have a guest spot at this shop. (Tip: delete an invitation once it has been accepted/rejected. Otherwise, it will take up unnecessary space)"
      >
        <SimpleGrid columns={1} gap={{ md: 16 }} spacing="12">
          <List maxCols={3} title="invitations" data={mapInvites(invites)} isLoading={invitesLoading}></List>
        </SimpleGrid>
      </Section>
      <Section id="settings" title="Settings" subtitle="Manage shop preferences."></Section>
    </SideBarLayout>
  );
}
