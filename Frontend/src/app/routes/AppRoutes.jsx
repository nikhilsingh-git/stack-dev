import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../../features/auth/ui/Login";
import Register from "../../features/auth/ui/Register";
import PublicRoute from "../Protected/PublicRoute.jsx";
import ProtectedRoute from "../Protected/ProtectedRoute";
import Home from "../../features/dashboard/ui/Home.jsx";

const AppRoutes = () => {


  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Register />,
            },
            {
              path: "login",
              element: <Login />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
