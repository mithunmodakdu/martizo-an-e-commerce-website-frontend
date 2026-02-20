import { useFieldArray, useFormContext} from "react-hook-form";
import type { ICartItem, ICartProps } from "./cart.types";
import { useCallback } from "react";
import { CartItem } from "./CartItem";
import { Price, PriceValue } from "../Product/Price";


export const Cart = ({ cartItems}: ICartProps) => {
  const {watch, control} = useFormContext();
  
  const { fields, remove, update } = useFieldArray({
    control,
    name: "products",
  });

  const formItems = watch("products");

  const totalPrice = formItems?.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  const handleRemove = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );

  const handleQuantityChange = useCallback(
    (index: number) => (newQty: number) =>
      update(index, { ...fields[index], quantity: newQty }),
    [update, fields],
  );

  return (
    <div>
      <div className="border-b py-7">
        <h2 className="text-lg leading-relaxed font-semibold">Your Cart</h2>
      </div>
      <ul className="space-y-12 py-7">
        {fields.map((field, index) => {
          return (
            <li key={field.id}>
              <CartItem
                {...(cartItems.find(
                  (p) => p.productId === field.productId,
                ) as ICartItem)}
                onRemoveClick={() => handleRemove(index)()}
                onQuantityChange={(newQty: number) =>
                  handleQuantityChange(index)(newQty)
                }
                index={index}
              />
            </li>
          );
        })}
      </ul>
      <div>
        <div className="space-y-3.5 border-y py-7">
          <div className="flex justify-between gap-3">
            <p className="text-sm">Subtotal</p>
            <Price className="text-sm font-normal">
              <PriceValue
                price={totalPrice}
                currency={cartItems[0].price.currency}
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
            <p className="text-sm">$35.80</p>
          </div>
        </div>
        <div className="py-7">
          <div className="flex justify-between gap-3">
            <p className="text-lg leading-tight font-medium">Total</p>
            <Price className="text-xl font-medium">
              <PriceValue
                price={totalPrice}
                currency={cartItems[0].price.currency}
                variant="regular"
              />
            </Price>
          </div>
        </div>
      </div>
    </div>
  );
};




