// Libraries
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthenticationProvider } from "./services/auth/Auth.context";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected allowedRoles={['Client']}>
          <Dashboard />
        </Protected>
      ),
    },
    {
      path: "/admin",
      element: (
        <Protected allowedRoles={['Admin']}>
          <Admin />
        </Protected>
      ),
    },
    {
      path: "/sysadmin",
      element: (
        <Protected allowedRoles={['SysAdmin']}>
          <SysAdmin />
        </Protected>
      ), 
    },
    {
      path: "/adduser",
      element: (
        <Protected allowedRoles={['SysAdmin']}>
          <CreateUser />
        </Protected>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <Protected allowedRoles={['Client']}>
          <SingleProduct />
        </Protected>
      ),
    },
    {
      path: "/edit/:id",
      element: (
        <Protected allowedRoles={['Admin']}>
          <EditProduct />
        </Protected>
      ),
    },
    {
      path: "/addproduct",
      element: (
        <Protected allowedRoles={['Admin']}>
          <AddProduct />
        </Protected>
      ),
    },
    {
      path: "/cart", 
      element: (
        <Protected allowedRoles={['Client']}>
          <Cart />
        </Protected>
      ),
    },
    {
      path: "/paymentmethod", 
      element: (
        <Protected allowedRoles={['Client']}>
          <PaymentMethod />
        </Protected>
      ),
    },
    {
      path: "/carddata", 
      element: (
        <Protected allowedRoles={['Client']}>
          <CardData />
        </Protected>
      ),
    },
    {
      path: "/login", element: <Login/>
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
      <AuthenticationProvider>
        <RouterProvider router={router} />
      </AuthenticationProvider>
    </div>
  );
};

export default App;