import { firebase } from "@/firebase/index";

/**
 * query firestore for artists
 *
 * @param {string} search shops have to contain this search string
 * @param {number} limit maximum number of documents we want to limit this query to
 * @returns {array} an array of artists (or empty array if none were found)
 */
export async function getArtists(search = "", limit = 5) {
  const db = firebase.firestore();
  const query = db.collection("artists");
  if (search) {
    query.where(firebase.firestore.FieldPath.documentId(), ">=", search);
  }
  const res = await query.limit(limit).get();
  return res.docs.map((d) => ({ ...d.data(), username: d.id }));
}
