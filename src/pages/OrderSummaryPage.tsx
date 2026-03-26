import OrderInfoBar from "@/components/modules/Order/OrderInfoBar";
import OrderItems from "@/components/modules/Order/OrderItems";
import ShippingAddress from "@/components/modules/Order/ShippingAddress";
import SuccessHeader from "@/components/modules/Order/SuccessHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetOrderByTransactionIdQuery } from "@/redux/features/order/order.api";
import { useGetInvoiceDownloadUrlQuery } from "@/redux/features/payments/payments.api";
import { Download, Package, Printer } from "lucide-react";
import { useParams } from "react-router";

export default function OrderSummaryPage() {
  const params = useParams();
  const { data: orderData } = useGetOrderByTransactionIdQuery(
    params.transactionId,
  );
  const { data: invoiceUrlData } = useGetInvoiceDownloadUrlQuery(
    orderData?.data?.paymentId,
  );
  console.log(invoiceUrlData?.data);

  const handleDownloadInvoice = () => {
    if (orderData.success) {
      if (invoiceUrlData.success) {
        window.open(invoiceUrlData.data, "_blank");
      }
    }
  };

  return (
    <section className="py-16 md:py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <SuccessHeader />
        <OrderInfoBar />
        <OrderItems />
        <ShippingAddress />
        <Card className="shadow-none">
          <CardContent className="space-y-3 p-4">
            <Button
              onClick={() => handleDownloadInvoice()}
              className="w-full cursor-pointer"
            >
              <Download className="mr-2 size-4" />
              Download Invoice
            </Button>
            <Button
              onClick={() => handleDownloadInvoice()}
              className="w-full cursor-pointer"
              variant="outline"
            >
              <Printer className="mr-2 size-4" />
              Print Invoice
            </Button>
            <Button className="w-full" variant="ghost">
              <Package className="mr-2 size-4" />
              Track Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
