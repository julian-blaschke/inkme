const functions = require("firebase-functions");
const admin = require("firebase-admin");

/**
 * firestore trigger on invites collection
 * when an artist accepts an invitation, add them to the shop's collection of artists with desired role
 */
const onInviteUpdate = functions.firestore
  .document("shops/{shop}/invites/{username}")
  .onUpdate((change, context) => {
    const invite = change.after.data();
    const db = admin.apps[0].firestore();
    const { shop, username } = context.params;

    // if the status changed to `accepted` we add this artist to the shop
    if (invite.status === "accepted") {
      const doc = db.collection("shops").doc(shop);
      return doc.update({
        artists: admin.firestore.FieldValue.arrayUnion(username),
      });
    }
    return null;
  });

module.exports = { onInviteUpdate };
