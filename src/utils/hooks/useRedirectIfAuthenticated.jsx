import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const useRedirectIfAuthenticated = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      navigate("/"); // Redirect to main page if user is authenticated
    }
  }, [user, navigate]);
};

export default useRedirectIfAuthenticated;
