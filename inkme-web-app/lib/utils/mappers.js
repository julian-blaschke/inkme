/**
 * maps multiple artist objects to multiple eligible listitem-parameter-objects
 *
 * @param {array} artists
 * @returns {array} listitem-eligible-parameter-objects
 */
export function mapArtists(artists) {
  return artists?.map((artist) => mapArtist(artist));
}

/**
 * maps an artist object to an eligible listitem-parameter-object
 *
 * @param {object} artist the artist to map
 * @returns {object} listitem-eligible-parameter-object
 */
export function mapArtist({ username, bio, avatar }) {
  return { title: username, subtitle: bio, img: avatar, url: `/artists/${username}` };
}

/**
 * maps multiple shop objects to multiple eligible listitem-parameter-objects
 *
 * @param {array} shops
 * @returns {array} listitem-eligible-parameter-objects
 */
export function mapShops(shops) {
  return shops?.map((shop) => mapShop(shop));
}

/**
 * maps a shop object to an eligible listitem-parameter-object
 *
 * @param {object} shop to map
 * @returns {object} listitem-eligible-parameter-object
 */
export function mapShop({ name, address, avatar }) {
  return { title: name, subtitle: address, img: avatar, url: `/profile/shops/${name}` };
}

/**
 * maps multiple invites objects to multiple eligible listitem-parameter-objects
 *
 * @param {array} invites
 * @returns {array} listitem-eligible-parameter-objects
 */
export function mapInvites(invites) {
  return invites?.map((invite) => mapInvite(invite));
}

/**
 * maps an invite object to an eligible listitem-parameter-object
 *
 * @param {object} invite to map
 * @returns {object} listitem-eligible-parameter-object
 */
export function mapInvite({ inviter, invitee, role, date = new Date(), status }) {
  const statusMap = { accepted: "green", rejected: "red", pending: "orange" };
  return {
    title: invitee,
    subtitle: `as ${role} - invited by ${inviter} on ${date?.toDate().toLocaleDateString()}`,
    badge: { colorScheme: statusMap[status], content: status },
  };
}
