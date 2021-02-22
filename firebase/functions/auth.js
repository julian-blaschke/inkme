const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// TODO: remove this for production
const auth = admin.initializeApp({ projectId: "inkme-77c20" }).auth();

/** 
  create a token to sign into for firebase client

  @param username is the username of the user that has to be unique
  @param email email of the user
  @param password the password hash of the user
  @return the created token for this user
*/
const signUp = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      // grab user info from request body
      console.log(req.query);
      const { username, password, isArtist } = req.query;
      console.log(username);
      if (!username || !isArtist || !password)
        return res.status(400).send("invalid arguments");
      // create token with username as custom uid
      const token = await auth.createCustomToken(username, {
        isArtist,
        password,
      });
      // return this tokent to the user
      res.set("Access-Control-Allow-Origin", "*");
      return res.status("201").jsonp({ token });
    } catch (err) {
      return res.status(500).send(err);
    }
  });
});

module.exports = { signUp };
