import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag, Heart, Shield,
  Edit2, Star, 
  X,
} from "lucide-react";
import { StatCard } from "@/components/modules/User/StatCard";

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

const stats = [
  { label: "Orders",   value: "48",    icon: ShoppingBag },
  { label: "Wishlist", value: "12",    icon: Heart        },
  { label: "Reviews",  value: "9",     icon: Star         },
  { label: "Points",   value: "3,240", icon: Shield       },
];


export default function UserProfilePage() {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── Profile Hero ── */}
        <Card className="rounded-xl overflow-hidden border-border shadow-sm">
          <div className="h-28 bg-linear-to-r from-primary/80 via-primary to-chart-2" />
          <CardContent className="px-6 pb-6 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10 mb-6">
              <div className="flex items-end gap-4">
                <Avatar className="w-20 h-20 border-4 border-background shadow-md ring-2 ring-primary/20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{user.initials}</AvatarFallback>
                </Avatar>
                <div className="mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-lg font-bold text-foreground">{user.name}</h1>
                    <Badge className="text-[11px] rounded-full px-2.5 font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-0">
                      ✦ {user.tier} Member
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Member since {user.memberSince}</p>
                </div>
              </div>
              <Button
                variant={editMode ? "outline" : "default"}
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="gap-2 rounded-lg self-start sm:self-auto"
              >
                {editMode ? <><X className="w-3.5 h-3.5" /> Cancel</> : <><Edit2 className="w-3.5 h-3.5" /> Edit Profile</>}
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
            </div>
          </CardContent>
        </Card>

       



      </div>
    </div>
  );
}