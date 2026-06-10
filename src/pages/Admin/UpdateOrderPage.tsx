import type { TOrderStatus } from "@/components/modules/Order/order.interface";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetOrderByIdQuery } from "@/redux/features/order/order.api";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

// Constants 
const STATUS_OPTIONS: { value: TOrderStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Paid" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "OUT_FOR_DELIVERY", label: "Out for delivery" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REFUNDED", label: "Refunded" },
];

const STATUS_BADGE_CLASSES: Record<TOrderStatus, string> = {
  PENDING:
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  PAID:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  PROCESSING:
    "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800",
  SHIPPED:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  OUT_FOR_DELIVERY:
    "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800",
  DELIVERED:
    "bg-green-200 text-green-900 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700",
  FAILED:
    "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  CANCELLED:
    "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
  REFUNDED:
    "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-800",
};

// Sub-components 
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
      {children}
    </p>
  );
}



const UpdateOrderPage = () => {
  const params = useParams()
  const {data: orderData, isLoading} = useGetOrderByIdQuery(params.orderId);

  const form = useForm({
     defaultValues: {
      status: "",
      carrier: "",
      trackingNumber: "",
      lastLocation: "",
      paidAt: "",
      processedAt: "",
      shippedAt: "",
      outForDeliveryAt: "",
      deliveredAt: "",
      estimatedDelivery: "",
      cancelledAt: "",
      refundedAt: "",
    },

  });

  const {watch, reset, formState} = form;
  const status = watch("status") as TOrderStatus || "";

  const handleSubmit = (data) => {
    console.log(data)
  }


  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">
            Update order
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Order No:{" "}
            <span className="font-mono text-foreground/80">{orderData?.orderNo}</span>
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">
                    Order details
                  </CardTitle>
                  {status && STATUS_BADGE_CLASSES[status as TOrderStatus] && (
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium ${STATUS_BADGE_CLASSES[status as TOrderStatus]}`}
                    >
                      {
                        STATUS_OPTIONS.find((o) => o.value === status)?.label
                      }
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Status */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <SectionLabel>Order status</SectionLabel>
                  <FormField
                    control={form.control}
                    name="status"
                    rules={{ required: "Status is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status{" "}
                          <span className="text-destructive ml-0.5">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status…" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {STATUS_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

              </CardContent>
            </Card>
          </form>
        </Form>


      </div>
    </div>
  );
};

export default UpdateOrderPage;
