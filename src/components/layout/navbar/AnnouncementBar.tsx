import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  message: string;
  link?: { label: string; href: string };
  badge?: string;
}

const announcements: Announcement[] = [
  {
    id: "1",
    badge: "New",
    message: "Introducing our Spring 2026 Collection — crafted for the bold.",
    link: { label: "Explore now", href: "#" },
  },
  {
    id: "2",
    badge: "Offer",
    message: "Free shipping on all orders over $75. Limited time only.",
    link: { label: "Shop now", href: "#" },
  },
  {
    id: "3",
    badge: "Event",
    message: "Join us live on May 3rd for an exclusive product launch.",
    link: { label: "Register free", href: "#" },
  },
];

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      goTo("right");
    }, 4500);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current!);
  }, [current]);

  const goTo = (dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "right"
          ? (prev + 1) % announcements.length
          : (prev - 1 + announcements.length) % announcements.length
      );
      setAnimating(false);
    }, 280);
  };

  const handleNav = (dir: "left" | "right") => {
    clearInterval(intervalRef.current!);
    goTo(dir);
  };

  if (dismissed) return null;

  const ann = announcements[current];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "bg-[--primary] text-[--primary-foreground]",
        "py-2.5 px-4 select-none"
      )}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3">
        {/* Left nav */}
        {announcements.length > 1 && (
          <button
            onClick={() => handleNav("left")}
            className="hidden shrink-0 cursor-pointer rounded-full p-0.5 opacity-70 transition-opacity hover:opacity-100 sm:flex"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Content */}
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2.5 overflow-hidden">
          <div
            key={ann.id}
            className={cn(
              "flex items-center gap-2.5 text-sm font-medium transition-all duration-[280ms]",
              animating
                ? direction === "left"
                  ? "-translate-x-6 opacity-0"
                  : "translate-x-6 opacity-0"
                : "translate-x-0 opacity-100"
            )}
          >
            {ann.badge && (
              <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
                {ann.badge}
              </span>
            )}

            <span className="truncate opacity-95">{ann.message}</span>

            {ann.link && (
              <a
                href={ann.link.href}
                className="group hidden shrink-0 items-center gap-1 rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-xs font-semibold transition-all hover:bg-white/25 sm:flex"
              >
                {ann.link.label}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {/* Dot indicators */}
          {announcements.length > 1 && (
            <div className="hidden items-center gap-1 sm:flex">
              {announcements.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    clearInterval(intervalRef.current!);
                    setDirection(i > current ? "right" : "left");
                    setAnimating(true);
                    setTimeout(() => {
                      setCurrent(i);
                      setAnimating(false);
                    }, 280);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === current ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Go to announcement ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Right nav */}
          {announcements.length > 1 && (
            <button
              onClick={() => handleNav("right")}
              className="hidden shrink-0 cursor-pointer rounded-full p-0.5 opacity-70 transition-opacity hover:opacity-100 sm:flex"
              aria-label="Next announcement"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 cursor-pointer rounded-full p-0.5 opacity-60 transition-opacity hover:opacity-100"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}