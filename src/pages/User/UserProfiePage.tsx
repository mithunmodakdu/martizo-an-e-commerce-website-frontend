import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User, ShoppingBag, Heart, MapPin, Bell, Shield, LogOut,
  Edit2, Package, ChevronRight, Star, Truck, CheckCircle2,
  Clock, CreditCard, Plus, Save, X,
} from "lucide-react";
import { StatCard } from "@/components/modules/User/StatCard";
import PersonalInfoCard from "@/components/modules/User/PersonalInfoCard";
import LoyaltyCard from "@/components/modules/User/LoyaltyCard";
 

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

const notificationPrefs = [
  { key: "orders",    label: "Order Updates",      desc: "Shipping, delivery & status changes", enabled: true  },
  { key: "promos",    label: "Promotions & Deals", desc: "Exclusive offers and sale alerts",    enabled: true  },
  { key: "wishlist",  label: "Wishlist Alerts",    desc: "Price drops on saved items",          enabled: false },
  { key: "arrivals",  label: "New Arrivals",       desc: "First look at new products",          enabled: false },
  { key: "security",  label: "Account Security",   desc: "Login and security alerts",           enabled: true  },
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


        
        {/* ── Tabs ── */}
        <Tabs defaultValue="overview" className="space-y-5">
          <TabsList className="bg-muted border border-border rounded-lg p-1 h-auto gap-0.5 flex-wrap w-full justify-start">
            {[
              { value: "overview",       label: "Overview",       icon: User        },
              { value: "orders",         label: "Orders",         icon: Package     },
              { value: "addresses",      label: "Addresses",      icon: MapPin      },
              { value: "payment",        label: "Payment",        icon: CreditCard  },
              { value: "notifications",  label: "Notifications",  icon: Bell        },
            ].map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="rounded-md gap-1.5 px-3 py-2 text-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-semibold"
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
 
          {/* ── Overview ── */}
          <TabsContent value="overview" className="space-y-5 mt-0">
            <PersonalInfoCard/>
 
            {/* Loyalty */}
            <LoyaltyCard/>
          </TabsContent>
 
          
        </Tabs>

       



      </div>
    </div>
  );
}