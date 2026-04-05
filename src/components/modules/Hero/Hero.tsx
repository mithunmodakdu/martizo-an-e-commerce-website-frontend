import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "12k+", label: "Happy customers" },
  { value: "340", label: "Products" },
  { value: "4.9", label: "Avg rating" },
];

const avatars = [
  { initials: "A", className: "bg-chart-2 text-background" },
  { initials: "B", className: "bg-chart-3 text-background" },
  { initials: "C", className: "bg-chart-4 text-background" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-border bg-card grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          
        }}
      />

      {/* Left — copy */}
      <div className="relative z-10 flex flex-col justify-center px-10 py-14">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-[11px] font-medium tracking-widest text-primary uppercase">
            New season 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-5xl font-medium leading-[1.08] text-foreground tracking-tight">
          Wear what
          <br />
          feels{" "}
          <em className="not-italic text-primary">right.</em>
        </h1>

        {/* Sub */}
        <p className="mb-8 max-w-[300px] text-[15px] leading-relaxed text-muted-foreground">
          Premium essentials designed for everyday movement. Crafted from
          sustainable materials.
        </p>

        {/* CTA */}
        <div className="mb-10 flex items-center gap-3">
          <Button className="rounded-full px-6">
            Shop now
          </Button>
          <Button variant="outline" className="rounded-full px-6">
            View lookbook
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-xl font-medium text-foreground">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — product card */}
      <div className="relative flex items-center justify-center p-8">
        {/* Product card */}
        <div className="relative w-[200px] rounded-xl border border-border bg-background p-5 shadow-sm">
          {/* Image area */}
          <div className="relative mb-4 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-muted">
            <Badge className="absolute right-2 top-2 rounded-full bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
              New
            </Badge>
            <svg
              viewBox="0 0 120 120"
              width="96"
              height="96"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
            >
              <rect x="30" y="20" width="60" height="75" rx="8" className="fill-secondary" />
              <rect x="38" y="28" width="44" height="30" rx="4" className="fill-accent" />
              <rect
                x="38" y="28" width="44" height="30" rx="4"
                fill="none"
                strokeWidth="1.5"
                className="stroke-primary"
                opacity="0.5"
              />
              <line x1="42" y1="38" x2="76" y2="38" strokeWidth="1" opacity="0.4" className="stroke-primary" />
              <line x1="42" y1="44" x2="68" y2="44" strokeWidth="1" opacity="0.25" className="stroke-foreground" />
              <rect x="38" y="66" width="20" height="20" rx="3" className="fill-accent" />
              <rect x="62" y="66" width="20" height="20" rx="3" className="fill-accent" />
              <circle cx="60" cy="105" r="4" className="fill-muted-foreground" opacity="0.3" />
            </svg>
          </div>

          <p className="text-sm font-medium text-foreground">Arc Hoodie</p>
          <p className="mb-3 text-xs text-muted-foreground">Organic cotton blend</p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-foreground">$129</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95">
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Rating chip */}
        <div className="absolute right-7 top-10 rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="10" height="10" viewBox="0 0 24 24" className="fill-chart-1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-[13px] font-medium text-foreground">4.9</span>
            <span className="text-xs text-muted-foreground">/ 2.4k reviews</span>
          </div>
        </div>

        {/* Social proof chip */}
        <div className="absolute bottom-12 left-5 flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
          <div className="flex">
            {avatars.map((a, i) => (
              <div
                key={i}
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-card text-[9px] font-medium ${a.className}`}
                style={{ marginLeft: i === 0 ? 0 : -6 }}
              >
                {a.initials}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">38 people</span> bought today
          </p>
        </div>
      </div>
    </section>
  );
}