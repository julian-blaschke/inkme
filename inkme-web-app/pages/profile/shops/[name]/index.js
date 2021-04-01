import { DashboardLayout } from "@/components/DashboardLayout";
import { List } from "@/components/List";
import { ShopMenu } from "@/components/menu/shopMenu";
import { useCollection, useDocument } from "@/firebase/hooks";
import { SHOP, SHOP_ARTISTS } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { mapArtists } from "lib/utils/mappers";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function Shop() {
  const { user } = useAuth();
  const { query } = useRouter();
  const { name } = query;

  const shopRef = useMemo(() => SHOP(name), [name]);
  const [shop] = useDocument(shopRef, "name");

  const artistsRef = useMemo(() => SHOP_ARTISTS(shop?.artists), [shop?.artists]);
  const [artists, artistsLoading] = useCollection(artistsRef, "username");

  return (
    <DashboardLayout title={name} menu={<ShopMenu name={name} />}>
      <List title="coworkers here" data={mapArtists(artists)?.filter((artist) => artist.username == user?.uid)} isLoading={artistsLoading}></List>
    </DashboardLayout>
  );
}
