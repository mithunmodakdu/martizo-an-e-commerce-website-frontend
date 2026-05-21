import * as React from "react"
import logoImage from "../../assets/images/martizo-logo.png"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { useGetMeQuery } from "@/redux/features/users/users.api"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {data: userData} = useGetMeQuery(undefined);
    const location = useLocation();
    const sideBarType = location.pathname.startsWith("/dashboard")? "dashboard" : "admin-panel"

  const data = {
    navMain: getSidebarItems(sideBarType, userData?.data?.role) || []
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <img src={logoImage} alt="Martizo Logo" className="w-32" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          {
                           item.title? <Link to={item.url}>{item.title}</Link> : ""
                          }
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
