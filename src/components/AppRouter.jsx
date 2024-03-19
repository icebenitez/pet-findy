import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "../utils/router";
// import PrivateRoute from "./PrivateRoute"; // You can still use the PrivateRoute component as shown earlier

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
