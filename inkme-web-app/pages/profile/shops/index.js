import { Center } from "@chakra-ui/layout";

import { DashboardLayout } from "@/components/DashboardLayout";
import { CreateShopModal } from "@/components/modals/CreateShopModal";
import { List } from "@/components/List";
import { mapShops } from "lib/utils/mappers";
import { useCollection } from "@/firebase/hooks";
import { useAuth } from "@/hooks/useAuth";
import { MY_SHOPS } from "@/firebase/queries";
import { useMemo } from "react";

export default function Messages() {
  console.log("rerender");
  const { user } = useAuth();
  const shopsRef = useMemo(() => MY_SHOPS(user?.uid), [user]);
  const [shops, isLoading] = useCollection(shopsRef, "name");

  return (
    <DashboardLayout title="Shops">
      <List title="my shops" data={mapShops(shops)} isLoading={isLoading}></List>
      <Center py={4}>
        <CreateShopModal />
      </Center>
      <List title="my guestspots"></List>
    </DashboardLayout>
  );
}
