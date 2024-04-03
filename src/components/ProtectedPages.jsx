import { useEffect } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

const Protected = () => {
  const { user, loading } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.uid) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Outlet context={{ user, loading }} />
    </>
  );
};

export default Protected;
