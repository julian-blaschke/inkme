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

  return doc.set({ address, instagram, artists: [owner], owner });
}

/**
 * creates an invite in firestore under a shop collection
 *
 * @param {object} invite to create
 * @returns {Promise} of the save operation
 */
export async function createInvite({ inviter, invitee, role, shop, date = firebase.firestore.FieldValue.serverTimestamp(), status = "pending" }) {
  const db = firebase.firestore();
  const doc = db.collection("shops").doc(shop).collection("invites").doc(invitee);
  if ((await doc.get()).exists) throw new Error(`${invitee} has already been invited!`);
  return doc.set({ inviter, role, date, status });
}

export async function UPDATE_SHOP(name, values) {
  const db = firebase.firestore();
  const doc = db.collection("shops").doc(name);
  if (!(await doc.get()).exists) throw new Error(`shop '${name}' does not exist.`);
  return doc.update({ ...values });
}
