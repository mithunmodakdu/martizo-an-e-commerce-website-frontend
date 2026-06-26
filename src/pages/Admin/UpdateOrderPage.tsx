/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  TOrderStatus,
  TOrderUpdateFormValues,
} from "@/components/modules/Order/order.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useGetOrderByIdQuery, useUpdateOrderMutation } from "@/redux/features/order.api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

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
  PAID: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
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

// Statuses which reveal tracking fields
const TRACKING_STATUSES = new Set<TOrderStatus>([
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
]);

// Timestamp fields which are relevant per status
const TIMESTAMP_FIELDS: {
  key: keyof TOrderUpdateFormValues;
  label: string;
  statuses: TOrderStatus[];
}[] = [
  {
    key: "paidAt",
    label: "Paid at",
    statuses: [
      "PAID",
      "PROCESSING",
      "SHIPPED",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
    ],
  },
  {
    key: "processedAt",
    label: "Processed at",
    statuses: ["PROCESSING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"],
  },
  {
    key: "shippedAt",
    label: "Shipped at",
    statuses: ["SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"],
  },
  {
    key: "outForDeliveryAt",
    label: "Out for delivery at",
    statuses: ["OUT_FOR_DELIVERY", "DELIVERED"],
  },
  {
    key: "deliveredAt",
    label: "Delivered at",
    statuses: ["DELIVERED"],
  },
];

// Sub-components
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
      {children}
    </p>
  );
}

function OptionalTag() {
  return (
    <span className="text-[11px] italic text-muted-foreground/70 ml-1">
      optional
    </span>
  );
}

//:::: UpdateOrderPage ::::
const UpdateOrderPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: orderData} = useGetOrderByIdQuery(params.orderId);
  const [updateOrder] = useUpdateOrderMutation();

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
      estimatedDeliveryAt: "",
      cancelledAt: "",
      refundedAt: "",
    },
  });

  const { watch, reset, formState } = form;
  const status = (watch("status") as TOrderStatus) || "";

  const showTracking = status
    ? TRACKING_STATUSES.has(status as TOrderStatus)
    : false;
  const showCancelledAt = status === "CANCELLED";
  const showRefundedAt = status === "REFUNDED";

  const activeTimestamps = TIMESTAMP_FIELDS.filter(
    ({ statuses }) => status && statuses.includes(status as TOrderStatus),
  );

  const formatDateTimeLocal = (date: string | Date) => {
    return new Date(date).toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (orderData) {
      reset({
        status: orderData.status || "",
        carrier: orderData.carrier || "",
        trackingNumber: orderData.trackingNumber || "",
        lastLocation: orderData.lastLocation || "",
        paidAt: orderData.paidAt ? formatDateTimeLocal(orderData.paidAt) : "",
        processedAt: orderData.processedAt
          ? formatDateTimeLocal(orderData.processedAt)
          : "",
        shippedAt: orderData.shippedAt
          ? formatDateTimeLocal(orderData.shippedAt)
          : "",
        outForDeliveryAt: orderData.outForDeliveryAt
          ? formatDateTimeLocal(orderData.outForDeliveryAt)
          : "",
        deliveredAt: orderData.deliveredAt
          ? formatDateTimeLocal(orderData.deliveredAt)
          : "",
        estimatedDeliveryAt: orderData.estimatedDeliveryAt
          ? formatDateTimeLocal(orderData.estimatedDeliveryAt)
          : "",
        cancelledAt: orderData.cancelledAt
          ? formatDateTimeLocal(orderData.cancelledAt)
          : "",
        refundedAt: orderData.refundedAt
          ? formatDateTimeLocal(orderData.refundedAt)
          : "",
      });
    }
  }, [reset, orderData]);

  const handleSubmit = async(data: TOrderUpdateFormValues) => {
    
    const dataToUpdate = { orderId: orderData._id, data };
    const toastId = toast.loading("Updating order...")

    try {
      const res = await updateOrder(dataToUpdate).unwrap();

      if(res.success){
        toast.success(res.message, {id: toastId})
        navigate("/admin/all-orders")
      }
    } catch (error: any) {
      toast.error(error?.data?.message, {id: toastId})
    }
  };

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
            <span className="font-mono text-foreground/80">
              {orderData?.orderNo}
            </span>
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
                      {STATUS_OPTIONS.find((o) => o.value === status)?.label}
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

                {/* Tracking info */}
                {showTracking && (
                  <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                    <SectionLabel>Tracking info</SectionLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="carrier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Carrier <OptionalTag />
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Sundarban Courier"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="trackingNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Tracking number <OptionalTag />
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. BD9283747201"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="lastLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Last known location <OptionalTag />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Chittagong sorting centre"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/*  Timestamps  */}
                {activeTimestamps.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <SectionLabel>Timestamps</SectionLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeTimestamps.map(({ key, label }) => (
                        <FormField
                          key={key}
                          control={form.control}
                          name={key}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {label} <OptionalTag />
                              </FormLabel>
                              <FormControl>
                                <Input type="datetime-local" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Cancellation / Refund */}
                {(showCancelledAt || showRefundedAt) && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <SectionLabel>
                      {showCancelledAt ? "Cancellation" : "Refund"}
                    </SectionLabel>
                    <FormField
                      control={form.control}
                      name={showCancelledAt ? "cancelledAt" : "refundedAt"}
                      render={({ field }) => (
                        <FormItem className="max-w-xs">
                          <FormLabel>
                            {showCancelledAt ? "Cancelled at" : "Refunded at"}{" "}
                            <OptionalTag />
                          </FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Estimated delivery - always visible */}
                <FormField
                  control={form.control}
                  name="estimatedDeliveryAt"
                  render={({ field }) => (
                    <FormItem className="max-w-xs">
                      <FormLabel>
                        Estimated delivery <OptionalTag />
                      </FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Actions buttons */}
                <div className="flex items-center justify-between pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => reset()}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[120px]"
                  >
                    {formState.isSubmitting ? "Saving…" : "Save changes"}
                  </Button>
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
