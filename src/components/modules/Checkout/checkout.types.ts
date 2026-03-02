import z from "zod";
import type { ICartItem } from "../Cart/cart.types";

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


export const PayPalPayment = z.object({
  method: z.literal(PAYMENT_METHODS.PAYPAL),
  payPalEmail: z.string(),
});

export const CreditCardPayment = z.object({
  method: z.literal(PAYMENT_METHODS.CREDIT_CARD),
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

export const BankTransferPayment = z.object({
  method: z.literal(PAYMENT_METHODS.ONLINE_BANK_TRANSFER),
  bankName: z.string(),
  accountNumber: z.string(),
});

export const PaymentSchema = z.discriminatedUnion("method", [
  CreditCardPayment,
  PayPalPayment,
  BankTransferPayment,
]);

export interface IShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  country?: string;
}

export const checkoutFormSchema = z.object({
  contactInfo: z.object({
    email: z.string(),
    subscribe: z.boolean().optional(),
  }).optional(),
  shippingAddress: z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  shippingMethod: z.string().optional(),
  payment: PaymentSchema,
  products: z
    .object({
      productId: z.string(),
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

export interface IVariant{
  name: string;
  value: string;
  additionalPrice?: number;
  stock?: number;
  images?: [string];
  sku?: string
} 

export interface IOrderItem {
  productId: string;
  name: string;
  categoryName: string;
  quantity: number;
  price: number;
  variant?: IVariant | null;
  image?: string | null;
}





export enum EOrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED"
}

export interface IOrder {
  userId: string;
  shippingAddress: IShippingAddress;

  items: IOrderItem[];
  itemsPrice : number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  
  paymentMethod: EPaymentMethod;
  paymentId?: Types.ObjectId;
  status: EOrderStatus

  paidAt?: Date | null;
  shippedAt?: Date | null;
  deliveredAt?: Date | null;
  cancelledAt?: Date | null;
  refundedAt?: Date | null;

  createdAt?: Date;
  invoiceNo: string;

}