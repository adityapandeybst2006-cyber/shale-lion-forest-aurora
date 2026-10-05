import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { QuoteRow } from "@/components/quote-row";
import { Skeleton } from "@/components/ui/skeleton";
import { getQuotesFn } from "@/lib/market/functions";
import { useWatchlist } from "@/lib/watchlist-store";

export const Route = createFileRoute("/watchlist")({ component: WatchlistPage });

function WatchlistPage() {
  const symbols = useWatchlist((s) => s.symbols);
  const hydrated = useWatchlist((s) => s.hydrated);
  const markHydrated = useWatchlist((s) => s.markHydrated);

  useEffect(() => {
    if (!hydrated) markHydrated();
  }, [hydrated, markHydrated]);

  const quotes = useQuery({
    queryKey: ["quotes", symbols],
    queryFn: () => getQuotesFn({ data: { symbols } }),
    enabled: symbols.length > 0,
    refetchInterval: 20_000,
  });

  const sorted = [...(quotes.data ?? [])].sort(
    (a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent),
  );

  return (
    <AppShell>
      <h1 className="font-display text-3xl tracking-tight italic">Watchlist</h1>
      <p className="mt-1 text-sm text-muted">
        Saved on this device. Open any company and tap the bookmark to add or remove it.
      </p>
      <div className="mt-6 rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]">
        {sorted.map((q) => (
          <QuoteRow key={q.symbol} quote={q} />
        ))}
        {symbols.length > 0 && !quotes.data &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="mb-2 h-14 rounded-xl" />
          ))}
        {symbols.length === 0 && (
          <p className="px-3 py-10 text-center text-sm text-muted">
            Your watchlist is empty. Search a company to start following it.
          </p>
        )}
      </div>
    </AppShell>
  );
}
