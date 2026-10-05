import { Link } from "@tanstack/react-router";
import { TickerMark } from "@/components/ticker-mark";
import { Sparkline } from "@/components/sparkline";
import { formatPercent, formatPrice, signedClass } from "@/lib/format";
import type { Quote } from "@/lib/market/types";
import { cn } from "@/lib/utils";

export function QuoteRow({
  quote,
  compact,
}: {
  quote: Quote;
  compact?: boolean;
}) {
  return (
    <Link
      to="/stock/$symbol"
      params={{ symbol: quote.symbol }}
      className="flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 transition-[background-color] duration-150 hover:bg-surface-2"
    >
      <TickerMark symbol={quote.symbol} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-fg">{quote.name}</div>
        <div className="truncate text-xs text-muted">
          {quote.symbol}
          {quote.sector ? ` · ${quote.sector}` : ""}
        </div>
      </div>
      {!compact && (
        <Sparkline values={quote.spark} positive={quote.changePercent >= 0} />
      )}
      <div className="w-24 text-right">
        <div className="tabular text-sm font-medium text-fg">
          {formatPrice(quote.price, quote.currency)}
        </div>
        <div className={cn("tabular text-xs", signedClass(quote.changePercent))}>
          {formatPercent(quote.changePercent)}
        </div>
      </div>
    </Link>
  );
}
