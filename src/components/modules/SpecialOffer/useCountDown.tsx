import { useEffect, useState } from "react";

export const useCountdown = (endDate: Date) => {
  const calc = () => {
    const diff = Math.max(0, endDate.getTime() - Date.now());
    return {
      hours:   Math.floor(diff / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [endDate]);

  return time;
}

