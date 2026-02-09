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
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";

export const router = createBrowserRouter(
  [
    {
      Component: App,
      path: "/",
      children: [
        {
          Component: ProductsPage,
          path: "products"
        },
        {
          Component: ProductDetailsPage,
          path: "product-details/:slug"
        },
        {
          Component: About,
          path: "about"
        }
      ]
    },
    {
      Component: withAuth(DashboardLayout, ["SUPER_ADMIN", "ADMIN"]),
      path: "/admin",
      children: [
        {index: true, element: <Navigate to={"/admin/analytics"}/>},
        ...generateRoutes(adminSidebarItems)
      ]
    },
    {
      Component: withAuth(DashboardLayout, ["USER"]),
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
    },
    {
      Component: Unauthorized,
      path: "/unauthorized"
    }
  ]
);