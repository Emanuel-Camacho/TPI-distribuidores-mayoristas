
// Libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Helpers

// Custom components
import Login from "./components/login/Login";
import Register from "./components/register/Register"; // autocompleta minuscula
import NotFound from "./components/notFound/NotFound";

// Stlyes

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginHandler = () => {
  setIsLoggedIn(true);
  };

  const router = createBrowserRouter([
    {
        path: "/",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
    },
    {
      path: "/login", element: <Login onLogin={loginHandler} />
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