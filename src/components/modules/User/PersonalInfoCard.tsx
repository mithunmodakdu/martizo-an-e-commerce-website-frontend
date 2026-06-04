import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMeQuery } from "@/redux/features/users/users.api";
import getFormattedDate from "@/utils/getFormattedDate";

const PersonalInfoCard = () => {
  const { data: userData } = useGetMeQuery(undefined);

  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="px-6 pt-6 pb-1">
        <CardTitle className="text-sm font-semibold text-foreground">
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { label: "Full Name", value: userData?.data?.name },
            { label: "Email Address", value: userData?.data?.email },
            { label: "Phone Number", value: userData?.data?.phone },
            {
              label: "Member Since",
              value: getFormattedDate(userData?.data?.createdAt),
            },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {label}
              </p>
              <p className="text-sm font-medium text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
