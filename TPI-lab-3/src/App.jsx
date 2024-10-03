
// Libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Helpers

// Custom components
import Login from "./components/login/Login";
import Register from "./components/register/Register"; // autocompleta minuscula
import NotFound from "./components/notFound/NotFound";

// Stlyes

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/login", element: <Login onLogin={() => { }} />
    },
    {
      path: "/register", element: <Register/>
    },
    {
      path: "*", element: <NotFound />
    }
  ]);

  return (
    <div className="d-flex flex-column align-items-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

