import type { ICartItem } from "./cart.types";
import { CartItem } from "./CartItem";
import { Price, PriceValue } from "../Product/Price";
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
} from "@/redux/features/cart/cart.api";
import Loading from "@/utils/Loading";
import { toast } from "sonner";
import { useLocation } from "react-router";

export const Cart = ({ city = "" }) => {
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery(undefined);
  const [deleteCartItem] = useDeleteCartItemMutation();
  const location = useLocation();
  const pathname = location.pathname;

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


  const subTotal = Number(
    cartItems?.reduce(
      (total, item) =>
        total + (item.price.sale ?? item.price.regular) * item.quantity,
      0,
    ),
  );

  const shippingCost = subTotal > 0? (city?.toLowerCase() === "dhaka" ? 60 : 120) : 0;

  const tax = Number((subTotal * 0.075).toFixed(2));
  const totalPrice = subTotal + shippingCost + tax;

  const handleRemove = async (productId: string) => {
    const toastId = toast.loading("Removing product from the cart...");
    try {
      const res = await deleteCartItem(productId);
      if (res.data.success) {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
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
                />
              </li>
            );
          })
        )}
      </ul>
      {pathname === "/cart" && (
        <div>
          <div className="space-y-3.5 border-y py-7">
            <div className="flex justify-between gap-3">
              <p className="text-sm">Subtotal</p>
              <Price className="text-sm font-normal">
                <PriceValue
                  price={subTotal}
                  currency={cartItems?.[0]?.price?.currency || "USD"}
                  variant="regular"
                />
              </Price>
            </div>
          </div>
        </div>
      )}
      {!(pathname === "/cart") && (
        <div>
          <div className="space-y-3.5 border-y py-7">
            <div className="flex justify-between gap-3">
              <p className="text-sm">Subtotal</p>
              <Price className="text-sm font-normal">
                <PriceValue
                  price={subTotal}
                  currency={cartItems?.[0]?.price?.currency || "BDT"}
                  variant="regular"
                />
              </Price>
            </div>
            <div className="flex justify-between gap-3">
              <p className="text-sm">Shipping</p>
              <Price className="text-sm font-normal">
                <PriceValue
                  price={shippingCost}
                  currency={cartItems?.[0]?.price?.currency || "BDT"}
                  variant="regular"
                />
              </Price>
            </div>
            <div className="flex justify-between gap-3">
              <p className="text-sm">Estimated Tax</p>
              <Price className="text-sm font-normal">
                <PriceValue 
                  price={tax} 
                  currency={cartItems?.[0]?.price?.currency || "BDT"} 
                  variant="regular" 
                />
              </Price>
            </div>
          </div>
          <div className="py-7">
            <div className="flex justify-between gap-3">
              <p className="text-lg leading-tight font-medium">Total</p>
              <Price className="text-xl font-medium">
                <PriceValue
                  price={totalPrice}
                  currency={cartItems?.[0]?.price?.currency || "BDT"}
                  variant="regular"
                />
              </Price>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
