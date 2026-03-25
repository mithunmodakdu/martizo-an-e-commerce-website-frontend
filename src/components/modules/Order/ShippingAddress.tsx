import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOrderByTransactionIdQuery } from "@/redux/features/order/order.api";
import { MapPin } from "lucide-react";
import { useParams } from "react-router";

export default function ShippingAddress() {
  const params = useParams();
  const { data: orderData } = useGetOrderByTransactionIdQuery(
    params.transactionId,
  );
  console.log(orderData);

  return (
    <Card className="shadow-none my-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="size-5 text-primary" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">{orderData?.data?.shippingAddress.name}</p>
          <p className="text-sm text-muted-foreground">
            {orderData?.data?.shippingAddress?.address}
          </p>
          <p className="text-sm text-muted-foreground">
            {orderData?.data?.shippingAddress?.city}-
            {orderData?.data?.shippingAddress?.postalCode},{" "}
            {orderData?.data?.shippingAddress?.city},{" "}
            {orderData?.data?.shippingAddress?.country}
          </p>
          <p className="text-sm text-muted-foreground">
            {orderData?.data?.shippingAddress?.phone}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
