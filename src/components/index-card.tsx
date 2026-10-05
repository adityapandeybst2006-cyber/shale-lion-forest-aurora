import { Link } from "@tanstack/react-router";
import { Sparkline } from "@/components/sparkline";
import { formatPercent, formatPrice, signedClass } from "@/lib/format";
import type { Quote } from "@/lib/market/types";
import { cn } from "@/lib/utils";

export function IndexCard({ quote }: { quote: Quote }) {
  const up = quote.changePercent >= 0;
  return (
    <Link
      to="/stock/$symbol"
      params={{ symbol: quote.symbol }}
      className="flex w-[168px] shrink-0 flex-col gap-3 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="text-xs font-medium tracking-wide text-muted uppercase">
        {quote.shortName || quote.name}
      </div>
      <div className="tabular text-lg font-medium leading-tight text-fg">
        {formatPrice(quote.price, quote.currency)}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className={cn("tabular text-xs font-medium", signedClass(quote.changePercent))}>
          {formatPercent(quote.changePercent)}
        </span>
        <Sparkline values={quote.spark} positive={up} className="h-6 w-12" />
      </div>
    </Link>
  );
}
