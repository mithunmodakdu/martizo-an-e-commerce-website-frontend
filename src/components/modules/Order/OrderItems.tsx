import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetOrderByTransactionIdQuery } from "@/redux/features/order/order.api";
import { ShoppingBag } from "lucide-react";
import { useParams } from "react-router";
import type { IOrderItem } from "./order.interface";
import { Price, PriceValue } from "../Product/Price";

export default function OrderItems() {
  const params = useParams();
  const { data: orderData } = useGetOrderByTransactionIdQuery(
    params.transactionId,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6 lg:col-span-2">
        {/* Order Items */}
        <Card className="shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingBag className="text-primary" />
              Items Ordered
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderData?.data?.items.map((item: IOrderItem, index: number) => (
              <div key={item.productId}>
                <div className="flex gap-4">
                  <div className="w-20 shrink-0">
                    <AspectRatio
                      ratio={1}
                      className="overflow-hidden rounded-lg bg-muted"
                    >
                      <img
                        src={item.image?.src}
                        alt={item.image?.alt}
                        className="size-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium">{item.name}</h3>

                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.categoryName}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <Price
                      onSale={item.price.sale != null}
                      className="text-sm font-semibold"
                    >
                      <PriceValue
                        price={item.price.regular}
                        currency={item.price.currency}
                        variant="regular"
                      />
                      <PriceValue
                        price={item.price.sale}
                        currency={item.price.currency}
                        variant="sale"
                      />
                    </Price>
                  </div>
                </div>
                {index < orderData.data.items.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Totals */}
        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Subtotal</span>
                <Price className="text-sm font-semibold">
                  <PriceValue
                    price={orderData?.data?.itemsPrice}
                    currency={orderData?.data?.items[0].price.currency}
                    variant="regular"
                  />
                </Price>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Shipping</span>
                <Price className="text-sm font-semibold">
                  <PriceValue
                    price={orderData?.data?.shippingPrice}
                    currency={orderData?.data?.items[0].price.currency}
                    variant="regular"
                  />
                </Price>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Tax</span>
                <Price className="text-sm font-semibold">
                  <PriceValue
                    price={orderData?.data?.taxPrice}
                    currency={orderData?.data?.items[0].price.currency}
                    variant="regular"
                  />
                </Price>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span className="font-semibold">Total Paid</span>
                <Price className="text-lg font-semibold">
                  <PriceValue
                    price={orderData?.data?.totalPrice}
                    currency={orderData?.data?.items[0].price.currency}
                    variant="regular"
                  />
                </Price>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
