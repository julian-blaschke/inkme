import { DashboardLayout } from "@/components/DashboardLayout";
import { List } from "@/components/List";
import { MyInviteMenu } from "@/components/menu/MyInviteMenu";
import { CreateShopModal } from "@/components/modals/CreateShopModal";
import { useCollection } from "@/firebase/hooks";
import { MY_GUEST_SPOTS, MY_INVITES, MY_SHOPS } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { Center, Divider } from "@chakra-ui/layout";
import { mapGuestSpots, mapMyInvites, mapShops } from "lib/utils/mappers";
import { useMemo } from "react";

export default function Shops() {
  const { user } = useAuth();

  const invitesRef = useMemo(() => MY_INVITES(user?.uid), [user]);
  const [invites, invitesLoading] = useCollection(invitesRef, "username");

  const guestSpotsRef = useMemo(() => MY_GUEST_SPOTS(user?.uid), [user]);
  const [guestSpots, guestSpotsLoading] = useCollection(guestSpotsRef);

  return (
    <DashboardLayout title="Invites" subtitle="manage invites for shops & guestspots">
      <List title="shop invites" emptyMessage="no inbox 📭" data={mapMyInvites(invites)} isLoading={invitesLoading} Menu={MyInviteMenu}></List>
      <Divider py={4} variant="dashed" size="md" />
      <List title="guestspots invites" emptyMessage="no inbox 📭" data={mapGuestSpots(guestSpots)} isLoading={guestSpotsLoading}></List>
    </DashboardLayout>
  );
}
