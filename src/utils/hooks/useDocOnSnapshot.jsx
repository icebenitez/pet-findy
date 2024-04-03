import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";

// import { db } from "../firebase";

const useDocOnSnapshot = (docQuery) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("docQuery :>>", docQuery);
    const unsubscribe = onSnapshot(docQuery, (snapshot) => {
      setData(snapshot.data());
      setLoading(false);
    });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, [docQuery]);

  return { data, loading };
};

export default useDocOnSnapshot;
