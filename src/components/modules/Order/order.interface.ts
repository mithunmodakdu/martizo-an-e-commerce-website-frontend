import type {
  IShippingAddress,
  TPaymentMethod,
} from "../Checkout/checkout.types";
import type { IProductPrice, IVariant } from "../Product/product.types";

export interface IOrderItem {
  productId: string;
  name: string;
  categoryName: string;
  quantity: number;
  price: IProductPrice;
  variant?: IVariant | null;
  image?: { src: string; alt: string };
}

export type TOrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export type TOrderSortField =
  | "orderId"
  | "customer"
  | "date"
  | "total"
  | "items"
  | "status"
  | null;

export type TSortDirection = "asc" | "desc";

export interface IOrder {
  _id: string;
  orderNo: string;
  userId: { _id: string; name: string; email: string };
  shippingAddress: IShippingAddress;

  items: IOrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;

  paymentMethod: TPaymentMethod;
  paymentId?: string;
  status: TOrderStatus;

  carrier?: string;
  trackingNumber?: string;
  lastLocation?: string;
  paidAt?: Date | null;
  processedAt?: Date | null;
  shippedAt?: Date | null;
  outForDeliveryAt?: Date | null;
  deliveredAt?: Date | null;
  estimatedDelivery?: Date | null;
  cancelledAt?: Date | null;
  refundedAt?: Date | null;

  createdAt?: Date;
  invoiceNo: string;
}

export interface IOrderTableRow {
  id: string;
  orderId: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  status: TOrderStatus;
  paymentMethod: string;
}

export interface IOrderSortableHeaderProps {
  field: TOrderSortField;
  label: string;
  sortField: TOrderSortField;
  sortDir: TSortDirection;
  onSort: (field: TOrderSortField) => void;
  className?: string;
}
