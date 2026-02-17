import z from "zod";
import type { ICartItem } from "../Cart/cart.types";

export const PAYMENT_METHODS = {
  creditCard: "creditCard",
  paypal: "paypal",
  onlineBankTransfer: "onlineBankTransfer",
};

export type PaymentMethod = keyof typeof PAYMENT_METHODS;

export const CreditCardPayment = z.object({
  method: z.literal(PAYMENT_METHODS.creditCard),
  cardholderName: z.string(),
  cardNumber: z.string(),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format (MM/YY)")
    .refine((value) => {
      const [mm, yy] = value.split("/").map(Number);

      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear() % 100;

      if (yy < currentYear) return false;

      if (yy === currentYear && mm < currentMonth) return false;

      return true;
    }, "Card has expired"),
  cvc: z.string(),
});

export const PayPalPayment = z.object({
  method: z.literal(PAYMENT_METHODS.paypal),
  payPalEmail: z.string(),
});

export const BankTransferPayment = z.object({
  method: z.literal(PAYMENT_METHODS.onlineBankTransfer),
  bankName: z.string(),
  accountNumber: z.string(),
});

export const PaymentSchema = z.discriminatedUnion("method", [
  CreditCardPayment,
  PayPalPayment,
  BankTransferPayment,
]);

export const checkoutFormSchema = z.object({
  contactInfo: z.object({
    email: z.string(),
    subscribe: z.boolean().optional(),
  }),
  address: z.object({
    country: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    postalCode: z.string(),
    city: z.string(),
    phone: z.string(),
  }),
  shippingMethod: z.string(),
  payment: PaymentSchema,
  products: z
    .object({
      product_id: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
    .array(),
});

export type CheckoutFormType = z.infer<typeof checkoutFormSchema>;

export interface ICheckoutProps {
  cartItems?: ICartItem[];
  className?: string;
}