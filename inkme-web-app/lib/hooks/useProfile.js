import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { firebase } from "@/firebase/index";

export function useProfile() {
  const db = firebase.firestore();
  const { user } = useAuth();
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const doc = db.collection("artists").doc(user.uid);
      doc
        .get()
        .then((data) => setProfile(data.data()))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  return { profile, isLoading };
}
