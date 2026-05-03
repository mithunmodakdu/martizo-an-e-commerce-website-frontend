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
  discountPercentage: number;
  stock: number;
  rating: number;
  ratingCount: number;
}

export interface IWishListCardItem {
  productId: IWishlistProductItem;
  addedAt: string; 
}