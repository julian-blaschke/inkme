import { DashboardLayout } from "@/components/DashboardLayout";
import { List } from "@/components/List";
import { MyInviteMenu } from "@/components/menu/MyInviteMenu";
import { CreateShopModal } from "@/components/modals/CreateShopModal";
import { useCollection } from "@/firebase/hooks";
import { MY_INVITES, MY_SHOPS } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { Center, Divider } from "@chakra-ui/layout";
import { mapMyInvites, mapShops } from "lib/utils/mappers";
import { useMemo } from "react";

export default function Shops() {
  const { user } = useAuth();

  const shopsRef = useMemo(() => MY_SHOPS(user?.uid), [user]);
  const [shops, shopsLoading] = useCollection(shopsRef, "name");

  const invitesRef = useMemo(() => MY_INVITES(user?.uid), [user]);
  const [invites, invitesLoading] = useCollection(invitesRef, "username");

  return (
    <DashboardLayout title="Shops 🛋" subtitle="where we come together.">
      <List title="my shops" data={mapShops(shops)} isLoading={shopsLoading}></List>
      <Center py={4}>
        <CreateShopModal />
      </Center>
      <Divider py={8} variant="dashed" />
      <List title="my guestspots"></List>
      <List title="my invites" data={mapMyInvites(invites)} isLoading={invitesLoading} Menu={MyInviteMenu}></List>
    </DashboardLayout>
  );
}
