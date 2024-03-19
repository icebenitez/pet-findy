import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => {
    const auth = getAuth();
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

  return [user, loading];
};

export default useAuth;
