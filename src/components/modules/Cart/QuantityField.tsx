import { Field } from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import { QuantityInput } from "./QuantityInput";

export const QuantityField = ({
  index,
  onQuantityChange,
}: {
  index: number;
  onQuantityChange: (n: number) => void;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={`products.${index}.quantity`}
      control={control}
      render={({ field }) => {
        return (
          <Field className="w-full max-w-28">
            <QuantityInput
              inputProps={field}
              onValueChange={(newQty) => {
                field.onChange(newQty);
                onQuantityChange(newQty);
              }}
              className="rounded-none"
            />
          </Field>
        );
      }}
    />
  );
};