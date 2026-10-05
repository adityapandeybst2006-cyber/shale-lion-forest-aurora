import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { NewsCard } from "@/components/news-card";
import { RatingCard } from "@/components/rating-card";
import { RangePills, StockChart } from "@/components/stock-chart";
import { TickerMark } from "@/components/ticker-mark";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatCompact,
  formatPercent,
  formatPrice,
  signedClass,
} from "@/lib/format";
import { getAiBrief, getChartFn, getStockBundle } from "@/lib/market/functions";
import { REGION_LABEL } from "@/lib/market/universe";
import { useWatchlist } from "@/lib/watchlist-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stock/$symbol")({ component: StockPage });

function StockPage() {
  const { symbol: raw } = Route.useParams();
  const symbol = decodeURIComponent(raw);
  const [range, setRange] = useState("1Y");
  const has = useWatchlist((s) => s.symbols.includes(symbol));
  const toggle = useWatchlist((s) => s.toggle);
  const remember = useWatchlist((s) => s.remember);

  const bundle = useQuery({
    queryKey: ["stock", symbol],
    queryFn: () => getStockBundle({ data: { symbol } }),
    refetchInterval: 30_000,
  });
  const chart = useQuery({
    queryKey: ["chart", symbol, range],
    queryFn: () => getChartFn({ data: { symbol, range } }),
    enabled: range !== "1Y",
  });
  const brief = useMutation({
    mutationFn: () => getAiBrief({ data: { symbol } }),
  });

  const quote = bundle.data?.quote;
  const rating = bundle.data?.rating;
  const profile = bundle.data?.profile;
  const series = range === "1Y" ? bundle.data?.year : chart.data;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <TickerMark symbol={symbol} className="size-12 text-sm" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-2xl leading-tight tracking-tight">
              {profile?.name ?? quote?.name ?? symbol}
            </h1>
            <p className="truncate text-sm text-muted">
              {symbol}
              {profile?.sector ? ` · ${profile.sector}` : ""}
              {profile?.region ? ` · ${REGION_LABEL[profile.region]}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              toggle(symbol);
              remember(symbol);
            }}
            className="inline-flex size-11 items-center justify-center rounded-md text-fg hover:bg-surface-2"
            aria-label={has ? "Remove from watchlist" : "Add to watchlist"}
          >
            {has ? <BookmarkCheck className="size-5" /> : <Bookmark className="size-5" />}
          </button>
        </div>

        {quote ? (
          <div>
            <div className="tabular font-display text-4xl leading-none tracking-tight">
              {formatPrice(quote.price, quote.currency)}
            </div>
            <div className={cn("mt-1 tabular text-sm font-medium", signedClass(quote.changePercent))}>
              {formatPrice(quote.change, quote.currency)} ({formatPercent(quote.changePercent)})
            </div>
          </div>
        ) : (
          <Skeleton className="h-14 w-48" />
        )}

        <div className="rounded-2xl bg-surface p-3 shadow-[var(--shadow-border)]">
          <div className="mb-2 flex justify-end">
            <RangePills value={range} onChange={setRange} />
          </div>
          {series ? (
            <StockChart series={series} range={range} />
          ) : (
            <Skeleton className="h-56 rounded-xl" />
          )}
        </div>

        {quote && (
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Previous close" value={formatPrice(quote.previousClose, quote.currency)} />
            <Stat
              label="Day range"
              value={
                quote.dayLow != null && quote.dayHigh != null
                  ? `${formatPrice(quote.dayLow)} – ${formatPrice(quote.dayHigh)}`
                  : "—"
              }
            />
            <Stat
              label="52-week"
              value={
                quote.fiftyTwoWeekLow != null && quote.fiftyTwoWeekHigh != null
                  ? `${formatPrice(quote.fiftyTwoWeekLow)} – ${formatPrice(quote.fiftyTwoWeekHigh)}`
                  : "—"
              }
            />
            <Stat label="Volume" value={formatCompact(quote.volume)} />
          </dl>
        )}

        {rating ? (
          <RatingCard rating={rating} />
        ) : bundle.isLoading ? (
          <Skeleton className="h-64 rounded-2xl" />
        ) : (
          <p className="text-sm text-muted">Not enough history to rate this listing yet.</p>
        )}

        <section className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            Intelligence brief
          </h2>
          <p className="mt-1 text-sm text-muted">
            A short reading of price behaviour and the latest headlines. Generated on request.
          </p>
          {brief.data?.ok && (
            <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-fg">
              {brief.data.text}
            </div>
          )}
          {brief.data && !brief.data.ok && (
            <p className="mt-3 text-sm text-down">{brief.data.error}</p>
          )}
          <Button
            className="mt-4"
            variant={brief.data?.ok ? "outline" : "default"}
            disabled={brief.isPending}
            onClick={() => brief.mutate()}
          >
            {brief.isPending ? "Writing…" : brief.data?.ok ? "Refresh brief" : "Write a brief"}
          </Button>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
            News that can move this stock
          </h2>
          <div className="space-y-3">
            {bundle.data?.news.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
            {bundle.isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-2xl" />
              ))}
            {bundle.data && bundle.data.news.length === 0 && (
              <p className="text-sm text-muted">No recent headlines found.</p>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 tabular text-sm font-medium text-fg">{value}</dd>
    </div>
  );
}
