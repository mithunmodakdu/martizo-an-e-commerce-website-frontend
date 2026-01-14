import type { ISidebarItem } from "@/types"

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((sidebarItem) => 
    sidebarItem.items.map((item) => ({
      Component: item.component,
      path: item.url
    }))
  )
}