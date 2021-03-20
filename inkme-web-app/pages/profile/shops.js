import { Center } from "@chakra-ui/layout";

import { DashboardLayout } from "@/components/DashboardLayout";
import { CreateShopModal } from "@/components/modals/CreateShopModal";
import { List } from "@/components/List";
import { mapShops } from "lib/utils/mappers";
import { useOwnShops } from "@/firebase/hooks/useOwnShops";

export default function Messages() {
  const shops = useOwnShops();

  return (
    <DashboardLayout title="Shops">
      <List title="guest spots" data={mapShops(shops)}></List>
      <Center py={4}>
        <CreateShopModal />
      </Center>
      <List title="my guestspots"></List>
    </DashboardLayout>
  );
}
