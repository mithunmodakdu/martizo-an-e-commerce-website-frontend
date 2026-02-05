/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller, useForm } from "react-hook-form";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ProductUpdateZodSchema } from "@/types";
import { useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProductBrandsQuery } from "@/redux/features/productBrands/productBrands.api";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SingleImageUploader from "@/components/ui/singleImageUploader";
import { useEffect, useState } from "react";
import MultipleImagesUploader from "@/components/ui/MultipleImagesUploader";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { useNavigate, useParams } from "react-router";
import {
  useGetProductBySlugQuery,
  useUpdateProductMutation,
} from "@/redux/features/products/products.api";
import Loading from "@/utils/Loading";
import { toast } from "sonner";

export function UpdateProductForm() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<[] | (File | FileMetadata)[]>([]);
  const [existedImages, setExistedImages] = useState<string[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const [existedThumbnail, setExistedThumbnail] = useState<string | undefined>(
    undefined,
  );
  const [deleteThumbnail, setDeleteThumbnail] = useState<string | undefined>(
    undefined,
  );
  const navigate = useNavigate();

  const params = useParams();
  const productSlug = params.slug;

  const { data: categoriesData } = useGetProductCategoriesQuery(undefined);
  // console.log("category data", categoriesData)
  const { data: brandsData } = useGetProductBrandsQuery(undefined, {
    skip: !categoriesData,
  });
  // console.log("brand data", brandsData)
  const { data: productData } = useGetProductBySlugQuery(productSlug, {
    skip: !brandsData,
  });
  // console.log("ProductBySlug data", data)
  const [updateProduct] = useUpdateProductMutation();

  // console.log(data)

  const radioItems = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  useEffect(() => {
    if (productData?.images) {
      setExistedImages(productData.images);
    }

    if (productData?.thumbnail) {
      setExistedThumbnail(productData.thumbnail);
    }
  }, [productData]);

  const form = useForm<z.infer<typeof ProductUpdateZodSchema>>({
    resolver: zodResolver(ProductUpdateZodSchema),
    defaultValues: {
      // main details
      title: "",
      description: "",

      // categorization
      category: "",
      brand: "",

      // pricing
      price: 0,
      salePrice: 0,

      // stock + variants
      stock: 0,

      // labels for Shop menu sections
      isNewArrival: false,
      isBestSeller: false,
      isFlashSale: false,
      isTrending: false,

      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (productData) {
      // console.log("reset category:", productData.category, typeof productData.category);
      // console.log("reset brand:", productData.brand, typeof productData.brand);

      form.reset(productData);
    }
  }, [productData, form]);

  const onSubmit = async (data: z.infer<typeof ProductUpdateZodSchema>) => {
    const formData = new FormData();
    const productDataToUpdate = {
      ...data,
      deleteThumbnail,
      deleteImages,
    };

    formData.append("data", JSON.stringify(productDataToUpdate));
    formData.append("file", thumbnail as File);
    images.forEach((image) => formData.append("files", image as File));

    const dataToUpdate = {
      productSlug: productSlug,
      formData: formData,
    };

    const toastId = toast.loading("Updating product...");

    try {
      const res = await updateProduct(dataToUpdate).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: toastId });
        navigate("/admin/products");
      }
    } catch (error: any) {
      console.log(error);
      if (!error.data.success) {
        toast.error(error.data.message, { id: toastId });
      }
    }
  };

  return (
    <div>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Update Product</CardTitle>
          <CardDescription>
            Please fill in the form to update the product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="update-product-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="update-product-form-title">
                      Title
                    </FieldLabel>
                    <Input
                      {...field}
                      id="update-product-form-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Write here product title"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="update-product-form-description">
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="update-product-form-description"
                        placeholder="Type here product description..."
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field?.value?.length}/250 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription className="sr-only">
                      This is for product description.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="flex gap-5">
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    // console.log(
                    //   "category field value:",
                    //   field.value,
                    //   typeof field.value,
                    // );
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="update-product-form-category">
                          Category
                        </FieldLabel>
                        <Select
                          value={field.value ?? ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="update-product-form-category">
                            <SelectValue placeholder="Select product category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {categoriesData?.map(
                                (item: { _id: string; name: string }) => (
                                  <SelectItem key={item._id} value={item._id}>
                                    {item.name}
                                  </SelectItem>
                                ),
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
                <Controller
                  name="brand"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    // console.log(
                    //   "brand field value:",
                    //   field.value,
                    //   typeof field.value,
                    // );
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="update-product-form-brand">
                          Brand
                        </FieldLabel>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="update-product-form-brand">
                            <SelectValue placeholder="Select product brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {brandsData?.map(
                              (item: { _id: string; name: string }) => (
                                <SelectItem key={item._id} value={item._id}>
                                  {item.name}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="flex gap-5">
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="update-product-form-price">
                        Price
                      </FieldLabel>
                      <Input
                        {...field}
                        id="update-product-form-price"
                        aria-invalid={fieldState.invalid}
                        placeholder="Write here product price"
                        autoComplete="off"
                        onChange={(event) => {
                          const value = event.target.value;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="salePrice"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="update-product-form-salePrice">
                        Sale Price
                      </FieldLabel>
                      <Input
                        {...field}
                        id="update-product-form-salePrice"
                        aria-invalid={fieldState.invalid}
                        placeholder="Write here product sale price"
                        autoComplete="off"
                        onChange={(event) => {
                          const value = event.target.value;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="stock"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="update-product-form-stock">
                        Stock
                      </FieldLabel>
                      <Input
                        {...field}
                        id="update-product-form-stock"
                        aria-invalid={fieldState.invalid}
                        placeholder="Write here product stock"
                        autoComplete="off"
                        onChange={(event) => {
                          const value = event.target.value;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="flex gap-5">
                <Controller
                  name="isNewArrival"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="update-product-form-isNewArrival">
                        Is New Arrival
                      </FieldLabel>
                      <fieldset
                        id="update-product-form-isNewArrival"
                        className="space-y-4"
                      >
                        <RadioGroup
                          className="flex flex-wrap gap-2"
                          value={String(field.value)}
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                        >
                          {radioItems.map((item) => (
                            <div
                              className="relative flex flex-col items-start gap-4 rounded-md border border-input p-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
                              key={`isNewArrival-${item.value}`}
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  className="after:absolute after:inset-0"
                                  id={`isNewArrival-${item.value}`}
                                  value={String(item.value)}
                                />
                                <Label htmlFor={`isNewArrival-${item.value}`}>
                                  {item.label}
                                </Label>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </fieldset>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="isBestSeller"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="update-product-form-isBestSeller">
                        Is Best Seller
                      </FieldLabel>
                      <fieldset
                        id="update-product-form-isBestSeller"
                        className="space-y-4"
                      >
                        <RadioGroup
                          className="flex flex-wrap gap-2"
                          value={String(field.value)}
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                        >
                          {radioItems.map((item) => (
                            <div
                              className="relative flex flex-col items-start gap-4 rounded-md border border-input p-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
                              key={`isBestSeller-${item.value}`}
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  className="after:absolute after:inset-0"
                                  id={`isBestSeller-${item.value}`}
                                  value={String(item.value)}
                                />
                                <Label htmlFor={`isBestSeller-${item.value}`}>
                                  {item.label}
                                </Label>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </fieldset>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="isFlashSale"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="update-product-form-isFlashSale">
                        Is Flash Sale
                      </FieldLabel>
                      <fieldset
                        id="update-product-form-isFlashSale"
                        className="space-y-4"
                      >
                        <RadioGroup
                          className="flex flex-wrap gap-2"
                          value={String(field.value)}
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                        >
                          {radioItems.map((item) => (
                            <div
                              className="relative flex flex-col items-start gap-4 rounded-md border border-input p-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
                              key={`isFlashSale-${item.value}`}
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  className="after:absolute after:inset-0"
                                  id={`isFlashSale-${item.value}`}
                                  value={String(item.value)}
                                />
                                <Label htmlFor={`isFlashSale-${item.value}`}>
                                  {item.label}
                                </Label>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </fieldset>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="isTrending"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="update-product-form-isTrending">
                        Is Trending
                      </FieldLabel>
                      <fieldset
                        id="update-product-form-isTrending"
                        className="space-y-4"
                      >
                        <RadioGroup
                          className="flex flex-wrap gap-2"
                          value={String(field.value)}
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                        >
                          {radioItems.map((item) => (
                            <div
                              className="relative flex flex-col items-start gap-4 rounded-md border border-input p-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
                              key={`isTrending-${item.value}`}
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  className="after:absolute after:inset-0"
                                  id={`isTrending-${item.value}`}
                                  value={String(item.value)}
                                />
                                <Label htmlFor={`isTrending-${item.value}`}>
                                  {item.label}
                                </Label>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </fieldset>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </form>
          <div className="space-y-5 my-5">
            {existedThumbnail ? (
              <Field>
                <FieldLabel>Existed Thumbnail</FieldLabel>

                <div className="relative">
                  <img
                    src={existedThumbnail}
                    className="h-32 w-full object-cover rounded"
                  />
                  <button
                    onClick={() => {
                      setExistedThumbnail(undefined);

                      setDeleteThumbnail(existedThumbnail);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded px-2"
                  >
                    ✕
                  </button>
                </div>
              </Field>
            ) : (
              ""
            )}
            <Field>
              <FieldLabel htmlFor="update-product-thumbnail">
                Add New Thumbnail
              </FieldLabel>
              <SingleImageUploader onChange={setThumbnail} />
            </Field>
            {existedImages?.length > 0 ? (
              <Field>
                <FieldLabel>Existed Images</FieldLabel>
                <div className="grid grid-cols-4 gap-4">
                  {existedImages?.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        className="h-32 w-full object-cover rounded"
                      />
                      <button
                        onClick={() => {
                          setExistedImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          );

                          setDeleteImages((prev) => [
                            ...prev,
                            existedImages[index],
                          ]);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </Field>
            ) : (
              ""
            )}
            <Field>
              <FieldLabel htmlFor="update-product-images">
                Add New Images
              </FieldLabel>
              <MultipleImagesUploader onChange={setImages} />
            </Field>
          </div>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="update-product-form"
              className="w-full hover:cursor-pointer"
            >
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
