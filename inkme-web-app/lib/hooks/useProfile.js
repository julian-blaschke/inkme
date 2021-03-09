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

  const update = useCallback(
    async (fields) => {
      const doc = db.collection("artists").doc(user.uid);
      await doc.update({ ...profile, ...fields });
      setProfile((p) => ({ ...p, ...fields }));
    },
    [profile]
  );

  return { profile, isLoading, update };
}
