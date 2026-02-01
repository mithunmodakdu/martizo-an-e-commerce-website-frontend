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
import { useParams } from "react-router";
import { useGetProductBySlugQuery } from "@/redux/features/products/products.api";
import Loading from "@/utils/Loading";

export function UpdateProductForm() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<[] | (File | FileMetadata)[]>([]);

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetProductCategoriesQuery(undefined);
  const { data: brandsData, isLoading: brandsLoading } =
    useGetProductBrandsQuery(undefined);

  const params = useParams();
  const productSlug = params.slug;
  const { data, isLoading } = useGetProductBySlugQuery(productSlug);
  const [existedImages, setExistedImages] = useState<string[]>(data?.images);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const [existedThumbnail, setExistedThumbnail] = useState<string | null>(
    data?.thumbnail,
  );
  const [deleteThumbnail, setDeleteThumbnail] = useState<string | null>();
  console.log(data);
  console.log(existedThumbnail);
  console.log(deleteThumbnail);

  const radioItems = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

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
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit = async (data: z.infer<typeof ProductUpdateZodSchema>) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", thumbnail as File);
    images.forEach((image) => formData.append("files", image as File));
    // console.log(formData.get("data"))
    // console.log(formData.get("file"))
    // console.log(formData.get("files"))
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Update Product</CardTitle>
            <CardDescription>
              Please fill in the form to update the product.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="update-product-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="add-product-form-title">
                        Title
                      </FieldLabel>
                      <Input
                        {...field}
                        id="add-product-form-title"
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
                      <FieldLabel htmlFor="add-product-form-description">
                        Description
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="add-product-form-description"
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
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="add-product-form-category">
                          Category
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          disabled={categoriesLoading}
                        >
                          <SelectTrigger id="add-product-form-category">
                            <SelectValue placeholder="Select product category" />
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
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="brand"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="add-product-form-brand">
                          Brand
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          disabled={brandsLoading}
                        >
                          <SelectTrigger id="add-product-form-brand">
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
                    )}
                  />
                </div>
                <div className="flex gap-5">
                  <Controller
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="add-product-form-price">
                          Price
                        </FieldLabel>
                        <Input
                          {...field}
                          id="add-product-form-price"
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
                        <FieldLabel htmlFor="add-product-form-salePrice">
                          Sale Price
                        </FieldLabel>
                        <Input
                          {...field}
                          id="add-product-form-salePrice"
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
                        <FieldLabel htmlFor="add-product-form-stock">
                          Stock
                        </FieldLabel>
                        <Input
                          {...field}
                          id="add-product-form-stock"
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
                        <FieldLabel htmlFor="add-product-form-isNewArrival">
                          Is New Arrival
                        </FieldLabel>
                        <fieldset
                          id="add-product-form-isNewArrival"
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
                        <FieldLabel htmlFor="add-product-form-isBestSeller">
                          Is Best Seller
                        </FieldLabel>
                        <fieldset
                          id="add-product-form-isBestSeller"
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
                        <FieldLabel htmlFor="add-product-form-isFlashSale">
                          Is Flash Sale
                        </FieldLabel>
                        <fieldset
                          id="add-product-form-isFlashSale"
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
                        <FieldLabel htmlFor="add-product-form-isTrending">
                          Is Trending
                        </FieldLabel>
                        <fieldset
                          id="add-product-form-isTrending"
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
                        setExistedThumbnail(null);

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
                <FieldLabel htmlFor="add-product-thumbnail">
                  Add New Thumbnail
                </FieldLabel>
                <SingleImageUploader onChange={setThumbnail} />
              </Field>
              {existedImages.length > 0 ? (
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
                <FieldLabel htmlFor="add-product-images">
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
      )}
    </div>
  );
}
