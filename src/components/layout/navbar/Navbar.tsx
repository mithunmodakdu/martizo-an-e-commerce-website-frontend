import { useId } from "react";
import { Heart, SearchIcon } from "lucide-react";
import Logo from "@/components/logo";
import logoImage from "@/assets/images/martizo-logo.png"
import UserMenu from "@/components/layout/navbar/user-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";
import CartSheet from "../../ui/cart-sheet";
import { ListItem } from "./ListItem";
import { ModeToggler } from "../MoodToggler";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar() {
  const id = useId();
  const wishlistLength = 5;

  const navItems = [
    {
      label: "Home",
      href: "/",
      active: true,
      type: "link",
    },
    {
      label: "Shop",
      type: "menu", // means it has dropdown content
      links: [
        {
          title: "All Products",
          href: "/products",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "New Arrivals",
          href: "/products/new-arrivals",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Best Sellers",
          href: "/products/best-sellers",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Hot Deals",
          href: "/products/hot-deals",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Martizo Exclusive",
          href: "/products/exclusive",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Trending Now",
          href: "/products/trending-now",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
      ],
    },
    {
      label: "Categories",
      type: "menu",
      links: [
        {
          title: "Electronics",
          href: "/products/electronics",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Fashion (Men / Women / Kids)",
          href: "/products/fashion",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Home & Living",
          href: "/products/home-living",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: " Grocery / Superstore",
          href: "/products/grocery",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Beauty & Personal Care",
          href: "/products/beauty",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Sports & Outdoors",
          href: "/products/sports-outdoors",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Baby & Toys",
          href: "/products/baby-toys",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Automobiles & Motorbike",
          href: "/products/automobiles-motorbike",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Accessories",
          href: "/products/accessories",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Stationery & Office",
          href: "/products/stationery-office",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Medicine & Health Care",
          href: "/products/medicine-health-care",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
      ],
    },
    {
      label: "Brands",
      type: "menu",
      links: [
        {
          title: "All Brands",
          href: "/products/all-brands",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Top Brands",
          href: "/products/top-brands",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Martizo Choice Brands",
          href: "/products/martizo-choice-brands",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
      ],
    },
    {
      label: "Offers",
      type: "menu",
      links: [
        {
          title: "Today’s Deals",
          href: "#",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Clearance Sale",
          href: "#",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Voucher Zone",
          href: "#",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Bundle Offers",
          href: "#",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
      ],
    },
    {
      label: "Track Order",
      href: "/track-order",
      type: "link",
    },
    {
      label: "About us",
      href: "/about",
      type: "link",
    },
    {
      label: "Contact us",
      href: "/contact",
      type: "link",
    },
  ];

  return (
    <header>
      <div className="flex flex-col px-4 md:px-6 md:flex-row items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Logo */}
          <div className="flex items-center pt-5">
            <a href="/">
              <img src={logoImage} className="w-32" alt="Logo of Martizo" />
            </a>
          </div>
        </div>

        {/* Middle area */}
        <div className="grow">
          {/* Search form */}
          <div className="relative mx-auto w-full max-w-lg">
            <Input
              id={id}
              className="peer h-12 ps-8 pe-10"
              placeholder="Search..."
              type="search"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-5 md:gap-2">
          {/* Mobile menu trigger */}
          <div className="block md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-9 md:hidden"
                  variant="outline"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navItems.map((item) => (
                      <NavigationMenuItem key={item.label}>
                        {item.type === "link" ? (
                          <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                            active={item.active}
                          >
                            <Link to={`${item.href}`}>{item.label}</Link>
                          </NavigationMenuLink>
                        ) : (
                          <>
                            <NavigationMenuTrigger>
                              {item.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="grid gap-2 sm:w-[300px] md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                                {item?.links?.map((link) => (
                                  <ListItem
                                    key={link.title}
                                    title={link.title}
                                    href={link.href}
                                  >
                                    {link.description}
                                  </ListItem>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>

          {/* dark mode toggler */}
          <ModeToggler />

          {/* wishlist */}
          <Button variant="outline" asChild>
            <Link to="/wishlist">
              <span>
                <Heart />
              </span>
              <sup>{wishlistLength}</sup>
            </Link>
          </Button>

          {/* cart */}
          <CartSheet />

          {/* User menu */}
          <UserMenu />
        </div>
      </div>

      {/* main navigation */}
      <div className="py-2 px-4 md:px-6 hidden md:block bg-primary w-full">
        {/* Navigation menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap ">
            {navItems.map((item) => (
              <NavigationMenuItem  key={item.label}>
                {item.type === "link" ? (
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                    active={item.active}
                  >
                    <Link to={`${item.href}`}>{item.label}</Link>
                  </NavigationMenuLink>
                ) : (
                  <>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-2 sm:w-[300px] md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                        {item?.links?.map((link) => (
                          <ListItem
                            key={link.title}
                            title={link.title}
                            href={link.href}
                          >
                            {link.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
