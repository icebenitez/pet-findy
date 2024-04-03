import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

/**
 *
 * @returns {{
 *  user: import("firebase/auth").User,
 *  loading: boolean
 * }}
 */
const useAuth = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser({});
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
