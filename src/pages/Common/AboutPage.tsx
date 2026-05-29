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
  Leaf,
  HeartHandshake,
} from "lucide-react";
import type { IStatCard } from "@/components/modules/Shared/StatCard";
import StatCard from "@/components/modules/Shared/StatCard";
import FadeIn from "@/components/modules/Shared/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// interfaces
interface IPillar { icon: React.ReactNode; title: string; description: string; accent: string; }
interface IMilestone { year: string; event: string; }

// data
const stats: IStatCard[] = [
  { value: "2.4M+", title: "Happy Customers", icon: <Users size={18} /> },
  { value: "180K+", title: "Products Listed", icon: <ShoppingBag size={18} /> },
  { value: "99.1%", title: "On-Time Delivery", icon: <Truck size={18} /> },
  { value: "4.9★", title: "Average Rating", icon: <Star size={18} /> },
];

const pillars: IPillar[] = [
  {
    icon: <ShieldCheck size={22} />,
    title: "Trusted Quality",
    description: "Every product is vetted through a rigorous quality assurance process before it reaches your doorstep.",
    accent: "bg-chart-2/15 text-chart-2",
  },
  {
    icon: <Truck size={22} />,
    title: "Lightning Delivery",
    description: "Same-day dispatch, real-time tracking, and hassle-free returns — because your time matters.",
    accent: "bg-chart-3/15 text-chart-3",
  },
  {
    icon: <Leaf size={22} />,
    title: "Eco Conscious",
    description: "Carbon-neutral packaging and partnerships with sustainable suppliers make every order greener.",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: <HeartHandshake size={22} />,
    title: "Human Support",
    description: "Real people, not bots. Our care team is available 24/7 to make every experience seamless.",
    accent: "bg-chart-4/15 text-chart-4",
  },
];

const milestones: IMilestone[] = [
  { year: "2017", event: "Martizo launched in Dhaka with 500 SKUs and a dream." },
  { year: "2019", event: "Expanded to 8 cities and crossed 100K registered users." },
  { year: "2021", event: "Introduced same-day delivery across Greater Dhaka." },
  { year: "2023", event: "Hit 1 million orders and launched the Martizo app." },
  { year: "2025", event: "Serving 2.4M+ customers nationally with 180K+ products." },
];



export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main className="bg-background text-foreground space-y-18">
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

      {/* Pillars*/}
      <section>
        <FadeIn className="text-center mb-14">
          <Badge variant="outline" className="mb-5 text-primary border-primary/40 text-xs tracking-widest uppercase">
            Our Pillars
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">Why Martizo?</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground text-base" >
            Four commitments that shape every decision we make.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 50}>
              <Card className="h-full border border-border hover:border-primary/40 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group cursor-default">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${p.accent} group-hover:scale-110 transition-transform duration-300`}>
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-foreground">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed" >
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/30 border-y border-border">
        <div className="mx-auto px-6 py-24 md:py-32">
          <FadeIn className="text-center mb-14">
            <Badge variant="outline" className="mb-5 text-primary border-primary/40 text-xs tracking-widest uppercase">
              Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black">How we got here</h2>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-[78px] md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <FadeIn key={m.year} delay={i * 100}>
                  <div className={`flex items-start gap-6 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                      <span className="inline-block bg-primary/10 text-primary font-black text-sm px-4 py-1.5 rounded-full border border-primary/20">
                        {m.year}
                      </span>
                    </div>
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background shadow-md mt-1.5" />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block mb-1.5 bg-primary/10 text-primary font-black text-sm px-3 py-1 rounded-full border border-primary/20 md:hidden">
                        {m.year}
                      </span>
                      <p className="text-foreground font-semibold text-base leading-snug">
                        {m.event}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
