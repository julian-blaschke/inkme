import { firebase } from "@/firebase/index";

export async function UPDATE_PROFILE(username, values) {
  const db = firebase.firestore();
  const doc = db.collection("artists").doc(username);
  if (!(await doc.get()).exists) throw new Error(`artist '${username}' does not exist.`);
  return doc.update(values);
}

export async function CREATE_SHOP({ name, address, instagram, owner, ownerImg }) {
  //TODO: validate args
  const db = firebase.firestore();
  const doc = db.collection("shops").doc(name);
  if ((await doc.get()).exists) throw new Error(`shop with name "${name}" already exists.`);

  return doc.set({ address, instagram, artists: [owner], owner, ownerImg });
}

export async function CREATE_INVITE({
  inviter,
  artist,
  img,
  role,
  shop,
  created = firebase.firestore.FieldValue.serverTimestamp(),
  status = "pending",
}) {
  const db = firebase.firestore();
  const doc = db.collection("shops").doc(shop).collection("invites").doc(artist);
  if ((await doc.get()).exists) throw new Error(`${artist} has already been invited!`);
  return doc.set({ inviter, role, created, status, artist, img, shop });
}

export async function UPDATE_INVITE(shop, username, status) {
  const db = firebase.firestore();
  const doc = db.collection("shops").doc(shop).collection("invites").doc(username);
  if (!(await doc.get()).exists) throw new Error(`invite for '${username}' at ${shop} does not exist.`);
  return doc.update({ status });
}

export async function DELETE_INVITE(shop, username) {
  const db = firebase.firestore();
  const doc = db.collection("shops").doc(shop).collection("invites").doc(username);
  if (!(await doc.get()).exists) throw new Error(`invite for '${username}' at ${shop} does not exist.`);
  return doc.delete();
}

export async function UPDATE_SHOP(name, values) {
  const db = firebase.firestore();
  const doc = db.collection("shops").doc(name);
  if (!(await doc.get()).exists) throw new Error(`shop '${name}' does not exist.`);
  return doc.update({ ...values });
}

export async function CREATE_GUESTSPOT(
  shop,
  { inviter, artist, range, img, artistImg, created = firebase.firestore.FieldValue.serverTimestamp(), status = "pending" }
) {
  const db = firebase.firestore();
  const doc = db.collection("shops").doc(shop).collection("guestspots").doc();
  return doc.set({ inviter, artist, range, artistImg, created, status, shop, img });
}

export async function DELETE_GUESTSPOT(shop, id) {
  const db = firebase.firestore();
  const doc = db.collection("shops").doc(shop).collection("guestspots").doc(id);
  if (!(await doc.get()).exists) throw new Error(`guestspot doesn't exist at ${shop}`);
  return doc.delete();
}
