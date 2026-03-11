import z from "zod";

export const PAYMENT_METHODS = {
  COD: "COD",                  // Cash on Delivery
  SSL_COMMERZ: "SSL_COMMERZ",  
  STRIPE: "STRIPE",            
  PAYPAL: "PAYPAL",            
  BKASH: "BKASH",              
  NAGAD: "NAGAD",
  CREDIT_CARD: "CREDIT_CARD",
  ONLINE_BANK_TRANSFER: "ONLINE_BANK_TRANSFER",
};

export type TPaymentMethod = keyof typeof PAYMENT_METHODS;

export interface IShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  country?: string;
}

export const ShippingAddressZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, {
      message: "Name is too short. It must have minimum 2 characters.",
    })
    .max(50, {
      message: "Name is too long. It must have maximum 50 characters.",
    }),
  phone: z
    .string({ message: "Phone number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh.   Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .min(1, { error: "Phone number is required" }),
  address: z
    .string({ error: "Address must be a string" })
    .min(2, { error: "Address is required" })
    .max(200, { message: "Address can not exceed 200 characters" }),
  city: z.string({ error: "City must be a string" }).min(1, {error: "City is required"}),
  postalCode: z.string({ error: "Postal code must be a string" }).optional(),
  country: z.string({ error: "Country must be a string" }).optional(),
  
});

export const CheckoutFormZodSchema = z.object({
  shippingAddress: ShippingAddressZodSchema,
  paymentMethod: z.enum(Object.values(PAYMENT_METHODS)),
  
});

export type CheckoutFormType = z.infer<typeof CheckoutFormZodSchema>;

export interface ICheckoutProps {
  className?: string;
}