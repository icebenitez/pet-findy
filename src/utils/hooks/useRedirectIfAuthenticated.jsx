import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useRedirectIfAuthenticated = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.uid) {
      navigate("/");
    }
  }, [user, navigate]);
};

export default useRedirectIfAuthenticated;
