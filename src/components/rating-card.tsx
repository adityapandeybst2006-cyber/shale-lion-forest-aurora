import { formatPercent } from "@/lib/format";
import type { Rating } from "@/lib/market/types";
import { cn } from "@/lib/utils";

function meter(value: number) {
  return Math.max(0, Math.min(100, value));
}

function labelTone(label: Rating["label"]) {
  if (label === "Strong buy" || label === "Accumulate") return "text-up";
  if (label === "Reduce" || label === "Caution") return "text-down";
  return "text-fg";
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[88px_1fr_36px] items-center gap-3">
      <span className="text-xs text-muted">{label}</span>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${meter(value)}%` }}
        />
      </div>
      <span className="tabular text-right text-xs text-fg">{Math.round(value)}</span>
    </div>
  );
}

export function RatingCard({ rating }: { rating: Rating }) {
  return (
    <section className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Behaviour rating
          </p>
          <p className={cn("mt-1 font-display text-3xl leading-none", labelTone(rating.label))}>
            {rating.label}
          </p>
        </div>
        <div className="text-right">
          <p className="tabular font-display text-4xl leading-none text-fg">{rating.score}</p>
          <p className="text-xs text-muted">of 100</p>
        </div>
      </div>
      <div className="space-y-3">
        <Bar label="Momentum" value={rating.momentum} />
        <Bar label="Trend" value={rating.trend} />
        <Bar label="Stability" value={rating.stability} />
        <Bar label="Resilience" value={rating.resilience} />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <Stat label="1M" value={formatPercent((rating.return1m ?? 0) * 100)} tone={rating.return1m} />
        <Stat label="3M" value={formatPercent((rating.return3m ?? 0) * 100)} tone={rating.return3m} />
        <Stat label="1Y" value={formatPercent((rating.return1y ?? 0) * 100)} tone={rating.return1y} />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-subtle">
        Built from past price behaviour — returns, trend versus moving averages, volatility and
        drawdown. Not a buy or sell recommendation.
      </p>
    </section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: number | null;
}) {
  const cls =
    tone == null || tone === 0 ? "text-fg" : tone > 0 ? "text-up" : "text-down";
  return (
    <div className="rounded-xl bg-surface-2 px-3 py-2">
      <div className="text-[11px] text-muted">{label}</div>
      <div className={cn("tabular text-sm font-medium", cls)}>{value}</div>
    </div>
  );
}
