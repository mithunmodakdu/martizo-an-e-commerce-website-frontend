/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { productsApi } from "@/redux/features/products/products.api";
import { store } from "@/redux/store";

import type { IProduct } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { toast } from "sonner";

const handleDelete = async (productId: string) => {
  const toastId = toast.loading("Deleting the product...");

  try {
    const res = await store
      .dispatch(productsApi.endpoints.deleteProduct.initiate(productId))
      .unwrap();

    if (res.success) {
      toast.success(res.message, { id: toastId });
    }

  } catch (error: any) {
    toast.error(error.data?.message, { id: toastId });
  }
};

export const columns: ColumnDef<IProduct>[] = [
  {
    header: "SL No",
    cell: ({ row }) => {
      const rowIndex = row.index;
      return <div className="text-center w-8">{rowIndex + 1}</div>;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // cell: ({row}) => {
    //   const cellValue = row.getValue("title")
    //   return <div className="bg-red-600 w-[200px]">{cellValue}</div>
    // }
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const categoryObject = row.getValue("category");

      return <div>{categoryObject?.name}</div>;
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => {
      const brandObject = row.getValue("brand");

      return <div>{brandObject?.name}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "salePrice",
    header: () => <div className="text-right">Sale Price</div>,
    cell: ({ row }) => {
      const salePrice = parseFloat(row.getValue("salePrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(salePrice);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "_id",
    header: "Delete",
    cell: ({ row }) => {
      return (
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="hoover: cursor-pointer">
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <Trash2 />
                </AlertDialogMedia>
                <AlertDialogTitle>Are you sure to Delete it?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this. You won't be able to revert
                  this!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">
                  No, cancel!
                </AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  <Button
                    variant="destructive"
                    className="hoover: cursor-pointer"
                    onClick={() => handleDelete(row.getValue("_id"))}
                  >
                    Yes, delete it!
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
