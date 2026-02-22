// import { useFieldArray, useFormContext} from "react-hook-form";
import type { ICartItem } from "./cart.types";
import { CartItem } from "./CartItem";
import { Price, PriceValue } from "../Product/Price";
import { useGetCartQuery } from "@/redux/features/cart/cart.api";
import Loading from "@/utils/Loading";

export const Cart = () => {
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery(undefined);

  const cartItems: ICartItem[] | [] =
    cartData?.data?.items?.map((item: ICartItem) => ({
      productId: item.productId,
      link: "#",
      name: item.name,
      image: {
        src: item.image?.src,
        alt: item.image?.alt,
      },
      price: {
        regular: item.price.regular,
        sale: item.price.sale,
        currency: item.price.currency,
      },
      quantity: item.quantity,
      details: [
        {
          label: "Color",
          value: "Red",
        },
        {
          label: "Size",
          value: "36",
        },
      ],
    })) || [];

  const totalPrice = cartItems?.reduce(
    (total, item) =>
      total + (item.price.sale ?? item.price.regular) * item.quantity,
    0,
  );

  const tax = totalPrice * 0.05;

  const handleRemove = async (productId: string) => {
    console.log(productId);
  };

  const handleQuantityChange = async (productId: string) => {
    console.log(productId);
  };

  return (
    <div>
      <div className="border-b py-7">
        <h2 className="text-lg leading-relaxed font-semibold">Your Cart</h2>
      </div>
      <ul className="space-y-12 py-7">
        {cartLoading ? (
          <li>
            <Loading></Loading>
          </li>
        ) : cartItems?.length == 0 ? (
          <li>There is no product in the cart</li>
        ) : (
          cartItems?.map((item) => {
            return (
              <li key={item.productId}>
                <CartItem
                  {...item}
                  onRemoveClick={() => handleRemove(item.productId)}
                  onQuantityChange={() => handleQuantityChange(item.productId)}
                />
              </li>
            );
          })
        )}
      </ul>
      <div>
        <div className="space-y-3.5 border-y py-7">
          <div className="flex justify-between gap-3">
            <p className="text-sm">Subtotal</p>
            <Price className="text-sm font-normal">
              <PriceValue
                price={totalPrice}
                currency={cartItems?.[0]?.price?.currency || "USD"}
                variant="regular"
              />
            </Price>
          </div>
          <div className="flex justify-between gap-3">
            <p className="text-sm">Shipping</p>
            <p className="text-sm">Free</p>
          </div>
          <div className="flex justify-between gap-3">
            <p className="text-sm">Estimated Tax</p>
            <p className="text-sm">${tax}</p>
          </div>
        </div>
        <div className="py-7">
          <div className="flex justify-between gap-3">
            <p className="text-lg leading-tight font-medium">Total</p>
            <Price className="text-xl font-medium">
              <PriceValue
                price={totalPrice}
                currency={cartItems?.[0]?.price?.currency || "USD"}
                variant="regular"
              />
            </Price>
          </div>
        </div>
      </div>
    </div>
  );
};
