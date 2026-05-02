import { Clock } from "lucide-react";
import useCountdown from "./useCountdown";
import CountdownUnit from "./CountdownUnit";


const Countdown = ({endsAt}) => {
  
  const { hours, minutes, seconds } = useCountdown(endsAt);

  return (
    <div className="flex items-center gap-1.5 bg-primary rounded-xl px-3 py-2">
      <Clock className="w-3.5 h-3.5 text-primary-foreground/80 mr-1" />
      <CountdownUnit value={hours} label="hrs" />
      <span className="text-primary-foreground/60 font-bold text-lg pb-3">
        :
      </span>
      <CountdownUnit value={minutes} label="min" />
      <span className="text-primary-foreground/60 font-bold text-lg pb-3">
        :
      </span>
      <CountdownUnit value={seconds} label="sec" />
    </div>
  );
};

export default Countdown;
