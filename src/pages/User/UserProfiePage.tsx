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
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Bell,
  Shield,
  LogOut,
  Edit2,
  Package,
  ChevronRight,
  Star,
  Truck,
  CheckCircle2,
  Clock,
  CreditCard,
  Plus,
  Save,
  X,
} from "lucide-react";
import { StatCard } from "@/components/modules/User/StatCard";
import PersonalInfoCard from "@/components/modules/User/PersonalInfoCard";
import LoyaltyCard from "@/components/modules/User/LoyaltyCard";
import { OrderRow } from "@/components/modules/User/OrderRow";
import { AddressCard } from "@/components/modules/User/AddressCard";

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
  { label: "Orders", value: "48", icon: ShoppingBag },
  { label: "Wishlist", value: "12", icon: Heart },
  { label: "Reviews", value: "9", icon: Star },
  { label: "Points", value: "3,240", icon: Shield },
];

const notificationPrefs = [
  {
    key: "orders",
    label: "Order Updates",
    desc: "Shipping, delivery & status changes",
    enabled: true,
  },
  {
    key: "promos",
    label: "Promotions & Deals",
    desc: "Exclusive offers and sale alerts",
    enabled: true,
  },
  {
    key: "wishlist",
    label: "Wishlist Alerts",
    desc: "Price drops on saved items",
    enabled: false,
  },
  {
    key: "arrivals",
    label: "New Arrivals",
    desc: "First look at new products",
    enabled: false,
  },
  {
    key: "security",
    label: "Account Security",
    desc: "Login and security alerts",
    enabled: true,
  },
];

const orders = [
  {
    id: "#MRZ-00291",
    date: "Apr 20, 2026",
    status: "Delivered",
    total: "৳ 5,400",
    items: 3,
    icon: CheckCircle2,
    variant: "success",
  },
  {
    id: "#MRZ-00289",
    date: "Apr 14, 2026",
    status: "In Transit",
    total: "৳ 2,850",
    items: 1,
    icon: Truck,
    variant: "info",
  },
  {
    id: "#MRZ-00275",
    date: "Mar 31, 2026",
    status: "Processing",
    total: "৳ 8,100",
    items: 5,
    icon: Clock,
    variant: "warning",
  },
  {
    id: "#MRZ-00260",
    date: "Mar 12, 2026",
    status: "Delivered",
    total: "৳ 1,200",
    items: 1,
    icon: CheckCircle2,
    variant: "success",
  },
];

const addresses = [
  {
    id: 1,
    label: "Home",
    name: "Rayan Chowdhury",
    line: "House 14, Road 3, Block C",
    city: "Sylhet 3100",
    phone: "+880 1712 345 678",
    default: true,
  },
  {
    id: 2,
    label: "Office",
    name: "Rayan Chowdhury",
    line: "Level 4, Zaman Tower, Zindabazar",
    city: "Sylhet 3100",
    phone: "+880 1799 001 122",
    default: false,
  },
];

export default function UserProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [notifs, setNotifs] = useState(
    Object.fromEntries(notificationPrefs.map((n) => [n.key, n.enabled])),
  );

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
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-lg font-bold text-foreground">
                      {user.name}
                    </h1>
                    <Badge className="text-[11px] rounded-full px-2.5 font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-0">
                      ✦ {user.tier} Member
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Member since {user.memberSince}
                  </p>
                </div>
              </div>
              <Button
                variant={editMode ? "outline" : "default"}
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="gap-2 rounded-lg self-start sm:self-auto"
              >
                {editMode ? (
                  <>
                    <X className="w-3.5 h-3.5" /> Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                  </>
                )}
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Tabs ── */}
        <Tabs defaultValue="overview" className="space-y-5">
          <TabsList className="bg-muted border border-border rounded-lg p-1 h-auto gap-0.5 flex-wrap w-full justify-start">
            {[
              { value: "overview", label: "Overview", icon: User },
              { value: "orders", label: "Orders", icon: Package },
              { value: "addresses", label: "Addresses", icon: MapPin },
              { value: "payment", label: "Payment", icon: CreditCard },
              { value: "notifications", label: "Notifications", icon: Bell },
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
            {/* Personal Info */}
            <PersonalInfoCard />

            {/* Loyalty */}
            <LoyaltyCard />
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders" className="mt-0">
            <Card className="rounded-xl border-border shadow-sm">
              <CardHeader className="px-6 pt-6 pb-1 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Recent Orders
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10 text-xs gap-1 rounded-lg h-8"
                >
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="divide-y divide-border">
                  {orders.map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Addresses ── */}
          <TabsContent value="addresses" className="mt-0">
            <div className="grid sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <AddressCard key={addr.id} address={addr} />
              ))}
              <button className="rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground hover:text-primary transition-all group">
                <div className="w-9 h-9 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Add New Address</span>
              </button>
            </div>
          </TabsContent>

          {/* ── Payment ── */}
          <TabsContent value="payment" className="mt-0">
            <Card className="rounded-xl border-border shadow-sm">
              <CardHeader className="px-6 pt-6 pb-1">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Saved Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-primary/40 bg-primary/5 dark:bg-primary/10 px-4 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-7 rounded-md bg-primary flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        •••• •••• •••• 4782
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Expires 08/28
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full font-semibold">
                      Default
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs rounded-md text-muted-foreground"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border px-4 py-4 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-7 rounded-md bg-pink-500 flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">
                        bKash
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        +880 1712 345 678
                      </p>
                      <p className="text-xs text-muted-foreground">
                        bKash Wallet
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs rounded-md text-muted-foreground"
                  >
                    Remove
                  </Button>
                </div>
                <button className="w-full rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 flex items-center justify-center gap-2 py-4 text-muted-foreground hover:text-primary transition-all text-sm font-medium">
                  <Plus className="w-4 h-4" /> Add Payment Method
                </button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Notifications ── */}
          <TabsContent value="notifications" className="mt-0">
            <Card className="rounded-xl border-border shadow-sm">
              <CardHeader className="px-6 pt-6 pb-1">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-2">
                <div className="divide-y divide-border">
                  {notificationPrefs.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between py-4"
                    >
                      <div className="pr-4">
                        <p className="text-sm font-medium text-foreground">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                      <Switch
                        checked={notifs[item.key]}
                        onCheckedChange={(val) =>
                          setNotifs((prev) => ({ ...prev, [item.key]: val }))
                        }
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
