import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetEarnedPointsInLastMonthQuery,
  useGetMyLoyaltyAccountWithProgressQuery,
} from "@/redux/features/loyalty";
import getFormattedDate from "@/utils/getFormattedDate";

const LoyaltyCard = () => {
  const { data: loyaltyAccountProgressData } =
    useGetMyLoyaltyAccountWithProgressQuery(undefined);
  const { data: earnedPointsInLastMonth } =
    useGetEarnedPointsInLastMonthQuery(undefined);

  const progressPct = Math.min(
    (loyaltyAccountProgressData?.lifetimeEarned /
      loyaltyAccountProgressData?.nextTierMin) *
      100,
    100,
  );

  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="px-6 pt-6 pb-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground">
            Loyalty Rewards
          </CardTitle>
          <Badge
            variant="outline"
            className="text-xs font-semibold text-primary border-primary/30"
          >
            {loyaltyAccountProgressData?.tier} Tier
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold text-foreground">
              {loyaltyAccountProgressData?.lifetimeEarned.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground ml-1.5">points</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {loyaltyAccountProgressData?.pointsToNextTier.toLocaleString()} pts
            to {loyaltyAccountProgressData?.nextTier}
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>{loyaltyAccountProgressData?.tier} (Current)</span>
            <span>
              {loyaltyAccountProgressData?.nextTier} at{" "}
              {loyaltyAccountProgressData?.nextTierMin.toLocaleString()} pts
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-1">
          {[
            { label: "Earned this month", value: earnedPointsInLastMonth?.totalPointsInLastMonth },
            {
              label: "Redeemed total",
              value: loyaltyAccountProgressData?.lifetimeRedeemed,
            },
            {
              label: "Expiry",
              value: getFormattedDate(loyaltyAccountProgressData?.expiryDate),
            },
          ].map(({ label, value }) => (
            <div key={label} className="bg-muted/60 rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-foreground">{value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyCard;
