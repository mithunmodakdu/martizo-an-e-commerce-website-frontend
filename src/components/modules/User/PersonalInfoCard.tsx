import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useState } from "react";

const user = {
  name: "Rayan Chowdhury",
  email: "rayan@example.com",
  phone: "+880 1712 345 678",
  avatar: "",
  initials: "RC",
  memberSince: "March 2022",
  tier: "Gold",
  points: 3240,
  nextTierPoints: 5000,
};

const PersonalInfoCard = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="px-6 pt-6 pb-1">
        <CardTitle className="text-sm font-semibold text-foreground">
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-5">
        {editMode ? (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: "name", label: "Full Name", type: "text" },
                { key: "email", label: "Email Address", type: "email" },
                { key: "phone", label: "Phone Number", type: "tel" },
              ].map(({ key, label, type }) => (
                <div key={key} className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    {label}
                  </Label>
                  <Input
                    type={type}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                className="gap-2 rounded-lg"
                onClick={() => setEditMode(false)}
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { label: "Full Name", value: user.name },
              { label: "Email Address", value: user.email },
              { label: "Phone Number", value: user.phone },
              { label: "Member Since", value: user.memberSince },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {label}
                </p>
                <p className="text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
