import { MyInviteMenu } from "@/components/menu/MyInviteMenu";
import { format } from "date-fns";

export function mapArtists(artists) {
  return artists?.map((artist) => mapArtist(artist));
}

export function mapArtist({ username, bio, avatar }) {
  return { title: username, subtitle: bio, img: avatar, url: `/artists/${username}` };
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

export function mapInvite({ inviter, artist, role, date = new Date(), status }) {
  const statusMap = { accepted: "green", rejected: "red", pending: "orange" };
  return { title: artist, subtitle: `as ${role}`, badge: { colorScheme: statusMap[status], content: status } };
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

export function mapGuestSpot({ artist, range, status }) {
  const statusMap = { accepted: "green", rejected: "red", pending: "orange" };
  return {
    title: artist,
    subtitle: `from ${format(range.from.toDate(), "PPP")} to ${format(range.to.toDate(), "PPP")}`,
    badge: { colorScheme: statusMap[status], content: status },
  };
}
