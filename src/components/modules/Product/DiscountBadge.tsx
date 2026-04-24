export function DiscountBadge({ percent }: { percent: number }) {
  return (
    <span className="relative inline-flex items-center justify-center w-[100px] h-[100px]">
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute">
        <polygon
          points="50,5 61,37 95,37 68,57 78,90 50,71 22,90 32,57 5,37 39,37"
          fill="#D4537E"
        />
        <circle cx="50" cy="50" r="22" fill="white" />
      </svg>
      <span className="relative flex flex-col items-center leading-none z-10">
        <span className="text-[16px] font-extrabold" style={{ color: "#993556" }}>{percent}%</span>
        <span className="text-[9px] font-bold tracking-widest" style={{ color: "#D4537E" }}>OFF</span>
      </span>
    </span>
  );
}