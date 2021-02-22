const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// TODO: remove this for production
const app = admin.initializeApp({ projectId: "inkme-77c20" });
const auth = app.auth();
const firestore = app.firestore();

/** 
  create a token to sign into for firebase client

  @param username is the username of the user that has to be unique
  @param email email of the user
  @param isArtist specifies wheter the user is a tattoo artist or not
  @param password the password hash of the user
  @return the created token for this user
*/
const signUp = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      // grab user info from request body
      console.log(req.query);
      let { username, password, email, isArtist } = req.query;
      if (!username || !isArtist || !password)
        return res.status(400).send("invalid arguments");
      isArtist = JSON.parse(isArtist);
      // create token with username as custom uid
      await auth.createUser({ uid: username, password, email });
      // if this user is an artist we will create a new user doc in firestore
      if (isArtist) await firestore.collection("artists").doc(username).set({});
      res.set("Access-Control-Allow-Origin", "*");
      return res.status("201").jsonp({ messsage: "user created" });
    } catch (err) {
      return res.status(500).send(err);
    }
  });
});

module.exports = { signUp };
