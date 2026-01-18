import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const AddProduct = lazy(() => import("@/pages/Admin/AddProduct"));
const UpdateProduct = lazy(() => import("@/pages/Admin/UpdateProduct"));
const DeleteProduct = lazy(() => import("@/pages/Admin/DeleteProduct"));
const ProductCategories = lazy(() => import("@/pages/Admin/ProductCategories"))
const UpdateCategory = lazy(() => import("@/pages/Admin/UpdateCategory"));

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
          title: "Product Categories",
          url: "/admin/product-categories",
          component: ProductCategories
        },
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
          title: "Update Category",
          url: "/admin/update-category",
          component: UpdateCategory
        }
      ],
    },
   
  ]