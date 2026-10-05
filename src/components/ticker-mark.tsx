import { cn } from "@/lib/utils";

const TONES = [
  "bg-surface-2 text-fg",
  "bg-accent/10 text-fg",
  "bg-up/10 text-up",
  "bg-down/10 text-down",
];

function tone(symbol: string) {
  let n = 0;
  for (const c of symbol) n = (n + c.charCodeAt(0)) % TONES.length;
  return TONES[n];
}

export function TickerMark({
  symbol,
  className,
}: {
  symbol: string;
  className?: string;
}) {
  const label = symbol.replace(/\.[A-Z]+$/i, "").replace("^", "").slice(0, 3);
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-[11px] font-medium tracking-wide",
        tone(symbol),
        className,
      )}
    >
      {label}
    </span>
  );
}
