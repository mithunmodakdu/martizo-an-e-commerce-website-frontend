import {
  CheckoutFormZodSchema,
  type CheckoutFormType,
  type ICheckoutProps,
} from "./checkout.types";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AddressFields } from "./AddressFields";
import { Cart } from "../Cart/Cart";
import { PaymentMethodFields } from "./PaymentMethodFields";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";

export const Checkout = ({ className }: ICheckoutProps) => {
  const [createOrder] = useCreateOrderMutation();

  const form = useForm({
    resolver: zodResolver(CheckoutFormZodSchema),
    defaultValues: {
      shippingAddress: {
        name: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
      },
      paymentMethod: "",
    },
  });

  const city = form.watch("shippingAddress.city");

  const onSubmit = async(data: CheckoutFormType) => {
    const res = await createOrder(data);
    console.log(res)
  };

  return (
    <section className={cn("py-10", className)}>
      <div className="container">
        <div className="flex flex-col gap-6 pb-8 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Checkout
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Complete your purchase securely
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-17.5">
          <div>
            <Cart city={city} />
          </div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-7">
                <AddressFields />
                <PaymentMethodFields />
                <Button type="submit" className="w-full">
                  Place Order
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
};
