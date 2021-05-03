import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GridLayoutItem } from "@/components/layout/GridLayout";
import { List } from "@/components/List";
import { PrivatePageHeader } from "@/components/PrivatePageHeader";
import { useCollection, useDocument } from "@/firebase/hooks";
import { ARTIST, MY_GUEST_SPOTS, MY_INVITES, MY_SHOPS } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { SimpleGrid } from "@chakra-ui/layout";
import { mapGuestSpots, mapMyInvites, mapShops } from "lib/utils/mappers";
import Link from "next/link";
import { useMemo } from "react";

function SideBarLinks() {
  return (
    <>
      <Link href="#shops">Shops & Guest spots</Link>
      <Link href="#invites">Invitations</Link>
    </>
  );
}

export default function DashBoard() {
  const { user } = useAuth();

  const profileRef = useMemo(() => ARTIST(user?.uid), [user]);
  const [profile] = useDocument(profileRef);

  const shopsRef = useMemo(() => MY_SHOPS(user?.uid), [user]);
  const [shops, shopsLoading] = useCollection(shopsRef, "name");

  const guestSpotsRef = useMemo(() => MY_GUEST_SPOTS(user?.uid), [user]);
  const [guestSpots, guestSpotsLoading] = useCollection(guestSpotsRef, "name");

  const invitesRef = useMemo(() => MY_INVITES(user?.uid), [user]);
  const [invites, invitesLoading] = useCollection(invitesRef, "username");

  return (
    <DashboardLayout
      header={
        <PrivatePageHeader
          title="Dashboard"
          quickLinksTitle="Your Profile"
          img={profile?.img}
          link={<Link href="settings">settings</Link>}
        ></PrivatePageHeader>
      }
      linkList={<SideBarLinks />}
    >
      <GridLayoutItem
        id="shops"
        title="Shops & Guest spots"
        subtitle="Here are your current shops & upcomming guestspots listed. You can view every shop individually to manage settings or adjust dates/cancel any upcomming guestspot."
      >
        <SimpleGrid columns={{ xl: 2 }} gap={{ md: 16 }} spacing="12">
          <List title="my shops" data={mapShops(shops)} isLoading={shopsLoading} gridProps={{ columns: { base: 1, md: 2, xl: 1 } }}></List>
          <List columns={2} title="my guest spots" data={mapGuestSpots(guestSpots)} isLoading={guestSpotsLoading}></List>
        </SimpleGrid>
      </GridLayoutItem>
      <GridLayoutItem
        id="invites"
        title="Invitations"
        subtitle="This is your inbox for all pending invites to either join-, or have a guest spot at a shop."
      >
        <SimpleGrid columns={{ xl: 2 }} gap={16} rowGap={20} spacing="12">
          <List title="invitations" data={mapMyInvites(invites)} isLoading={invitesLoading} gridProps={{ columns: { base: 1, md: 2, xl: 1 } }}></List>
        </SimpleGrid>
      </GridLayoutItem>
    </DashboardLayout>
  );
}
