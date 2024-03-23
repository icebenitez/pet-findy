import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth"; // Assuming you have created the useAuth hook

const useRedirectIfAuthenticated = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/"); // Redirect to main page if user is authenticated
    }
  }, [user, loading, navigate]);
};

export default useRedirectIfAuthenticated;
