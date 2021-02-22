import firebase from "../firebase.js";

export const signUp = async (values) => {
  const endpoint = "http://localhost:5001/inkme-77c20/us-central1/signUp?";
  const params = new URLSearchParams(values);

  const res = await fetch(endpoint + params);
  const { token } = await res.json();

  const auth = firebase.auth();
  auth.signInWithCustomToken(token).then(() => console.log(auth.currentUser));
};
