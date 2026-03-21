import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

export interface ISearch {
  transactionId: string;
  amount: number;
  status?: string;
  message: string;
}
export interface IProps{
  search: ISearch
}

export default function PaymentSuccess({search}: IProps) {
  const { transactionId, amount, message } = search;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-background text-foreground p-8 shadow-lg shadow-gray-500 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Payment Successful 🎉</h1>

        {/* Message */}
        {message && <p className="mb-6">{message}</p>}

        <div className="bg-gray-100 text-gray-700 rounded-lg p-4 text-sm mb-6">
          {amount && (
            <p>
              <span className="font-semibold">Total Amount Paid:</span> Tk.{" "}
              {amount}
            </p>
          )}

          {transactionId && (
            <p>
              <span className="font-semibold">Transaction ID:</span>{" "}
              {transactionId}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link to="/orders">
            <Button className="w-full cursor-pointer">View Orders</Button>
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
