import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const useRedirectIfAuthenticated = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);
};

export default useRedirectIfAuthenticated;
