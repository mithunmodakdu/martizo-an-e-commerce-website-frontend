import TrackOrderPage from "@/pages/User/TrackOrderPage";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const UserProfilePage = lazy(() => import("@/pages/User/UserProfilePage"));
const WishlistPage = lazy(() => import("@/pages/User/WishlistPage"));
const CartPage = lazy(() => import("@/pages/User/CartPage"));
const Orders = lazy(() => import("@/pages/User/Orders"));


export const dashboardSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      
      {
        title: "My Profile",
        url: "/dashboard/profile",
        component: UserProfilePage,
      },
       {
        title: "Track Order",
        url: "/dashboard/track-order",
        component: TrackOrderPage
      },
      {
        title: "My Wishlist",
        url: "/dashboard/wishlist",
        component: WishlistPage,
      },
      {
        title: "My Cart",
        url: "/dashboard/cart",
        component: CartPage,
      },
      {
        title: "My Orders",
        url: "/dashboard/orders",
        component: Orders,
      }
     
    ],
  },
];
