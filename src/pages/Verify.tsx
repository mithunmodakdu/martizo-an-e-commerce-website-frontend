import { OTPForm } from "@/components/ui/otpForm";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Verify() {
  const location = useLocation();
  // console.log(location.state)
  const navigate = useNavigate();
  const [email] = useState(location.state);

  // useEffect(() => {
  //   if(!email){
  //     navigate("/")
  //   }
  // }, [email, navigate])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <OTPForm />
      </div>
    </div>
  );
}