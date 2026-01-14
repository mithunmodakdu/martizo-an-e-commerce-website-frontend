import AddCategory from "@/pages/Admin/AddCategory";
import AddProduct from "@/pages/Admin/AddProduct";
import Analytics from "@/pages/Admin/Analytics";
import DeleteProduct from "@/pages/Admin/DeleteProduct";
import UpdateProduct from "@/pages/Admin/UpdateProduct";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component: Analytics
        }
        
      ],
    },
    {
      title: "Product Management",
      url: "#",
      items: [
        {
          title: "Add Product",
          url: "/admin/add-product",
          component: AddProduct
        },
        {
          title: "Update Product",
          url: "/admin/update-product",
          component: UpdateProduct
        },
        {
          title: "Delete Product",
          url: "/admin/delete-product",
          component: DeleteProduct
        },
        {
          title: "Add Category",
          url: "/admin/add-category",
          component: AddCategory
        }
      ],
    },
   
  ]