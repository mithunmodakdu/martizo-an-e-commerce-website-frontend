import {
  Heart,
  Layers2Icon,
  LayoutDashboard,
  LogOutIcon,
  MapPin,
  Receipt,
  User,
  UserPen,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import myImage from "@/assets/images/me.JPG";

export default function UserMenu() {
  const user = { name: "Mithun", email: "mithun@gamil.com" };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user.name ? (
          <Button variant="ghost" className=" h-auto p-2 hover:bg-transparent cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src={myImage} alt="Profile image" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button variant="outline" className="cursor-pointer">Login</Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {user.name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LayoutDashboard
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <UserPen size={16} className="opacity-60" aria-hidden="true" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>My Orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Heart size={16} className="opacity-60" aria-hidden="true" />
            <span>My Wishlist</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <MapPin size={16} className="opacity-60" aria-hidden="true" />
            <span>My Addresses</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Receipt size={16} className="opacity-60" aria-hidden="true" />
            <span>Payment Methods</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
