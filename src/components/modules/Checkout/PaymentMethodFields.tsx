import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, useFormContext } from "react-hook-form";

export const PaymentMethodFields = () => {
  const form = useFormContext();

  return (
    <div>
      <Controller
        name="paymentMethod"
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldSet>
            <FieldLegend className="font-bold">Payment Method</FieldLegend>
            <RadioGroup
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <FieldLabel htmlFor="payment-method-cod">
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldTitle>Cash on Delivery</FieldTitle>
                    <FieldDescription>
                      You can pay cash while receiving product delivery.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value="COD"
                    id="payment-method-cod"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="payment-method-ssl-commerz">
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldTitle>SSL_COMMERZ</FieldTitle>
                    <FieldDescription>
                      You can pay through ssl_commerz.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value="SSL_COMMERZ"
                    id="payment-method-ssl-commerz"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
        )}
      />
    </div>
  );
};
