import type { TTrustPoint } from "./WhyChooseUs.types";

export const TrustCard = ({ point }: { point: TTrustPoint }) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-4">
      <span
        className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0"
        aria-hidden="true"
      />
      <div>
        <p className="text-sm font-medium text-foreground mb-1">{point.title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{point.description}</p>
      </div>
    </div>
  );
}
