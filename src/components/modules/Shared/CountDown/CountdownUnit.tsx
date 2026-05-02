import { pad } from "../pad";

export default function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-md px-2.5 py-1 min-w-[40px] text-center">
        <span className="text-primary-foreground font-bold text-lg tabular-nums leading-none">
          {pad(value)}
        </span>
      </div>
      <span className="text-primary-foreground/70 text-[10px] mt-0.5 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}