import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Template from "../components/Template";

const router = createBrowserRouter([
  {
    element: <Template />,
    children: [
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
    ],
    errorElement: <Error />,
  },
]);

export default router;
