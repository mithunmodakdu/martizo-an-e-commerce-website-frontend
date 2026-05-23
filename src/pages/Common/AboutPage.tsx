import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";


export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main
      className="bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}
    >

      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute -top-[15%] -left-[8%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-chart-2/12 blur-[100px] animate-pulse [animation-delay:2s]" />
          <div className="absolute top-[45%] left-[55%] w-[25vw] h-[25vw] -translate-x-1/2 rounded-full bg-chart-1/8 blur-[80px] animate-pulse [animation-delay:4s]" />
        </div>

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
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

          <h1 className="text-[clamp(2.6rem,7.5vw,6rem)] font-black leading-[0.92] tracking-tight mb-8">
            Shopping reimagined
            <br />
            <span className="text-primary">for every home.</span>
          </h1>

          <p
            className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed mb-10"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Martizo started with one simple belief — great products should be easy to find, fairly
            priced, and delivered with joy. We've been proving it every day since 2017.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 px-8 font-bold text-base rounded-xl">
              Shop Now <ArrowRight size={16} />
            </Button>
            <Button size="lg" variant="outline" className="px-8 font-bold text-base rounded-xl">
              Our Promise
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground animate-bounce">
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "system-ui" }}>Scroll</span>
          <ChevronDown size={15} />
        </div>
      </section>

    </main>
  );
}