import OrderInfoBar from "@/components/modules/Order/OrderInfoBar";
import OrderItems from "@/components/modules/Order/OrderItems";
import SuccessHeader from "@/components/modules/Order/SuccessHeader";

export default function OrderSummaryPage() {
  return (
    <section className="py-16 md:py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <SuccessHeader/>
        <OrderInfoBar/>
        <OrderItems/>
      </div>
    </section>
  );
}
