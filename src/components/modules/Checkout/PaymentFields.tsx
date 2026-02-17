import { Field, FieldContent, FieldError, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, useFormContext } from "react-hook-form";
import type { PaymentMethod } from "./checkout.types";
import { PaymentFieldsByMethod } from "./PaymentFieldsByMethod";

export const PaymentFields = () => {
  const form = useFormContext();
  const paymentMethod = form.watch("payment.method") as PaymentMethod;

  return (
    <div className="space-y-7">
      <Controller
        name="payment.method"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <RadioGroup
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <FieldLabel htmlFor="checkout-payment-method-1">
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent className="flex-1">
                    <FieldTitle>Credit Card</FieldTitle>
                  </FieldContent>
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/visa-icon.svg"
                    alt="Credit Card"
                    className="size-5"
                  />
                  <RadioGroupItem
                    value="creditCard"
                    id="checkout-payment-method-1"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="checkout-payment-method-2">
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent className="flex-1">
                    <FieldTitle>PayPal</FieldTitle>
                  </FieldContent>
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/paypal-icon.svg"
                    alt="PayPal"
                    className="size-5"
                  />
                  <RadioGroupItem
                    value="paypal"
                    id="checkout-payment-method-2"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="checkout-payment-method-3">
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldTitle>Online Bank Transfer</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="onlineBankTransfer"
                    id="checkout-payment-method-3"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <PaymentFieldsByMethod method={paymentMethod} />
    </div>
  );
};