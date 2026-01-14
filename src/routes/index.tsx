import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Admin/Analytics";
import LoginPage from "@/pages/Login";
import Orders from "@/pages/User/Orders";
import SignupPage from "@/pages/SignupPage";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";
import AddProduct from "@/pages/Admin/AddProduct";
import UpdateProduct from "@/pages/Admin/UpdateProduct";
import DeleteProduct from "@/pages/Admin/DeleteProduct";
import AddCategory from "@/pages/Admin/AddCategory";
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
      children: [...generateRoutes(adminSidebarItems)]
    },
    {
      Component: DashboardLayout,
      path: "/user",
      children: [...generateRoutes(userSidebarItems)]
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