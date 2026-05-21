import { role } from "@/constants/role";
import { adminPanelSidebarItems } from "@/routes/adminPanelSidebarItems";
import { dashboardSidebarItems } from "@/routes/dashboardSidebarItems";
import type { TSidebarType, TUserRole } from "@/types";

export const getSidebarItems = (sideBarType: TSidebarType, userRole: TUserRole) =>{
  // switch(userRole){
  //   case role.superAdmin:
  //     return [...adminPanelSidebarItems];

  //   case role.admin:
  //     return [...adminPanelSidebarItems];

  //   case role.user:
  //     return [...dashboardSidebarItems];
      
  //   default:
  //     return [];
  // }
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