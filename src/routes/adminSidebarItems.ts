import ProductsTablePage from "@/pages/Admin/ProductsTablePage";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const AddProduct = lazy(() => import("@/pages/Admin/AddProduct"));
const UpdateProduct = lazy(() => import("@/pages/Admin/UpdateProduct"));
const DeleteProduct = lazy(() => import("@/pages/Admin/DeleteProduct"));
const ProductCategories = lazy(() => import("@/pages/Admin/ProductCategories"));
const ProductBrands = lazy(() => import("@/pages/Admin/ProductBrands"));


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
          title: "Product Brands",
          url: "/admin/product-brands",
          component: ProductBrands
        },
        {
          title: "Add Product",
          url: "/admin/add-product",
          component: AddProduct
        },
        {
          url: "/admin/update-product/:id",
          component: UpdateProduct
        },
        {
          title: "Products",
          url: "/admin/products",
          component: ProductsTablePage
        }
       
  
      ],
    },
   
  ]