import { useState } from "react";
import {
  CheckoutFormZodSchema,
  type CheckoutFormType,
  type ICheckoutProps,
} from "./checkout.types";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressFields } from "./AddressFields";
import { Cart } from "../Cart/Cart";
import { PaymentMethodFields } from "./PaymentMethodFields";

export const Checkout = ({ className }: ICheckoutProps) => {
  const [activeAccordion, setActiveAccordion] = useState("item-1");

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

  const onSubmit = (data: CheckoutFormType) => {
    console.log(data);
  };

  const onContinue = (value: string) => {
    setActiveAccordion(value);
  };

  const handleOnValueChange = (value: string) => {
    setActiveAccordion(value);
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
                <AddressFields/>
                <PaymentMethodFields/>
                 <Button type="submit" className="w-full">
                          Place Order
                        </Button>
                {/* <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  value={activeAccordion}
                  onValueChange={handleOnValueChange}
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="px-1 py-7 text-lg font-semibold hover:no-underline [&>svg:last-child]:hidden [&[data-state=closed]>svg:nth-of-type(2)]:hidden [&[data-state=open]>svg:nth-of-type(1)]:hidden [&[data-state=open]>svg:nth-of-type(2)]:block">
                      Shipping Address
                      <Plus className="pointer-events-none size-4 shrink-0 self-center text-muted-foreground" />
                      <Minus className="pointer-events-none hidden size-4 shrink-0 self-center text-muted-foreground" />
                    </AccordionTrigger>
                    <AccordionContent className="px-1 pb-7">
                      <div className="space-y-7">
                        <AddressFields />
                        <Button
                          type="button"
                          className="w-full"
                          variant="secondary"
                          onClick={() => onContinue("item-2")}
                        >
                          Continue
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="px-1 py-7 text-lg font-semibold hover:no-underline [&>svg:last-child]:hidden [&[data-state=closed]>svg:nth-of-type(2)]:hidden [&[data-state=open]>svg:nth-of-type(1)]:hidden [&[data-state=open]>svg:nth-of-type(2)]:block">
                      Payment Method
                      <Plus className="pointer-events-none size-4 shrink-0 self-center text-muted-foreground" />
                      <Minus className="pointer-events-none hidden size-4 shrink-0 self-center text-muted-foreground" />
                    </AccordionTrigger>
                    <AccordionContent className="px-1 pb-7">
                      <div className="space-y-7">
                        <PaymentMethodFields />
                       
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion> */}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
};
