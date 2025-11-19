import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function CartSheet() {
  const cartItems = [
    { id: 1, name: "T-shirt", price: 20, quantity: 2 },
    { id: 2, name: "Jeans", price: 45, quantity: 1 },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="cursor-pointer" variant="outline">
            <span>
              <ShoppingCart />
            </span>
            <sup>{cartItems.length}</sup>
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[400px] md:w-[540px] p-6">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>

          <ScrollArea className="mt-4 h-[70vh] pr-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </ScrollArea>

          <div className="border-t pt-4 mt-4 flex justify-between items-center">
            <p className="font-semibold text-lg">Total: ${total}</p>
            <Button className="bg-primary text-white">Checkout</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
