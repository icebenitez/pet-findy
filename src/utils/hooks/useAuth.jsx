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
      // console.log("authStateChanged :>> ", Date.now());
      if (currentUser) {
        // console.log("currentUser :>> ", currentUser);
        setUser(currentUser);
        setLoading(false);
        // setError(null);
      } else {
        setUser({});
        setLoading(false);
        // setError(new Error("User not authenticated"));
      }
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   console.log("user :>>", user?.uid);
  // }, [user]);

  return { user, loading };
};

export default useAuth;
