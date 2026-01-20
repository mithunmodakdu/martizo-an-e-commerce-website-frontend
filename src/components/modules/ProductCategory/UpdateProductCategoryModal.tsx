import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SingleImageUploader from "@/components/ui/singleImageUploader";
import {
  useGetProductCategoriesQuery,
  useUpdateProductCategoryMutation,
} from "@/redux/features/productCategories/productCategories.api";
import { Edit2 } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function UpdateProductCategoryModal({ category }) {
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetProductCategoriesQuery(undefined);
  const id = useId();

  // console.log(category)

  const form = useForm({
    defaultValues: {
      name: category.name,
      parent: "",
    },
  });

  const [updateProductCategory] = useUpdateProductCategoryMutation();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);
    // console.log(formData.get("data"))
    // console.log(formData.get("file"))

    const dataToUpdate = {
      categoryId: category._id,
      formData: formData,
    };

    // console.log(dataToUpdate)

    const toastId = toast.loading("Updating product category...");

    try {
      const res = await updateProductCategory(dataToUpdate).unwrap();
      // console.log(res);

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        <DialogTrigger asChild>
          <Button className="hoover: cursor-pointer">
            <Edit2 />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
            <DialogDescription>
              Fill in the form below to update product category. Click submit
              when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="add-product-category"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is for category name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Parent Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        disabled={categoriesLoading}
                      >
                        <SelectTrigger id={id}>
                          <SelectValue placeholder="Select parent category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesData?.map(
                            (item: { _id: string; name: string }) => (
                              <SelectItem key={item._id} value={item._id}>
                                {item.name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormDescription className="sr-only">
                      Select parent category name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
            <SingleImageUploader onChange={setImage} />
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="add-product-category" type="submit">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
