const functions = require("firebase-functions");
const admin = require("firebase-admin");

/**
 * firestore trigger on invites collection
 * when an artist accepts an invitation, add them to the shop's collection of artists with desired role
 */
const onShopCreate = functions.firestore
  .document("shops/{shop}")
  .onCreate(async (snap, context) => {
    const { owner, ownerImg } = snap.data();
    return snap.ref.update({
      _artists: admin.firestore.FieldValue.arrayUnion({
        artist: owner,
        img: ownerImg,
        role: "owner",
        shop: context.params.shop,
        joined: new Date(),
      }),
    });
  });

module.exports = { onShopCreate };
