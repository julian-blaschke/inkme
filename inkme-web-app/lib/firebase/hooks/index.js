import { useEffect, useState } from "react";

function mapDocument(doc, idField) {
  return { ...doc.data(), [`${idField}`]: doc.id };
}

export function useCollection(col, idField = "id") {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //listen for changes of either path or idField
  useEffect(() => {
    if (col) {
      console.log("refetch");
      setIsLoading(true);
      const unsubscribe = col.onSnapshot((snapshot) => {
        setData(snapshot.docs.map((doc) => mapDocument(doc, idField)));
        setIsLoading(false);
      });
      return () => unsubscribe();
    }
  }, [col, idField]);

  return [data, isLoading];
}

export function useDocument(doc, idField = "id") {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //listen for changes of either path or idField
  useEffect(() => {
    if (doc) {
      console.log("refetch");
      setIsLoading(true);
      const unsubscribe = doc.onSnapshot((snapshot) => {
        setData(mapDocument(snapshot, idField));
        setIsLoading(false);
      });
      return () => unsubscribe();
    }
  }, [doc, idField]);

  return [data, isLoading];
}
