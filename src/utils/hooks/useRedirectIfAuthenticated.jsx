import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useRedirectIfAuthenticated = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.uid) {
      navigate("/");
    }
  }, [user, loading, navigate]);
};

export default useRedirectIfAuthenticated;
