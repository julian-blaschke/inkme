import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GridLayoutItem } from "@/components/layout/GridLayout";
import { PrivatePageHeader } from "@/components/PrivatePageHeader";
import { useDocument } from "@/firebase/hooks";
import { SHOP } from "@/firebase/queries";
import { Link, SimpleGrid } from "@chakra-ui/layout";
import { mapShop } from "lib/utils/mappers";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

function SideBarLinks() {
  return (
    <>
      <Link href="#artists">General Settings</Link>
      <Link href="#guestspots">Security & Privacy</Link>
      <Link href="#invites">Account Settings</Link>
    </>
  );
}

export default function ShopSettings() {
  const { shopname } = useRouter().query;

  const shopRef = useMemo(() => SHOP(shopname), [shopname]);
  const [shop] = useDocument(shopRef, "name");

  return (
    <DashboardLayout
      header={
        <PrivatePageHeader
          title="Settings"
          subtitle={`settings for ${shopname}`}
          quickLinksTitle="Shop"
          img={mapShop(shop)?.img}
          link={<NextLink href={`/me/${shopname}`}>{shopname}</NextLink>}
        />
      }
      linkList={<SideBarLinks />}
    >
      <GridLayoutItem id="general" title="General Settings" subtitle=""></GridLayoutItem>
    </DashboardLayout>
  );
}
