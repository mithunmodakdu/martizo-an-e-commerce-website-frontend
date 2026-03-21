import PaymentFailed from "@/components/modules/Payment/PaymentFailed";
import PaymentSuccess from "@/components/modules/Payment/PaymentSuccess";
import { useLocation } from "react-router";

export default function PaymentMessagePage() {
  const location = useLocation();
  const search = Object.fromEntries(new URLSearchParams(location.search))
  
  return (
    <div>
      {
        search.status === "success" && <PaymentSuccess search ={search}/>
      }
      {
        search.status === "failed" && <PaymentFailed search ={search}/>
      }
      
    </div>
  );
}