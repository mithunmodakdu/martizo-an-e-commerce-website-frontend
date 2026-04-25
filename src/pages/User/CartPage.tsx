import { Cart } from "@/components/modules/Cart/Cart";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CartPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="border-b pt-7 pb-4">
        <h2 className="text-4xl leading-relaxed font-semibold">Your Cart</h2>
      </div>
      <Cart/>
      <div className="py-7">
        <Link to={"/checkout"}>
          <Button className="w-full cursor-pointer">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
