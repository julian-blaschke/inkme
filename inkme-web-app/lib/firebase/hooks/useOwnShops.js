import { firebase } from "@/firebase/index";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export function useOwnShops() {
  const db = firebase.firestore();
  const { user } = useAuth();
  const [shops, setShops] = useState();

  useEffect(() => {
    if (user) {
      const doc = db.collection("shops").where("owner", "==", user?.uid);
      const subscription = doc.onSnapshot((data) => setShops(data.docs.map((doc) => ({ ...doc.data(), name: doc.id }))));
      return () => subscription();
    }
  }, [user]);

  return shops;
}
