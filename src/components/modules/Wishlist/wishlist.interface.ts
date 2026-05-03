import type { IProductPrice } from "../Product/product.types";

export interface IWishListItem {
  productId: string;
  addedAt: string; 
}

export interface IWishlistProductItem {
  _id: string;
  title: string;
  thumbnail: string;
  price: IProductPrice;
  inStock: boolean;
  priceDrop?: boolean;
}

export interface IWishListCardItem {
  productId: IWishlistProductItem;
  addedAt: string; 
}