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
 * @returns {array} listitem-eligible-parameter-object
 */
export function mapArtist({ username, bio, avatar }) {
  return { title: username, subtitle: bio, img: avatar, url: `artists/${username}` };
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
 * maps an shop object to an eligible listitem-parameter-object
 *
 * @param {object} shop the shop to map
 * @returns
 */
export function mapShop({ name, address, avatar }) {
  return { title: name, subtitle: address, img: avatar };
}
