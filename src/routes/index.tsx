import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/Common/About";
import LoginPage from "@/pages/Common/Login";
import SignupPage from "@/pages/Common/SignupPage";
import Verify from "@/pages/Common/Verify";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Common/Unauthorized";
import ProductsPage from "@/pages/Common/ProductsPage";
import ProductDetailsPage from "@/pages/Common/ProductDetailsPage";
import CartPage from "@/pages/User/CartPage";
import CheckoutPage from "@/pages/User/CheckoutPage";
import PaymentMessagePage from "@/pages/User/PaymentMessagePage";
import OrderSummaryPage from "@/pages/User/OrderSummaryPage";
import HomePage from "@/pages/Common/HomePage";
import WishlistPage from "@/pages/User/WishlistPage";
import UserProfilePage from "@/pages/User/UserProfiePage";


export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        path: "/"
      },
      {
        Component: ProductsPage,
        path: "products",
      },
      {
        Component: ProductDetailsPage,
        path: "product-details/:slug",
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: withAuth(UserProfilePage, ["SUPER_ADMIN", "ADMIN", "USER"]),
        path: "/user-profile"
      },
      {
        Component: withAuth(CartPage, ["SUPER_ADMIN", "ADMIN", "USER"]),
        path: "/cart",
      },
      {
        Component: withAuth(WishlistPage, ["SUPER_ADMIN", "ADMIN", "USER"]),
        path: "/wishlist"
      },
      {
        Component: withAuth(CheckoutPage, ["SUPER_ADMIN", "ADMIN", "USER"]),
        path: "/checkout"
      },
      {
        Component: withAuth(PaymentMessagePage, ["SUPER_ADMIN", "ADMIN", "USER"]),
        path: "/payments/success"
      },
      {
        Component: withAuth(PaymentMessagePage, ["SUPER_ADMIN", "ADMIN", "USER"]),
        path: "/payments/fail"
      },
      {
        Component: withAuth(PaymentMessagePage, ["SUPER_ADMIN", "ADMIN", "USER"]),
        path: "/payments/cancel"
      },
      {
        Component: withAuth(OrderSummaryPage, ["SUPER_ADMIN", "ADMIN", "USER"]),
        path: "/orders/summary/:transactionId"
      }
    ],
  },
  {
    Component: withAuth(DashboardLayout, ["SUPER_ADMIN", "ADMIN"]),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to={"/admin/analytics"} /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, ["USER", "SUPER_ADMIN"]),
    path: "/user",
    children: [
      { index: true, element: <Navigate to={"/user/orders"} /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: SignupPage,
    path: "/signup",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: LoginPage,
    path: "/login",
  },

  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
