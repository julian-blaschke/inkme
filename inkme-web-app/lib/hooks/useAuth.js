import { createContext, useContext, useEffect, useState } from "react";
import firebase from "@/firebase";

const authContext = createContext();
const auth = firebase.auth();

// provider component that wraps the app
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// hook for child components to use the auth object
export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signUp = async (values) => {
    const endpoint = "http://localhost:5001/inkme-77c20/us-central1/signUp?";
    const params = new URLSearchParams(values);

    const res = await fetch(endpoint + params);
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    const auth = firebase.auth();
    const { email, password } = values;
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signIn = async ({ email, password }) => auth.signInWithEmailAndPassword(email, password);

  const signOut = () => auth.signOut();

  // watch the firebase auth observable
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe;
  }, []);

  return { user, signUp, signIn, signOut };
}
