import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Template from "../components/Template";
import Protected from "../components/ProtectedPages";
import Pet from "../pages/Pet";
import AddPet from "../pages/AddPet";
import EditPet from "../pages/EditPet";

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
          {
            path: ":userId/pets/:petId/edit",
            element: <EditPet />,
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
