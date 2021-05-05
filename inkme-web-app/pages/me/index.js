import { Avatar } from "@/components/Avatar";
import { Section } from "@/components/layout/Section";
import { SideBarLayout } from "@/components/layout/SideBarLayout";
import { List } from "@/components/List";
import { useCollection, useDocument } from "@/firebase/hooks";
import { ARTIST, MY_GUEST_SPOTS, MY_INVITES, MY_SHOPS } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { mapGuestSpots, mapMyInvites, mapShops } from "lib/utils/mappers";
import { useMemo } from "react";

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
    <SideBarLayout>
      <Section title="Dashboard" variant="h1" rightElement={<Avatar img={profile?.img} />} />
      <Section
        id="shops"
        title="My Shops"
        subtitle="Here are your current shops & upcomming guestspots listed. You can view every shop individually to manage settings or adjust dates/cancel any upcomming guestspot."
      >
        <List title="my shops" data={mapShops(shops)} isLoading={shopsLoading} maxCols={3} />
      </Section>
      <Section
        id="guestspots"
        title="My Guest spots"
        subtitle="Here are your current shops & upcomming guestspots listed. You can view every shop individually to manage settings or adjust dates/cancel any upcomming guestspot."
      >
        <List maxCols={3} title="upcoming guestspots" data={mapGuestSpots(guestSpots)} isLoading={guestSpotsLoading}></List>
        <List maxCols={3} title="guestspots from last month" data={mapGuestSpots(guestSpots)} isLoading={guestSpotsLoading}></List>
      </Section>
      <Section
        id="invites"
        title="Invitations"
        subtitle="This is your inbox for all pending invites to either join-, or have a guest spot at a shop."
      >
        <List maxCols={3} title="invitations" data={mapMyInvites(invites)} isLoading={invitesLoading}></List>
      </Section>
    </SideBarLayout>
  );
}
