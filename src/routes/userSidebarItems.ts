import Orders from "@/pages/User/Orders";
import type { ISidebarItem } from "@/types";

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