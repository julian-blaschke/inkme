import { MyInviteMenu } from "@/components/menu/MyInviteMenu";
import { InviteMenu } from "@/components/menu/InviteMenu";
import { format } from "date-fns";
import { GuestSpotMenu } from "@/components/menu/GuestSpotMenu";

export function mapArtists(artists) {
  return artists?.map((artist) => mapArtist(artist));
}

export function mapArtist({ username, bio, img }) {
  return { title: username, subtitle: bio, img, url: `/artists/${username}` };
}

export function mapShops(shops) {
  return shops?.map((shop) => mapShop(shop));
}

export function mapShop({ name, address, avatar }) {
  return { title: name, subtitle: address, img: avatar, url: `/profile/shops/${name}` };
}

export function mapInvites(invites) {
  return invites?.map((invite) => mapInvite(invite));
}

export function mapInvite({ shop, artist, role, date = new Date(), status }) {
  const statusMap = { accepted: "green", rejected: "red", pending: "orange" };
  return { title: artist, subtitle: `as ${role}`, badge: { colorScheme: statusMap[status], content: status }, menu: <InviteMenu shop={shop} /> };
}

export function mapMyInvites(invites) {
  return invites?.map((invite) => mapMyInvite(invite));
}

export function mapMyInvite({ shop, role }) {
  return { title: shop, subtitle: `as ${role}`, menu: <MyInviteMenu shop={shop} /> };
}

export function mapGuestSpots(guestspots) {
  return guestspots?.map((guestspot) => mapGuestSpot(guestspot));
}

export function mapGuestSpot({ shop, artist, img, range, status, id }) {
  const statusMap = { accepted: "green", rejected: "red", pending: "orange" };
  return {
    title: artist,
    img,
    //subtitle: `from ${format(range.from.toDate(), "MMMM do")} to ${format(range.to.toDate(), "PPP")}`,
    badge: { colorScheme: statusMap[status], content: status },
    menu: <GuestSpotMenu id={id} shop={shop} isAccepted={status !== "pending"} />,
  };
}

export function mapPublicGuestSpots(guestspots) {
  return guestspots?.map((guestspot) => mapPublicGuestSpot(guestspot));
}

export function mapPublicGuestSpot({ shop, artist, img, range, status, id }) {
  return { title: shop, img, subtitle: "test" };
}
