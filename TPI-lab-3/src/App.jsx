// Libraries
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthenticationProvider } from "./services/auth/Auth.context";
// Helpers

// Custom components
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NotFound from "./components/notFound/NotFound";
import Protected from "./components/protected/Protected";
import Dashboard from "./components/dashboard/Dashboard";
import Cart from "./components/cart/Cart";
import PaymentMethod from "./components/paymentMethod/PaymentMethod";
import Admin from "./components/admin/Admin";
import SysAdmin from "./components/sysadmin/SysAdmin";
import EditProduct from "./components/admin/EditProducts";
import AddProduct from "./components/admin/AddProduct";
import CardData from "./components/paymentMethod/CardData";
import CreateUser from "./components/sysadmin/AddUser";
import MyPurchases from "./components/myPurchases/MyPurchases";
import Membership from "./components/membership/Membership";
import LandingPage from "./components/landing/Landing";

// Stlyes

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage/> ,
    },
    {
      path: "/dashboard",
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
      path: "/edit/:productId",
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
      path: "/membership",
      element: (
        <Protected allowedRoles={['Client']}>
          <Membership />
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
      path: "/mypurchases", 
      element: (
        <Protected allowedRoles={['Client']}>
          <MyPurchases />
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