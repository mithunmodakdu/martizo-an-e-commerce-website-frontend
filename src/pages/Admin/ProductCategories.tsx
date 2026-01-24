import { AddProductCategoryModal } from "@/components/modules/ProductCategory/AddProductCategoryModal";
import { UpdateProductCategoryModal } from "@/components/modules/ProductCategory/UpdateProductCategoryModal";
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
  useDeleteProductCategoryMutation,
  useGetProductCategoriesQuery,
} from "@/redux/features/productCategories/productCategories.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ProductCategories() {
  const { data } = useGetProductCategoriesQuery(undefined);
  const [deleteProductCategory] = useDeleteProductCategoryMutation();

  const handleDelete = async (categoryId: string) => {
    const toastId = toast.loading("Deleting product category...");
    const res = await deleteProductCategory(categoryId);

    if (res?.data?.success) {
      toast.success(res?.data?.message, { id: toastId });
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-5 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Product Categories</h1>
        <AddProductCategoryModal />
      </div>
      <div className="border-2 border-muted-foreground rounded-md p-5 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sl No.</TableHead>
              <TableHead className="w-1/2">Category Name</TableHead>
              <TableHead className="w-1/2">Category Slug</TableHead>
              <TableHead>Delete</TableHead>
              <TableHead>Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(
              (
                item: { _id: string; name: string; slug: string },
                index: number,
              ) => (
                <TableRow>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.slug}</TableCell>
                  <TableCell>
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
                          <AlertDialogTitle>
                            Are you sure to Delete it?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this. You won't be able
                            to revert this!
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
                  <TableCell>
                    <UpdateProductCategoryModal category={item} />
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
