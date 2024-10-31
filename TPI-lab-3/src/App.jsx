// Libraries
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Helpers

// Custom components
import Login from "./components/login/Login";
import Register from "./components/register/Register"; // autocompleta minuscula
import NotFound from "./components/notFound/NotFound";
import Protected from "./components/protected/Protected";
import {Dashboard} from "./components/dashboard/Dashboard";
import SingleProduct from "./components/singleProduct/SingleProduct";
import Cart from "./components/cart/Cart";
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
        <Protected isSignedIn={isLoggedIn}>
          <Dashboard />
        </Protected>
      ),
    },
    {
      path: "/product/:id",
      element: (
          <Protected isSignedIn={isLoggedIn}>
              <SingleProduct />
          </Protected>
      ),
    },
    {
      path: "/cart", element: <Cart/>
    },
    {
      path: "/login", element: <Login onLogin={loginHandler} />
    },
    {
      path: "/register", element: <Register onRegister={loginHandler}/>
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