import type { UseFormReturn } from "react-hook-form";
import type { CheckoutFormType } from "../Checkout/checkout.types";
import type {ICategory, IVariant } from "../Product/product.types";

export interface IProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

export interface ICartItem {
  productId: string;
  link?: string;
  name: string;
  category: string;
  price: IProductPrice;
  quantity: number;
  image?: {src: string | undefined, alt: string};
  variant?: IVariant;
  details?: {
    label: string;
    value: string;
  }[];
};


export interface ICartItemProps extends ICartItem {
  onRemoveClick: () => void;
}

export interface ICartProps {
  cartItems: ICartItem[];
  form?: UseFormReturn<CheckoutFormType>;
}

