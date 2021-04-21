import { DashboardLayout } from "@/components/DashboardLayout";
import { List } from "@/components/List";
import { InviteArtistsToShopModal } from "@/components/modals/InviteArtistsToShopModal";
import { useCollection, useDocument } from "@/firebase/hooks";
import { ALL_INVITES, SHOP, SHOP_ARTISTS } from "@/firebase/queries";
import { useAuth } from "@/hooks/useAuth";
import { mapArtists, mapInvites } from "lib/utils/mappers";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function Artists() {
  const { name } = useRouter().query;
  const { user } = useAuth();

  const shopRef = useMemo(() => SHOP(name), [name]);
  const [shop, shopLoading] = useDocument(shopRef, "name");

  const invitesRef = useMemo(() => ALL_INVITES(name), [name]);
  const [invites, invitesLoading] = useCollection(invitesRef, "invitee");

  return (
    <DashboardLayout title="Artists" subtitle="manage artists that are working here">
      <List title="coworkers here" data={mapArtists(shop?._artists?.filter((a) => a.artist !== user.uid))} isLoading={shopLoading}></List>
      <List title="invites for this shop" data={mapInvites(invites)} isLoading={invitesLoading}></List>
      <InviteArtistsToShopModal shop={name} />
    </DashboardLayout>
  );
}
