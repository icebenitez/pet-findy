import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        // setError(null);
      } else {
        setUser(null);
        setLoading(false);
        // setError(new Error("User not authenticated"));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("user :>>", user);
  }, [user]);

  return { user, loading };
};

export default useAuth;
