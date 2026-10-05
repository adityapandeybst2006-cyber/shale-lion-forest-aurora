import { cn } from "@/lib/utils";

export function Sparkline({
  values,
  className,
  positive,
}: {
  values: number[];
  className?: string;
  positive?: boolean;
}) {
  const pts = values.filter((n) => Number.isFinite(n));
  if (pts.length < 2) {
    return <div className={cn("h-8 w-16", className)} />;
  }
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const span = max - min || 1;
  const w = 64;
  const h = 28;
  const d = pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((v - min) / span) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  const up = positive ?? pts[pts.length - 1] >= pts[0];
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-8 w-16 overflow-visible", className)}
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke={up ? "var(--color-up)" : "var(--color-down)"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
