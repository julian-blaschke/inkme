import { DashboardLayout } from "@/components/DashboardLayout";
import { List } from "@/components/List";
import { InviteArtistsToGuestSpotModal } from "@/components/modals/InviteArtistsToGuestSpotModal";
import { useCollection } from "@/firebase/hooks";
import { ALL_GUEST_SPOTS } from "@/firebase/queries";
import { mapGuestSpots } from "lib/utils/mappers";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function GuestSpots() {
  const { name } = useRouter().query;

  const guestspotsRef = useMemo(() => ALL_GUEST_SPOTS(name), [name]);
  const [guestspots, isLoading] = useCollection(guestspotsRef);

  return (
    <DashboardLayout title="Guest Spots 🧳" subtitle="manage guest spots at your shop">
      <List title="invites" data={mapGuestSpots(guestspots?.map((g) => ({ ...g, shop: name })))} isLoading={isLoading}></List>
      <InviteArtistsToGuestSpotModal shop={name} />
    </DashboardLayout>
  );
}
