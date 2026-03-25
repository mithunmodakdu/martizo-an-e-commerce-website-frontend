import OrderInfoBar from "@/components/modules/Order/OrderInfoBar";
import SuccessHeader from "@/components/modules/Order/SuccessHeader";

export default function OrderSummaryPage() {
  return (
    <section className="py-16 md:py-24 px-5">
      <div className="container max-w-7xl">
        <SuccessHeader/>
        <OrderInfoBar/>
      </div>
    </section>
  );
}
