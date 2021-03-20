import { firebase } from "@/firebase/index";

/**
 * creates a new shop-document in firestore with the provided arguments
 *
 * @param {object} shop data, relevant to the shop to create
 * @returns {Promise} of the create process
 */
export async function createShop({ name, address, instagram, owner }) {
  //TODO: validate args
  const db = firebase.firestore();
  const doc = db.collection("shops").doc(name);
  if ((await doc.get()).exists) throw new Error(`shop with name "${name}" already exists.`);

  return doc.set({ address, instagram, owner });
}
