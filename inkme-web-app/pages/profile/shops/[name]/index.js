import { DashboardLayout } from "@/components/DashboardLayout";
import { ShopMenu } from "@/components/menu/shopMenu";
import { useDocument } from "@/firebase/hooks";
import { SHOP } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function Shop() {
  const { user } = useAuth();
  const { query } = useRouter();
  const { name } = query;

  const shopRef = useMemo(() => SHOP(name), [name]);
  const [shop] = useDocument(shopRef, "name");

  return <DashboardLayout title={name} menu={<ShopMenu name={name} />}></DashboardLayout>;
}
