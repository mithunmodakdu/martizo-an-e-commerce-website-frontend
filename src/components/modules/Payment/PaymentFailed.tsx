import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Link } from "react-router";
import type { ISearchProps } from "./payment.interfaces";

export default function PaymentFailed({search}: ISearchProps) {
  const { message } = search;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-background text-foreground p-8 shadow-lg shadow-gray-500 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>

        {/* Message */}
        {message && <p className="mb-6">{message}</p>}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link to="/orders">
            <Button className="w-full cursor-pointer">Try again to pay</Button>
          </Link>

          <Link to="/products">
            <Button className="w-full cursor-pointer" variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
