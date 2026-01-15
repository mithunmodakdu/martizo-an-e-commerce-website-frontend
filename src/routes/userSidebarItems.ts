import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Orders = lazy(() => import("@/pages/User/Orders"));

export const userSidebarItems: ISidebarItem[] = [
    {
      title: "History",
      url: "#",
      items: [
        {
          title: "Orders",
          url: "/user/orders",
          component: Orders
        }
        
      ],
    }
    
  ]