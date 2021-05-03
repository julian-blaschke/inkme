import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GridLayoutItem } from "@/components/layout/GridLayout";
import { List } from "@/components/List";
import { InviteArtistsToGuestSpotModal } from "@/components/modals/InviteArtistsToGuestSpotModal";
import { InviteArtistsToShopModal } from "@/components/modals/InviteArtistsToShopModal";
import { PrivatePageHeader } from "@/components/PrivatePageHeader";
import { useCollection, useDocument } from "@/firebase/hooks";
import { ALL_GUEST_SPOTS, ALL_INVITES, SHOP } from "@/firebase/queries";
import { Link, SimpleGrid } from "@chakra-ui/layout";
import { mapInvites, mapPublicArtists, mapPublicGuestSpotsShop, mapShop } from "lib/utils/mappers";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

function SideBarLinks() {
  return (
    <>
      <Link href="#artists">Artists</Link>
      <Link href="#guestspots">Guest spots</Link>
      <Link href="#invites">Invitations</Link>
    </>
  );
}

export default function MyShop() {
  const { shopname } = useRouter().query;

  const shopRef = useMemo(() => SHOP(shopname), [shopname]);
  const [shop, shopLoading] = useDocument(shopRef, "name");

  const guestSpotsRef = useMemo(() => ALL_GUEST_SPOTS(shopname), [shopname]);
  const [guestSpots, guestSpotsLoading] = useCollection(guestSpotsRef, "username");

  const invitesRef = useMemo(() => ALL_INVITES(shopname), [shopname]);
  const [invites, invitesLoading] = useCollection(invitesRef, "username");

  return (
    <DashboardLayout
      header={
        <PrivatePageHeader
          title={shopname}
          quickLinksTitle="Shop"
          img={mapShop(shop)?.img}
          link={<NextLink href={`/me/${shopname}/settings`}>settings</NextLink>}
        />
      }
      linkList={<SideBarLinks />}
    >
      <GridLayoutItem
        id="artists"
        title="Artists working here"
        subtitle="Here are all artists listed that currently work at this shop, whatever their role may be."
        rightItem={<InviteArtistsToShopModal shop={shopname} />}
      >
        <SimpleGrid columns={1} gap={{ md: 16 }} spacing="12">
          <List title="artists" data={mapPublicArtists(shop?._artists)} isLoading={shopLoading} gridProps={{ columns: { base: 1, sm: 2 } }}></List>
        </SimpleGrid>
      </GridLayoutItem>
      <GridLayoutItem
        id="guestspots"
        title="Guest Spots here"
        subtitle="Here are upcoming, as well as past guestspots listed. It is here where you can modify & cancel upcoming guest spots."
        rightItem={<InviteArtistsToGuestSpotModal />}
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
      </GridLayoutItem>
      <GridLayoutItem
        id="invites"
        title="Invitations"
        subtitle="All invites sent of this shop are listed here. Artists can be invited to either work-, or to have a guest spot at this shop. (Tip: delete an invitation once it has been accepted/rejected. Otherwise, it will take up unnecessary space)"
      >
        <SimpleGrid columns={1} gap={{ md: 16 }} spacing="12">
          <List title="invitations" data={mapInvites(invites)} isLoading={invitesLoading} gridProps={{ columns: { base: 1, xl: 2 } }}></List>
        </SimpleGrid>
      </GridLayoutItem>
    </DashboardLayout>
  );
}
