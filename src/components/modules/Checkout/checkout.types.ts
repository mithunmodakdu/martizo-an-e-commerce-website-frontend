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

export interface IShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  country?: string;
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

export const OrderStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED"
}

export type TOrderStatus = keyof typeof OrderStatus;

export interface IOrder {
  userId: string;
  shippingAddress: IShippingAddress;

  items: IOrderItem[];
  itemsPrice : number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  
  paymentMethod: TPaymentMethod;
  paymentId?: string;
  status: TOrderStatus

  paidAt?: Date | null;
  shippedAt?: Date | null;
  deliveredAt?: Date | null;
  cancelledAt?: Date | null;
  refundedAt?: Date | null;

  createdAt?: Date;
  invoiceNo: string;

}

export const checkoutFormSchema = z.object({
  shippingAddress: z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  paymentMethod: z.enum(Object.values(PAYMENT_METHODS)),
  
});

export type CheckoutFormType = z.infer<typeof checkoutFormSchema>;

export interface ICheckoutProps {
  className?: string;
}