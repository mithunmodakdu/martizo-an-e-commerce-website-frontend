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
import { useGetMeQuery, userApi } from "@/redux/features/users/users.api";
import { Link } from "react-router";
import { useLogoutMutation } from "@/redux/features/auths/auths.api";
import { useAppDispatch } from "@/redux/hooks";
import { role } from "@/constants/role";

export default function UserMenu() {
  const { data } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(userApi.util.resetApiState());
  };

  return (
    <DropdownMenu>
      {data?.data?.email ? (
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className=" h-auto p-2 hover:bg-transparent cursor-pointer"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={data?.data?.avatar} alt="Profile image" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
      ) : (
        <Button className="cursor-pointer">
          <Link to={"/login"}>Login</Link>
        </Button>
      )}

      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {data?.data?.name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {data?.data?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        {role.superAdmin === data?.data?.role && (
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <LayoutDashboard
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>
                <Link to={"/admin"}>Super Admin Panel</Link>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <LayoutDashboard
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>
                <Link to={"/dashboard"}>Dashboard</Link>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        {role.admin === data?.data?.role && (
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <LayoutDashboard
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>
                <Link to={"/admin"}>Admin Panel</Link>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <LayoutDashboard
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>
                <Link to={"/dashboard"}>Dashboard</Link>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        {role.user === data?.data?.role && (
          <DropdownMenuItem className="cursor-pointer">
            <LayoutDashboard
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>
              <Link to={"/dashboard"}>Dashboard</Link>
            </span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <UserPen size={16} className="opacity-60" aria-hidden="true" />
            <span>
              <Link to={"/dashboard/profile"}>My Profile</Link>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Heart size={16} className="opacity-60" aria-hidden="true" />
            <span>
              <Link to={"/dashboard/wishlist"}>My Wishlist</Link>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Heart size={16} className="opacity-60" aria-hidden="true" />
            <span>
              <Link to={"/dashboard/cart"}>My Cart</Link>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>
              <Link to={"/dashboard/orders"}>My Orders</Link>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <MapPin size={16} className="opacity-60" aria-hidden="true" />
            <span>
              <Link to={"/dashboard/address"}>My Addresses</Link>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Receipt size={16} className="opacity-60" aria-hidden="true" />
            <span>
              <Link to={"/dashboard/payment-methods"}>Payment Methods</Link>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
