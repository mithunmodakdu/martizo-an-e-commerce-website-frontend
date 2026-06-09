import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Settings, User } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import SearchBox from "./SearchBox";
import { useGetMeQuery } from "@/redux/features/users/users.api";

const DashboardHeader = () => {
  const { data: userData } = useGetMeQuery(undefined);

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/60 px-6 py-3">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <SidebarTrigger />

        {/* Search */}
        <SearchBox />

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
            <Avatar className="h-10 w-10">
              <AvatarImage 
              src={userData?.data?.avatar} 
              alt="Profile image" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-semibold leading-none">
                {userData?.data?.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {userData?.data?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
