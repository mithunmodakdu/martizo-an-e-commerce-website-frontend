import { Card, CardTitle } from "@/components/ui/card";
import type { ICartItemProps } from "./cart.types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CartProductDetails } from "./CartProductDetails";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Price, PriceValue } from "../Product/Price";
import { QuantityHandler } from "./QuantityHandler";

export const CartItem = ({
  productId,
  image,
  name,
  link,
  details,
  price,
  quantity,
  onRemoveClick,
}: ICartItemProps) => {
  const { regular, sale, currency } = price;

  return (
    <Card className="rounded-none border-none bg-background p-0 shadow-none">
      <div className="flex w-full gap-3.5 max-sm:flex-col">
        <div className="shrink-0 basis-25">
          <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
            <img
              src={image?.src}
              alt={image?.alt}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>
        </div>
        <div className="flex-1">
          <div className="flex flex-col justify-between gap-3">
            <div className="flex w-full justify-between gap-3">
              <div className="flex-1">
                <CardTitle className="text-sm font-medium">
                  <a href={link}>{name}</a>
                </CardTitle>
                <CartProductDetails details={details} />
              </div>
              <div>
                <Price className="text-sm font-semibold">
                  <PriceValue
                    price={sale?? regular}
                    currency={currency}
                    variant={"regular"}
                  />                
                </Price>
              </div>
            </div>
            <div className="flex w-full justify-between gap-3">
              <QuantityHandler productId={productId} quantity={quantity}/>
              <Button className="cursor-pointer" size="icon" variant="destructive" onClick={onRemoveClick}>
                <Trash />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};