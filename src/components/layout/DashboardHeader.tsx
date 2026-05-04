import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Bell, ChevronDown, Search, Settings } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/60 px-6 py-3">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <SidebarTrigger />

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-muted/60 rounded-xl px-3 py-3 w-1/2 border border-border/40">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <Input
            className="border-0 bg-transparent p-0 text-sm h-auto focus-visible:ring-0 placeholder:text-muted-foreground/70"
            placeholder="Search orders, products…"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4.5 h-4.5" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                MA
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-semibold leading-none">
                Martizo Admin
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Super Admin
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
