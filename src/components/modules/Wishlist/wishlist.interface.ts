export interface IWishlistCard {
  id: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  inStock: boolean;
  priceDrop?: boolean;
}