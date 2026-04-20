import { useState } from "react";
import { useCountdown } from "./useCountDown";
import { Check, Copy, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pad } from "../Shared/pad";

const COUPON_CODE = "MARTIZO10";
// Update this to your real offer deadline
const OFFER_END = new Date(Date.now() + 11 * 3_600_000 + 47 * 60_000);




export const CouponCountdownStrip = () => {
  const { hours, minutes, seconds } = useCountdown(OFFER_END);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(COUPON_CODE).catch((error) => {console.log("copy failed", error)});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="mt-4 rounded-xl border border-border bg-muted/40 px-4 sm:px-6 py-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4"
      aria-label="Coupon code and offer countdown"
    >
      {/* Label */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Tag className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Extra 10% off with coupon</p>
          <p className="text-xs text-muted-foreground">Use at checkout · Min. order ৳1,500</p>
        </div>
      </div>

      {/* Coupon code */}
      <div className="flex items-center gap-2">
        <span
          className="font-mono text-sm font-medium text-primary bg-primary/10 border border-dashed border-primary px-4 py-1.5 rounded-lg tracking-widest select-all cursor-pointer"
          aria-label={`Coupon code: ${COUPON_CODE}`}
        >
          {COUPON_CODE}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copy}
          className="gap-1.5 text-xs"
          aria-label={copied ? "Coupon code copied" : "Copy coupon code"}
        >
          {copied
            ? <Check className="w-3.5 h-3.5" aria-hidden="true" />
            : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {/* Countdown*/}
      <div
        className="flex items-center gap-2"
        aria-live="polite"
        aria-label={`Offer ends in ${pad(hours)} hours ${pad(minutes)} minutes ${pad(seconds)} seconds`}
      >
        <span className="text-xs text-muted-foreground">Offer ends in</span>
        <div className="flex items-center gap-1" aria-hidden="true">
          {[
            { val: hours,   label: "hrs" },
            { val: minutes, label: "min" },
            { val: seconds, label: "sec" },
          ].map((unit, i) => (
            <span key={unit.label} className="flex items-center gap-1">
              {i > 0 && (
                <span className="text-muted-foreground font-medium pb-2">:</span>
              )}
              <span className="flex flex-col items-center">
                <span className="text-lg font-medium text-foreground leading-none">
                  {pad(unit.val)}
                </span>
                <span className="text-[10px] text-muted-foreground">{unit.label}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
