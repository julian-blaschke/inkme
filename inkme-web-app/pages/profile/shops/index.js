import { DashboardLayout } from "@/components/DashboardLayout";
import { List } from "@/components/List";
import { CreateShopModal } from "@/components/modals/CreateShopModal";
import { useCollection } from "@/firebase/hooks";
import { MY_SHOPS } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { Divider } from "@chakra-ui/layout";
import { mapShops } from "lib/utils/mappers";
import { useMemo } from "react";

export default function Shops() {
  const { user } = useAuth();

  const shopsRef = useMemo(() => MY_SHOPS(user?.uid), [user]);
  const [shops, shopsLoading] = useCollection(shopsRef, "name");

  return (
    <DashboardLayout title="Shops" subtitle="where we come together.">
      <List title="shops" data={mapShops(shops)} isLoading={shopsLoading}></List>
      <CreateShopModal />
      <Divider py={4} variant="dashed" size="md" />
      <List title="guestspots"></List>
    </DashboardLayout>
  );
}
