import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateCartMutation } from "@/redux/features/cart/cart.api";
import { toast } from "sonner";

export interface QuantityProps {
  className?: string;
  max?: number;
  min?: number;
  productId: string;
  quantity: number;
  renderLeftIcon?: () => ReactNode;
  renderRightIcon?: () => ReactNode;
}

export const QuantityHandler = ({
  productId,
  quantity,
  className,
  renderRightIcon,
  renderLeftIcon,
  ...props
}: QuantityProps) => {
  const [updateCart] = useUpdateCartMutation();
  const { min = 1, max = 99 } = props;

  const clamp = (num: number) => Math.max(min, Math.min(max, num));
  
  const handleIncrement = async() => {
    const newValue = clamp((quantity as number) + 1 || min);
    const cartDataToUpdate = {
      productId,
      quantity: newValue
    }
    const toastId = toast.loading("Updating cart...");

    try {
      const res = await updateCart(cartDataToUpdate);
      
      if(res.data.success){
        toast.success(res.data.message, {id: toastId })
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  const handleDecrement = async() => {
    if(quantity === 1){
      toast.error("You can not decrease quantity again. You can remove it.");
      return;
    }

    const newValue = clamp((quantity as number) - 1 || min);
     const cartDataToUpdate = {
      productId,
      quantity: newValue
    }
    const toastId = toast.loading("Updating cart...");

    try {
      const res = await updateCart(cartDataToUpdate);

      if(res.data.success){
        toast.success(res.data.message, {id: toastId })
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div
      className={clsx(
        "flex h-9 w-full max-w-28 items-center overflow-hidden rounded-full border shadow-xs",
        className,
      )}
      aria-label="quantity"
    >
      <Button
        onClick={handleDecrement}
        variant="ghost"
        type="button"
        size="icon"
        className="shrink-0 rounded-none"
      >
        {renderLeftIcon?.() ?? <Minus />}
      </Button>
      <Input
        type="button"
        min={min}
        max={max}
        className="w-full min-w-10 flex-1 [appearance:textfield] rounded-none border-0 !bg-inherit px-1 text-center shadow-none focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={quantity}
      />
      <Button
        onClick={handleIncrement}
        variant="ghost"
        type="button"
        size="icon"
        className="shrink-0 rounded-none"
      >
        {renderRightIcon?.() ?? <Plus />}
      </Button>
    </div>
  );
};

