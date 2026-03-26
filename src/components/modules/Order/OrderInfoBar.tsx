import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetOrderByTransactionIdQuery } from "@/redux/features/order/order.api";
import { useParams } from "react-router";

export default function OrderInfoBar() {
  const params = useParams();
  const { data: orderData } = useGetOrderByTransactionIdQuery(
    params.transactionId,
  );

  const date = new Date(orderData?.data?.createdAt);
  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit"
  })
  const month = date.toLocaleDateString("en-GB", {
    month: "long",
  })
  const year = date.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;


  return (
    <Card className="mb-6 shadow-none">
      <CardContent className="flex items-center justify-between gap-4 p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 h-20">
          <div>
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-semibold">{orderData?.data?.orderNo}</p>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div>
            <p className="text-sm text-muted-foreground">Order Date</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
        </div>
        <Badge className="px-4 py-2 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
          {orderData?.data?.status}
        </Badge>
      </CardContent>
    </Card>
  );
}
