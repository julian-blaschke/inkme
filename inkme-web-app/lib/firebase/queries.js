import { firebase } from "@/firebase/index";

export async function getArtistByUsername(username) {
  if (!username) return;
  const db = firebase.firestore();
  //TODO: make checks for provided arg `username`
  const doc = db.collection("artists").doc(username);
  const artist = await doc.get();
  if (!artist.exists) return;
  return { ...artist.data(), username: doc.id };
}

export async function getInvites(shop) {
  const db = firebase.firestore();
  const docs = await db.collection("shops").doc(shop).collection("invites").get();
  const invites = docs.docs.map((doc) => doc.data());
  return invites;
}

export async function ARTIST(username) {
  if (!username) return;
  const db = firebase.firestore();
  const doc = db.collection("artists").doc(username);
  const artist = await doc.get();
  if (!artist.exists) throw new Error("user not found");
  return { ...artist.data(), username: doc.id };
}

export function ALL_ARTISTS(username) {
  const db = firebase.firestore();
  if (!username) return;
  return db
    .collection("artists")
    .where(firebase.firestore.FieldPath.documentId(), ">=", username)
    .where(firebase.firestore.FieldPath.documentId(), "<=", username + "\uf8ff");
}

export function SHOP_ARTISTS(usernames) {
  const db = firebase.firestore();
  if (!usernames) return;
  return db.collection("artists").where(firebase.firestore.FieldPath.documentId(), "in", usernames);
}

export function ALL_SHOPS(name) {
  const db = firebase.firestore();
  if (!name) return;
  return db
    .collection("shops")
    .where(firebase.firestore.FieldPath.documentId(), ">=", name)
    .where(firebase.firestore.FieldPath.documentId(), "<=", name + "\uf8ff");
}

export function MY_SHOPS(username) {
  const db = firebase.firestore();
  if (!username) return;
  return db.collection("shops").where("artists", "array-contains", username);
}

export function SHOP(name) {
  const db = firebase.firestore();
  if (!name) return;
  return db.collection("shops").doc(name);
}

export function ALL_INVITES(shop) {
  const db = firebase.firestore();
  if (!shop) return;
  return db.collection("shops").doc(shop).collection("invites");
}

export function MY_INVITES(username) {
  const db = firebase.firestore();
  if (!username) return;
  return db.collectionGroup("invites").where("artist", "==", username).where("status", "==", "pending");
}

export function ALL_GUEST_SPOTS(shop) {
  const db = firebase.firestore();
  if (!shop) return;
  return db.collection("shops").doc(shop).collection("guestspots");
}

export function MY_GUEST_SPOTS(username) {
  const db = firebase.firestore();
  if (!username) return;
  return db.collectionGroup("guestspots").where("artist", "==", username);
}
