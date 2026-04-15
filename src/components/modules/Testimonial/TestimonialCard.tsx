import StarRating from "../Shared/StarRating";

export function TestimonialCard({ name, meta, initials, avatarClass, rating, quote }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
      <StarRating rating={rating} />
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        "{quote}"
      </p>
      <div className="flex items-center gap-2.5 pt-3 border-t border-border">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${avatarClass}`}
        >
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground">{meta}</span>
        </div>
        <span className="ml-auto flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-primary/10 text-primary">
          <svg className="w-2.5 h-2.5 fill-primary" viewBox="0 0 16 16">
            <path d="M6.5 12L2 7.5l1.4-1.4 3.1 3.1L12.6 4 14 5.4z" />
          </svg>
          Verified
        </span>
      </div>
    </div>
  );
}
