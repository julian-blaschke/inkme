import { MyInviteMenu } from "@/components/menu/MyInviteMenu";
import { InviteMenu } from "@/components/menu/InviteMenu";
import { differenceInCalendarDays, format } from "date-fns";
import { GuestSpotMenu } from "@/components/menu/GuestSpotMenu";

export function mapArtists(artists) {
  return artists?.map((artist) => mapArtist(artist));
}

export function mapArtist({ username, artist, bio, img }) {
  return { title: username, subtitle: bio, img, url: `/artists/${username}` };
}

export function mapPublicArtists(artists) {
  return artists?.map((artist) => mapPublicArtist(artist));
}

export function mapPublicArtist({ artist, role, img }) {
  return { title: artist, subtitle: role, img, url: `/artists/${artist}` };
}

export function mapShops(shops) {
  return shops?.map((shop) => mapShop(shop));
}

export function mapShop({ name, img, address, _artists } = {}) {
  const artistsImgs = _artists?.map((artist) => artist.img);
  return { title: name, subtitle: address, url: `/me/${name}`, img: img || artistsImgs };
}

export function mapPublicShops(shops) {
  return shops?.map((shop) => mapPublicShop(shop));
}

export function mapPublicShop({ name, img, address, avatar, _artists }) {
  const artistsImgs = _artists?.map((artist) => artist.img);
  return { title: name, subtitle: address, img: avatar, url: `/shops/${name}`, img: img || artistsImgs };
}

export function mapShopsArtist(shops, artist) {
  return shops?.map((shop) => mapShopArtist(shop, artist));
}

export function mapShopArtist({ name, _artists, img }, artist) {
  const artistsImgs = _artists?.map((artist) => artist.img);
  const role = _artists.filter((a) => a.artist === artist)[0]?.role;
  return { title: name, subtitle: role, img: artistsImgs || img, url: `/shops/${name}` };
}

export function mapInvites(invites) {
  return invites?.map((invite) => mapInvite(invite));
}

export function mapInvite({ shop, artist, img, role, date = new Date(), status }) {
  const statusMap = { accepted: "green", rejected: "red", pending: "orange" };
  return { title: artist, subtitle: role, img, badge: { colorScheme: statusMap[status], content: status }, menu: <InviteMenu shop={shop} /> };
}

export function mapMyInvites(invites) {
  return invites?.map((invite) => mapMyInvite(invite));
}

export function mapMyInvite({ shop, role, img }) {
  return { title: shop, subtitle: `as ${role}`, img, menu: <MyInviteMenu shop={shop} /> };
}

export function mapGuestSpots(guestspots) {
  return guestspots?.map((guestspot) => mapGuestSpot(guestspot));
}

export function mapGuestSpot({ shop, artist, artistImg, img, range, status, id }) {
  const statusMap = { accepted: "green", rejected: "red", pending: "orange" };
  return {
    title: artist,
    img: artistImg,
    subtitle: `${format(range.from.toDate(), "d")} to ${format(range.to.toDate(), "d MMM")}`,
    badge: { colorScheme: statusMap[status], content: status },
    menu: <GuestSpotMenu id={id} shop={shop} isAccepted={status !== "pending"} />,
  };
}

export function mapPublicGuestSpotsShop(guestspots) {
  return guestspots?.map((guestspot) => mapPublicGuestSpotShop(guestspot));
}

export function mapPublicGuestSpotShop({ artist, artistImg, range }) {
  const days = differenceInCalendarDays(range.to.toDate(), range.from.toDate());
  const subtitle = days > 0 ? `${format(range.from.toDate(), "d")} to ${format(range.to.toDate(), "d MMM")}` : format(range.from.toDate(), "d MMM");
  return { title: artist, img: artistImg || "", subtitle };
}

export function mapPublicGuestSpotsArtist(guestspots) {
  return guestspots?.map((guestspot) => mapPublicGuestSpotArtist(guestspot));
}

export function mapPublicGuestSpotArtist({ shop, img, range }) {
  const days = differenceInCalendarDays(range.to.toDate(), range.from.toDate());
  const subtitle = days > 0 ? `${format(range.from.toDate(), "d")} to ${format(range.to.toDate(), "d MMM")}` : format(range.from.toDate(), "d MMM");
  return { title: shop, img, subtitle };
}
