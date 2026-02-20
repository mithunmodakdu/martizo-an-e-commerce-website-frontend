import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TProductCardProps } from "./product.types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Price, PriceValue } from "./Price";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import type { ICartItem } from "../Cart/cart.types";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { toast } from "sonner";

export const ProductCard = ({
  _id,
  name,
  slug,
  category,
  description,
  image,
  price,
  badges,
}: TProductCardProps) => {
  const [addToCart] = useAddToCartMutation()
  const { regular, sale, currency } = price;

  const cartData: ICartItem = {
    productId: _id,
    name,
    category: category?._id,
    price,
    quantity: 1,
    image,
  };
  

  const handleAddToCart = async (data: ICartItem) => {
    // console.log(data)
    const toastId = toast.loading("Adding product to cart...")
    try {
      const res = await addToCart(data);
      // console.log(res)
      if(res.data.success){
        toast.success(res.data.message, {id: toastId})
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="relative group ">
      <Card className="min-w-[350px] min-h-[420px] overflow-hidden p-0 rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl">
        <CardHeader className="relative block p-0">
          <AspectRatio ratio={1.5} className="overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="h-56 w-full rounded-tr-3xl rounded-bl-3xl object-cover sm:h-64 lg:h-72"
            />
          </AspectRatio>
          <div className="absolute start-4 top-4">
            <div className="flex gap-3">
              {badges?.map((badge) => (
                <div>
                  {badge.text ? (
                    <Badge
                      style={{
                        backgroundColor: badge.color,
                      }}
                    >
                      {badge.text}
                    </Badge>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-4 pb-6">
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            {description}
          </CardDescription>
          <div className="mt-auto">
            <Price onSale={sale != null} className="text-lg font-semibold">
              <PriceValue price={sale} currency={currency} variant="sale" />
              <PriceValue
                price={regular}
                currency={currency}
                variant="regular"
              />
            </Price>
          </div>
        </CardContent>
      </Card>
      <div
        className="absolute min-w-[300px] min-h-[400px] p-0 rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl inset-0 bg-muted-foreground flex items-center justify-center gap-3
        opacity-0 group-hover:opacity-80 transition-all duration-300 ease-in-out"
      >
        
          <Button onClick={() => handleAddToCart(cartData)} className="transform translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-in-out hover:cursor-pointer">
            Add to Cart
          </Button>
       
        <Link to={`/product-details/${slug}`} className="asChild">
          <Button
            variant={"secondary"}
            className="transform -translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-in-out hover:cursor-pointer"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
