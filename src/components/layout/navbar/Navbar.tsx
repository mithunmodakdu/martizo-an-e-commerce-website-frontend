import React, { useEffect, useId, useState } from "react";
import { CircleIcon, Heart, SearchIcon, ShoppingCart } from "lucide-react";
import logoImage from "@/assets/images/martizo-logo.png";
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
import { Link, useLocation, useNavigate } from "react-router";
import { ListItem } from "./ListItem";
import { ModeToggler } from "../MoodToggler";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetCartQuery } from "@/redux/features/cart/cart.api";
import { useGetProductCategoriesQuery } from "@/redux/features/productCategories/productCategories.api";
import { useGetAllBrandsQuery } from "@/redux/features/brands/brands.api";
import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlist.api";


export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: categoriesData } = useGetProductCategoriesQuery(undefined);
  const { data: brandsData } = useGetAllBrandsQuery(undefined);
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery(undefined);
  const { data: wishlistData, isLoading: wishlistLoading } =
    useGetWishlistQuery(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    handleSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const handleSearch = (value: string) => {
    if (value) {
      navigate(`/products?searchTerm=${value}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setDebouncedSearchQuery(searchQuery);
    }
  };

  const id = useId();
  const wishlistLength = wishlistData?.items?.length;

  const navItems = [
    {
      label: "Home",
      href: "/",
      type: "link",
      active: pathname === "/",
    },
    {
      label: "Products",
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
          href: "/products?isNewArrival=true",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Best Sellers",
          href: "/products?isBestSeller=true",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Trending Now",
          href: "/products?isTrending=true",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Flash Sale",
          href: "/products?isFlashSale=true",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
        {
          title: "Martizo Exclusive",
          href: "/products?isMartizoExclusive=true",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
        },
      ],
    },
    {
      label: "Categories",
      type: "menu",
      links: categoriesData?.map(
        (item: { _id: string; name: string; icon: string; href: string }) => ({
          title: item.name,
          icon: item.icon,
          href: `/products?category=${item._id}`,
        }),
      ),
    },
    {
      label: "Brands",
      type: "menu",
      links: brandsData?.data?.map(
        (item: { _id: string; name: string; icon: string; href: string }) => ({
          title: item.name,
          icon: item.icon,
          href: `/products?brand=${item._id}`,
        }),
      ),
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
          <div className="flex items-center pt-3 w-32">
            <a href="/">
              <img src={logoImage} alt="Logo of Martizo" />
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
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
                                {item?.links?.map(
                                  (link: {
                                    title: string;
                                    href: string;
                                    description: string;
                                  }) => (
                                    <ListItem
                                      key={link.title}
                                      title={link.title}
                                      href={link.href}
                                    >
                                      {link.description}
                                    </ListItem>
                                  ),
                                )}
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
          {!wishlistLoading && (
            <Button variant="outline" asChild>
              <Link to="/wishlist">
                <span>
                  <Heart />
                </span>
                <sup>{wishlistLength}</sup>
              </Link>
            </Button>)
          }

          {/* cart */}
          <Link className="asChild" to={"/cart"}>
            <Button className="cursor-pointer" variant="outline">
              <span>
                <ShoppingCart />
              </span>
              {!cartLoading && cartData?.data?.totalItems > 0 && (
                <sup>{cartData?.data?.totalItems}</sup>
              )}
            </Button>
          </Link>

          {/* User menu */}
          <UserMenu />
        </div>
      </div>

      {/* main navigation */}
      <div className="mt-2 py-2 px-4 md:px-6 hidden md:block bg-primary w-full">
        {/* Navigation menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap ">
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
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-2 sm:w-[300px] md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                        {item?.links?.map(
                          (link: {
                            title: string;
                            href: string;
                            icon: string;
                          }) => (
                            <NavigationMenuLink asChild>
                              <Link
                                to={link.href}
                                className="flex-row items-center gap-2"
                              >
                                {link.icon ? (
                                  <img
                                    className="w-5 rounded-full"
                                    src={link.icon}
                                    alt=""
                                  />
                                ) : (
                                  <CircleIcon />
                                )}
                                {link.title}
                              </Link>
                            </NavigationMenuLink>
                          ),
                        )}
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
