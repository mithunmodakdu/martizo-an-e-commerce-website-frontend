import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Verify() {
  const location = useLocation();
  // console.log(location.state)
  const navigate = useNavigate();
  const [email] = useState(location.state);

  useEffect(() => {
    if(!email){
      navigate("/")
    }
  }, [email, navigate])

  return (
    <div>
      Verify Component
    </div>
  );
}