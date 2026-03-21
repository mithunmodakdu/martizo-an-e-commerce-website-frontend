import PaymentSuccess from "@/components/modules/Payment/PaymentSuccess";
import { useLocation } from "react-router";

export default function PaymentMessagePage() {
  const location = useLocation();
  
  const search = Object.fromEntries(new URLSearchParams(location.search))
  // console.log(search)
  return (
    <div>
      {
        search.status === "success" && <PaymentSuccess search = {search}/>
      }
      
    </div>
  );
}