/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller, useForm } from "react-hook-form";
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
import { useState } from "react";
import MultipleImagesUploader from "@/components/ui/MultipleImagesUploader";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { StarRating } from "./StarRating";

export function CreateReviewForm() {
  const [resSuccess, setResSuccess ] = useState<boolean>(false);
  const [images, setImages] = useState<[] | (FileMetadata | File)[]>([]);
  const [rating, setRating] = useState(0);

  const form = useForm({
    defaultValues: {
      title: "",
      comment: "",
    },
  });


  const onSubmit = async (data) => {
    console.log("data:", data)
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    images.forEach((image) => formData.append("files", image as File));

    console.log(formData.get("data"))
    console.log(formData.get("files"))

   
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Write Review</CardTitle>
        <CardDescription>
          Please fill in the form to write your review.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="create-review-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Your rating
        </label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>


            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="review-title">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="review-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Write here your review title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* comment */}
            <Controller
              name="comment"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="review-comment">
                    Comment
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="review-comment"
                      placeholder="Write here your review comment..."
                      rows={5}
                      className="min-h-14 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field?.value?.length}/1000 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription className="sr-only">
                    This is for review comment.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            
          </FieldGroup>
        </form>

        {/* Images */}
        <div className="space-y-5 my-5">
          <Field>
            <FieldLabel htmlFor="review-images">Images</FieldLabel>
            <MultipleImagesUploader onChange={setImages} resSuccess={resSuccess} />
          </Field>
        </div>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="create-review-form"
            className="w-full hover:cursor-pointer"
          >
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
