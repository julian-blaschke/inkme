import { DashboardLayout } from "@/components/DashboardLayout";
import { List } from "@/components/List";
import { InviteArtistsToShopModal } from "@/components/modals/InviteArtistsToShopModal";
import { useCollection, useDocument } from "@/firebase/hooks";
import { ALL_INVITES, SHOP, SHOP_ARTISTS } from "@/firebase/queries";
import { mapArtists, mapInvites } from "lib/utils/mappers";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function Shop() {
  const { query } = useRouter();
  const { name } = query;

  const shopRef = useMemo(() => SHOP(name), [name]);
  const [shop] = useDocument(shopRef, "name");

  const artistsRef = useMemo(() => SHOP_ARTISTS(shop?.artists), [shop?.artists]);
  const [artists, artistsLoading] = useCollection(artistsRef, "username");

  const invitesRef = useMemo(() => ALL_INVITES(name), [name]);
  const [invites, invitesLoading] = useCollection(invitesRef, "invitee");

  return (
    <DashboardLayout title={name}>
      <List title="artists working here" data={mapArtists(artists)} isLoading={artistsLoading}></List>
      <List title="invites" data={mapInvites(invites)} isLoading={invitesLoading}></List>
      <InviteArtistsToShopModal shop={name} />
    </DashboardLayout>
  );
}
