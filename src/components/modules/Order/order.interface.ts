import type { IProductPrice } from "../Cart/cart.types";
import type { IVariant } from "../Product/product.types";

export interface IOrderItem {
  productId: string;
  name: string;
  categoryName: string;
  quantity: number;
  price: IProductPrice;
  variant?: IVariant | null;
  image?: {src: string, alt: string};
}