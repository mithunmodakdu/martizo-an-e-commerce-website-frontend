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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SingleImageUploader from "@/components/ui/singleImageUploader";
import {
  useCreateProductBrandMutation,
} from "@/redux/features/productBrands/productBrands.api";
import { CreateBrandZodSchema, type IBrand } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function AddProductBrandModal() {
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [createProductBrand] = useCreateProductBrandMutation();
  const topBrandRadioId = useId();
  const martizoChoiceRadioId = useId();

  const topBrandItems = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const martizoChoiceItems = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const form = useForm<z.infer<typeof CreateBrandZodSchema>>({
    resolver: zodResolver(CreateBrandZodSchema),
    defaultValues: {
      name: "",
      brandLogo: "",
      isTopBrand: false,
      isMartizoChoice: false,
    },
  });

  const onSubmit = async (data: Partial<IBrand>) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    console.log(formData.get("data"));
    console.log(formData.get("file"));

    const toastId = toast.loading("Creating product Brand...");

    try {
      const res = await createProductBrand(formData).unwrap();
      console.log(res);

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
          <Button>Add Brand</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Brand</DialogTitle>
            <DialogDescription>
              Fill in the form below to add product Brand. Click submit when
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
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write here Brand name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is for brand name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
             <div className="flex justify-between items-center">
               <FormField
                control={form.control}
                name="isTopBrand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Top Brand</FormLabel>
                    <FormControl>
                      <fieldset className="space-y-4">
                        <RadioGroup
                          className="flex flex-wrap gap-2"
                          value={String(field.value)}
                          onValueChange={(value) => field.onChange(value === "true")}
                        >
                          {topBrandItems.map((item) => (
                            <div
                              className="relative flex flex-col items-start gap-4 rounded-md border border-input p-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
                              key={`${topBrandRadioId}-${item.value}`}
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  className="after:absolute after:inset-0"
                                  id={`${topBrandRadioId}-${item.value}`}
                                  value={String(item.value)}
                                />
                                <Label htmlFor={`${topBrandRadioId}-${item.value}`}>
                                  {item.label}
                                </Label>
                              </div>
                            </div>
                          ))}
                         
                        </RadioGroup>
                      </fieldset>
                    </FormControl>

                    <FormDescription className="sr-only">
                      Is Top Brand? Yes or No
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="isMartizoChoice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Martizo Choice</FormLabel>
                    <FormControl>
                      <fieldset className="space-y-4">                      
                        <RadioGroup
                          className="flex flex-wrap gap-2"
                          onValueChange={field.onChange}
                        >
                          {martizoChoiceItems.map((item) => (
                            <div
                              className="relative flex flex-col items-start gap-4 rounded-md border border-input p-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
                              key={`${martizoChoiceRadioId}-${item.value}`}
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  className="after:absolute after:inset-0"
                                  id={`${martizoChoiceRadioId}-${item.value}`}
                                  value={item.value}
                                />
                                <Label htmlFor={`${martizoChoiceRadioId}-${item.value}`}>
                                  {item.label}
                                </Label>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </fieldset>
                    </FormControl>

                    <FormDescription className="sr-only">
                      Is Martizo Choice? Yes or No
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
             </div>
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
