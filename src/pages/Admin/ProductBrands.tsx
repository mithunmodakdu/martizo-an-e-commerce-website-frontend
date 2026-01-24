import { AddProductBrandModal } from "@/components/modules/ProductBrand/AddProductBrandModal";
import { UpdateProductBrandModal } from "@/components/modules/ProductBrand/UpdateProductBrandModal";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductBrandMutation,
  useGetProductBrandsQuery,
} from "@/redux/features/productBrands/productBrands.api";
import type { IBrand } from "@/types";
import { Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ProductBrands() {
  const { data: brandData } = useGetProductBrandsQuery(undefined);
  const [deleteProductBrand] = useDeleteProductBrandMutation();
  // console.log(brandData);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting product brand...");

    try {
      const res = await deleteProductBrand(id);

      if (res?.data?.success) {
        toast.success("The brand deleted successfully.", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-5 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Product Brands</h1>
        <AddProductBrandModal />
      </div>
      <div className="border-2 border-muted-foreground rounded-md p-5 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">Sl No.</TableHead>
              <TableHead className="w-1/5 text-left">Brand</TableHead>
              <TableHead className="w-1/5 text-left">Slug</TableHead>
              <TableHead className="text-center">Is Top Brand</TableHead>
              <TableHead className="text-center">Is Martizo Choice</TableHead>
              <TableHead className="text-center">Delete</TableHead>
              <TableHead className="text-center">Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brandData?.map((item: IBrand, index: number) => (
              <TableRow>
                <TableCell className="w-[50px] font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="w-1/5 text-left">
                  <div className="flex items-center justify-start gap-3">
                    <img
                      alt={item.name}
                      className="rounded-full"
                      height={40}
                      src={item.brandLogo}
                      width={40}
                    />
                    <div className="font-medium">{item.name}</div>
                  </div>
                </TableCell>

                <TableCell className="text-left w-1/5">{item.slug}</TableCell>
                <TableCell className="text-center">
                  {item.isTopBrand ? "Yes" : "No"}
                </TableCell>
                <TableCell className="text-center">
                  {item.isMartizoChoice ? "Yes" : "No"}
                </TableCell>

                <TableCell className="text-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="hoover: cursor-pointer"
                      >
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
                          This will permanently delete this.
                          You won't be able to revert this!
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
                            onClick={() => handleDelete(item._id)}
                          >
                            Yes, delete it!
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
                <TableCell className="text-center">
                  <UpdateProductBrandModal brand={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
