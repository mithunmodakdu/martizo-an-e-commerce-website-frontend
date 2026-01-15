import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/SignupPage";
import Verify from "@/pages/Verify";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter(
  [
    {
      Component: App,
      path: "/",
      children: [
        {
          Component: About,
          path: "about"
        }
      ]
    },
    {
      Component: DashboardLayout,
      path: "/admin",
      children: [
        {index: true, element: <Navigate to={"/admin/analytics"}/>},
        ...generateRoutes(adminSidebarItems)
      ]
    },
    {
      Component: DashboardLayout,
      path: "/user",
      children: [
        {index: true, element: <Navigate to={"/user/orders"}/>},
        ...generateRoutes(userSidebarItems)
      ]
    },
    {
      Component: SignupPage,
      path: "/signup"
    },
    {
      Component: Verify,
      path: "/verify"
    },
    {
      Component: LoginPage,
      path: "/login"
    }
  ]
);