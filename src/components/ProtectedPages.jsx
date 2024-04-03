import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";

const Protected = () => {
  const { user, loading } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user?.uid) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  return (
    <>
      <Outlet context={{ user, loading }} />
    </>
  );
};

export default Protected;
