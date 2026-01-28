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
     header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
 
      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "salePrice",
       header: () => <div className="text-right">Sale Price</div>,
    cell: ({ row }) => {
      const salePrice = parseFloat(row.getValue("salePrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(salePrice)
 
      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "stock",
    header: "Stock",
  }
]