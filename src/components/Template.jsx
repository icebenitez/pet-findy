import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useAuth from "../utils/hooks/useAuth";

const Template = () => {
  const { user, loading } = useAuth();

  return (
    <>
      <Navbar />
      <Outlet context={{ user, loading }} />
    </>
  );
};

export default Template;
