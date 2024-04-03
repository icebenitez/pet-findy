import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const useRedirectIfAuthenticated = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      navigate("/");
    }
  }, [user, navigate]);
};

export default useRedirectIfAuthenticated;
