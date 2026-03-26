import { useGetMeQuery } from "@/redux/features/users/users.api";
import { CheckCircle } from "lucide-react";

export default function SuccessHeader() {
  const {data: meData} = useGetMeQuery(undefined);

  return (
    <div className="mb-10 text-center">
      <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-emerald-500/10">
        <CheckCircle className="size-10 text-emerald-600" />
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
        Thank you for your order!
      </h1>
      <p className="text-muted-foreground">
        Your invoice has been sent to your email{" "}
        <span className="font-medium text-foreground">
          {meData?.data?.email}
        </span>
      </p>
    </div>
  );
}
