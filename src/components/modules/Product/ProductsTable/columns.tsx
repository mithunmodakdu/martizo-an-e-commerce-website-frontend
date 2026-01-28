
import type { IProduct } from "@/types"
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "salePrice",
    header: "salePrice",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  }
]