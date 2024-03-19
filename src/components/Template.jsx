import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Template = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Template;
