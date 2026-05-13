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
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

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

