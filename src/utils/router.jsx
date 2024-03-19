import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    // children: [
    //   {
    //     path: "contact",
    //     element: <Contact />,
    //   },
    //   {
    //     path: "dashboard",
    //     element: <Dashboard />,
    //     loader: ({ request }) =>
    //       fetch("/api/dashboard.json", {
    //         signal: request.signal,
    //       }),
    //   },
    //   {
    //     element: <AuthLayout />,
    //     children: [
    //       {
    //         path: "login",
    //         element: <Login />,
    //         loader: redirectIfUser,
    //       },
    //       {
    //         path: "logout",
    //         action: logoutUser,
    //       },
    //     ],
    //   },
    // ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
