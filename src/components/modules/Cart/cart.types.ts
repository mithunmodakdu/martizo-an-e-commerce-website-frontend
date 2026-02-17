import type { UseFormReturn } from "react-hook-form";
import type { CheckoutFormType } from "../Checkout/checkout.types";

export interface IProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

export interface ICartItem {
  product_id: string;
  link: string;
  name: string;
  image: string;
  price: IProductPrice;
  quantity: number;
  details: {
    label: string;
    value: string;
  }[];
};

export interface ICartItemProps extends ICartItem {
  index: number;
  onRemoveClick: () => void;
  onQuantityChange: (newQty: number) => void;
}

export interface ICartProps {
  cartItems: ICartItem[];
  form?: UseFormReturn<CheckoutFormType>;
}

