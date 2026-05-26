import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShoppingBag,
  ChevronDown,
  Users,
  Truck,
  Star,
  PackageCheck,
  Globe2,
  Recycle,
  ShieldCheck,
} from "lucide-react";
import type { IStatCard } from "@/components/modules/Shared/StatCard";
import StatCard from "@/components/modules/Shared/StatCard";
import FadeIn from "@/components/modules/Shared/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const stats: IStatCard[] = [
  { value: "2.4M+", title: "Happy Customers", icon: <Users size={18} /> },
  { value: "180K+", title: "Products Listed", icon: <ShoppingBag size={18} /> },
  { value: "99.1%", title: "On-Time Delivery", icon: <Truck size={18} /> },
  { value: "4.9★", title: "Average Rating", icon: <Star size={18} /> },
];

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main className="bg-background text-foreground overflow-x-hidden space-y-18">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute -top-[15%] -left-[8%] w-[60vw] h-[60vw] rounded-full bg-primary/10  animate-pulse" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-chart-2/12  animate-pulse [animation-delay:2s]" />
          <div className="absolute top-[45%] left-[55%] w-[25vw] h-[25vw] -translate-x-1/2 rounded-full bg-chart-1/8 animate-pulse [animation-delay:4s]" />
        </div>

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute right-[5%] top-[10%] text-primary/5 pointer-events-none select-none hidden md:block">
          <ShoppingBag size={340} strokeWidth={0.4} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-xs tracking-[0.18em] uppercase font-bold border border-primary/30 bg-primary/5 text-primary"
          >
            Our Story
          </Badge>

          <h1 className="text-[clamp(2rem,7.5vw,4rem)] font-bold leading-[0.92] tracking-tight mb-8">
            Shopping reimagined
            <br />
            <span className="text-primary">for every home.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed mb-10">
            Martizo started with one simple belief — great products should be
            easy to find, fairly priced, and delivered with joy. We've been
            proving it every day since 2017.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2 px-8 font-bold text-base rounded-xl"
            >
              Shop Now <ArrowRight size={16} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 font-bold text-base rounded-xl"
            >
              Our Promise
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground animate-bounce">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown size={15} />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <FadeIn
              key={item.title}
              delay={index * 500}
              className="text-center"
            >
              <StatCard key={item.title} item={item} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/*  Mission */}
      <section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <Badge
              variant="outline"
              className="mb-5 text-primary border-primary/40 text-xs tracking-widest uppercase"
            >
              Who We Are
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              More than a store —<br />
              <span className="text-primary">a trusted partner.</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              Martizo is Bangladesh's fastest-growing e-commerce platform, built
              on the idea that online shopping should feel personal, not
              transactional. From fashion and electronics to home essentials and
              fresh groceries — we curate every category with care.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              We work directly with local artisans, national brands, and
              international suppliers to bring you the widest selection at the
              fairest prices — no hidden fees, no empty promises.
            </p>
          </FadeIn>

          <FadeIn
            direction="right"
            delay={1000}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                icon: <PackageCheck size={22} />,
                label: "180K+ Products",
                sub: "Across 40+ categories",
              },
              {
                icon: <Globe2 size={22} />,
                label: "Nationwide",
                sub: "Delivery to 64 districts",
              },
              {
                icon: <Recycle size={22} />,
                label: "Eco Packaging",
                sub: "100% recyclable boxes",
              },
              {
                icon: <ShieldCheck size={22} />,
                label: "Secure Checkout",
                sub: "SSL & fraud protection",
              },
            ].map((item) => (
              <Card
                key={item.label}
                className="border border-border hover:border-primary/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </FadeIn>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto opacity-50" />
    </main>
  );
}
