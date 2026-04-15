export default function StarRating({ rating }: {rating: number}) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;

        return (
          <svg
            key={i}
            className="w-3.5 h-3.5"
            viewBox="0 0 16 16"
          >
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" className="text-primary" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon
              points="8,1 10,6 15,6 11,9 12.5,15 8,12 3.5,15 5,9 1,6 6,6"
              fill={
                filled
                  ? "var(--color-primary)"
                  : half
                  ? `url(#half-${i})`
                  : "none"
              }
              stroke="var(--color-primary)"
              strokeWidth="1"
            />
          </svg>
        );
      })}
    </div>
  );
}