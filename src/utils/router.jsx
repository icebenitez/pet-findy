import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Template from "../components/Template";
import Protected from "../components/ProtectedPages";
import AddPet from "../pages/AddPet";
import Pet from "../pages/Pet";

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
        element: <Protected />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "pet",
            children: [
              {
                path: "new",
                element: <AddPet />,
              },
            ],
          },
        ],
      },
      {
        path: ":userId/pets/:petId",
        element: <Pet />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default router;
