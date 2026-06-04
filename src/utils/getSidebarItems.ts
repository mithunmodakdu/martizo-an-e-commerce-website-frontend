
import { adminPanelSidebarItems } from "@/routes/adminPanelSidebarItems";
import { dashboardSidebarItems } from "@/routes/dashboardSidebarItems";
import type { TSidebarType, TUserRole } from "@/types";

export const getSidebarItems = (sideBarType: TSidebarType, userRole: TUserRole) =>{

  if(sideBarType === "dashboard"){
    return [...dashboardSidebarItems]
  }

  if(sideBarType === "admin-panel" && userRole === "SUPER_ADMIN"){
    return [...adminPanelSidebarItems]
  }

  if(sideBarType === "admin-panel" && userRole === "ADMIN"){
    return [...adminPanelSidebarItems]
  }

  
}