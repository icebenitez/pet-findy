import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../firebase";

const useDocOnSnapshot = (collectionPath) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, collectionPath), (snapshot) => {
      setData(snapshot.data());
      setLoading(false);
    });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, [collectionPath]);

  return { data, loading };
};

export default useDocOnSnapshot;
