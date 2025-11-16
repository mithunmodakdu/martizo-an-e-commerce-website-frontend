import { useId } from "react";
import { SearchIcon } from "lucide-react";
import Logo from "@/components/logo";
import UserMenu from "@/components/user-menu";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router";
import CartSheet from "../ui/cart-sheet";

export default function Navbar() {
  const id = useId();

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
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
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
        }
        
      ],
    },
    {
      label: "Categories",
      type: "menu", 
      links: [
        {
          title: "Electronics",
          href: "/products/electronics",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
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
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
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
        }
        
      ],
    },
    {
      label: "Brands",
      type: "menu", 
      links: [
        {
          title: "All Brands",
          href: "/products/all-brands",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
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
        }
        
      ],
    },
    {
      label: "Deals / Offers",
      type: "menu", 
      links: [
        {
          title: "Today’s Deals",
          href: "#",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, distinctio",
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
        }
        
      ],
    },
   {
      label: "Track Order",
      href: "/track-order",
      type: "link",
    },
    {
      label: "About Martizo",
      href: "/about",
      type: "link",
    },
    {
      label: "Contact Us",
      href: "/contact",
      type: "link",
    },
  ];

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
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
                <NavigationMenuList className="flex-wrap">
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
                            <ul className="grid gap-2 md:w-[400px] lg:w-[500px]">
                              {item?.links?.map((link) => (
                                <li key={link.title} className="row-span-3">
                                  <NavigationMenuLink asChild>
                                    <a
                                      href={link.href}
                                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                                    >
                                      <div className="mb-2 text-lg font-medium sm:mt-4">
                                        {link.title}
                                      </div>
                                      <p className="text-muted-foreground text-sm leading-tight">
                                        {link.description}
                                      </p>
                                    </a>
                                  </NavigationMenuLink>
                                </li>
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

          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
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
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* cart */}
          <CartSheet />

          {/* User menu */}
          <UserMenu />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="border-t py-2 max-md:hidden">
        {/* Navigation menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap">
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
                      <ul className="grid gap-2 md:w-[400px] lg:w-[500px]">
                        {item?.links?.map((link) => (
                          <li key={link.title} className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                href={link.href}
                                className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                              >
                                <div className="mb-2 text-lg font-medium sm:mt-4">
                                  {link.title}
                                </div>
                                <p className="text-muted-foreground text-sm leading-tight">
                                  {link.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
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
