import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function BrandShowcaseSection() {
  return (
    <section className="py-20 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-5 h-px"
                style={{ background: "var(--primary)" }}
              />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: "var(--primary)" }}
              >
                Curated Partners
              </span>
            </div>
            <h2
              className="text-3xl font-bold tracking-tight leading-tight"
              style={{
                color: "var(--foreground)",
                fontFamily: "'Georgia', serif",
              }}
            >
              Shop by <span style={{ color: "var(--primary)" }}>Brand</span>
            </h2>
            <p
              className="mt-2 text-base max-w-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              Handpicked partners that meet Martizo's standard for quality,
              sustainability, and style.
            </p>
          </div>

          <Button
            variant="outline"
            className="self-start md:self-auto gap-2 font-medium"
          >
            View All Brands <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
}
