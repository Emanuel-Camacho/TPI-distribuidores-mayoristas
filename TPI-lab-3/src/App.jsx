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
import { Dashboard } from "./components/dashboard/Dashboard";
import SingleProduct from "./components/singleProduct/SingleProduct";
import Cart from "./components/cart/Cart";
import PaymentMethod from "./components/paymentMethod/PaymentMethod";
import Admin from "./components/admin/Admin";
import SysAdmin from "./components/sysadmin/SysAdmin";
import EditProduct from "./components/admin/EditProducts";
import AddProduct from "./components/admin/AddProduct";
import CardData from "./components/paymentMethod/CardData";
import CreateUser from "./components/sysadmin/AddUser";
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
      path: "/admin",
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <Admin />
        </Protected>
      ),
    },
    {
      path: "/sysadmin",
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <SysAdmin />
        </Protected>
      ), 
    },
    {
      path: "/adduser",
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <CreateUser />
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
      path: "/edit/:id",
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <EditProduct />
        </Protected>
      ),
    },
    {
      path: "/addproduct",
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <AddProduct />
        </Protected>
      ),
    },
    {
      path: "/cart", 
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <Cart />
        </Protected>
      ),
    },
    {
      path: "/paymentmethod", 
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <PaymentMethod />
        </Protected>
      ),
    },
    {
      path: "/carddata", 
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <CardData />
        </Protected>
      ),
    },
    {
      path: "/login", element: <Login onLogin={loginHandler} />
    },
    {
      path: "/register", element: <Register onRegister={loginHandler} />
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