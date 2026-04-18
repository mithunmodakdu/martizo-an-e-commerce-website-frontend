/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SingleImageUploader from "@/components/ui/singleImageUploader";
import { useId, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateProductBrandMutation } from "@/redux/features/productBrands/productBrands.api";
import { CreateBrandZodSchema, type IBrand } from "./brand.types";

export function AddProductBrand() {
  const [image, setImage] = useState<File | null>(null);
  const [createProductBrand] = useCreateProductBrandMutation();
  const topBrandRadioId = useId();
  const martizoChoiceRadioId = useId();
  const featuredRadioId = useId();

  const topBrandItems = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const martizoChoiceItems = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const featuredItems = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const form = useForm<z.infer<typeof CreateBrandZodSchema>>({
    resolver: zodResolver(CreateBrandZodSchema),
    defaultValues: {
      name: "",
      tagline: "",
      totalProducts: 0,
      isTopBrand: false,
      isMartizoChoice: false,
      isFeatured: false,
      brandLogo: "",
    },
  });

  const onSubmit = async (data: Partial<IBrand>) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    // console.log(formData.get("data"));
    // console.log(formData.get("file"));

    const toastId = toast.loading("Creating product Brand...");

    try {
      const res = await createProductBrand(formData).unwrap();
      console.log(res);

      if (res.success) {
        toast.success(res.message, { id: toastId });
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Add Product Brand</CardTitle>
        <CardDescription>
          Please fill in the form to add a product brand.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="add-product-brand-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Brand name */}
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

            {/* brand tagline */}
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Tagline</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write here brand tagline"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is for brand tagline.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total products */}
            <FormField
              control={form.control}
              name="totalProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Products</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write here total Products number"
                      type="text"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is for total Products number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              {/* isTopBrand */}
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
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
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
                                <Label
                                  htmlFor={`${topBrandRadioId}-${item.value}`}
                                >
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

              {/* isMartizoChoice */}
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
                          value={String(field.value)}
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
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
                                  value={String(item.value)}
                                />
                                <Label
                                  htmlFor={`${martizoChoiceRadioId}-${item.value}`}
                                >
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

              {/* isFeatured Brand */}
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Featured Brand</FormLabel>
                    <FormControl>
                      <fieldset className="space-y-4">
                        <RadioGroup
                          className="flex flex-wrap gap-2"
                          value={String(field.value)}
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                        >
                          {featuredItems.map((item) => (
                            <div
                              className="relative flex flex-col items-start gap-4 rounded-md border border-input p-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
                              key={`${featuredRadioId}-${item.value}`}
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  className="after:absolute after:inset-0"
                                  id={`${featuredRadioId}-${item.value}`}
                                  value={String(item.value)}
                                />
                                <Label
                                  htmlFor={`${featuredRadioId}-${item.value}`}
                                >
                                  {item.label}
                                </Label>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </fieldset>
                    </FormControl>

                    <FormDescription className="sr-only">
                      Is Featured? Yes or No
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
          <div className="mt-5">
            <SingleImageUploader onChange={setImage} />
          </div>
        </Form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="add-product-brand-form"
            className="w-full hover:cursor-pointer"
          >
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
