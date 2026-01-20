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
import { useCreateProductCategoryMutation, useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddProductCategoryModal() {
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [createProductCategory] = useCreateProductCategoryMutation();
  const {data: categoriesData, isLoading: categoriesLoading} = useGetProductCategoriesQuery(undefined);
  const id = useId();

  const form = useForm({
    defaultValues: {
      name: "",
      parent: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    // console.log(formData.get("data"))
    // console.log(formData.get("file"))

    const toastId = toast.loading("Creating product category...");

    try {
      const res = await createProductCategory(formData).unwrap();
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
          <Button>Add Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Fill in the form below to add product category. Click submit when
              you&apos;re done.
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
                      <Input
                        placeholder="Write here category name"
                        type="text"
                        {...field}
                      />
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
                          {
                            categoriesData?.map((item: {_id: string, name: string}) => (
                              <SelectItem
                                key={item._id} 
                                value={item._id}
                              >
                                  {item.name}
                              </SelectItem>
                            ) )
                          }
                          
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
