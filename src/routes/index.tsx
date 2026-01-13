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
        {
          Component: Analytics,
          path: "analytics"

        },
        {
          Component: AddProduct,
          path: "add-product"
        }
      ]
    },
    {
      Component: DashboardLayout,
      path: "/user",
      children: [
        {
          Component: Orders,
          path: "orders"
        }
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