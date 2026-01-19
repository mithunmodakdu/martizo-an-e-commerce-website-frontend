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
import SingleImageUploader from "@/components/ui/singleImageUploader";
import {useUpdateProductCategoryMutation } from "@/redux/features/productCategories/productCategories.api";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function UpdateProductCategoryModal({category}) {
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  // console.log(category)

  const form = useForm({
    defaultValues: {
      name: category.name,
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
      formData: formData
    }

    // console.log(dataToUpdate)

    
    const toastId = toast.loading("Updating product category...")

    try {
      const res = await updateProductCategory(dataToUpdate).unwrap();
      // console.log(res);

      if (res.success) {
        toast.success(res.message, {id: toastId});
        setOpen(false)
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        <DialogTrigger asChild>
          <Button><Edit2/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
            <DialogDescription>
              Fill in the form below to update product category. Click submit when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="add-product-category"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        
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
