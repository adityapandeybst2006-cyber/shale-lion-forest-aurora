import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { IndexCard } from "@/components/index-card";
import { DealCard, NewsCard } from "@/components/news-card";
import { QuoteRow } from "@/components/quote-row";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marketDateLabel } from "@/lib/format";
import {
  getDealsFn,
  getHomeIndices,
  getMarketClocks,
  getMovers,
  getNewsFn,
  getQuotesFn,
} from "@/lib/market/functions";
import { useWatchlist } from "@/lib/watchlist-store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const symbols = useWatchlist((s) => s.symbols);
  const hydrated = useWatchlist((s) => s.hydrated);
  const markHydrated = useWatchlist((s) => s.markHydrated);

  useEffect(() => {
    if (!hydrated) markHydrated();
  }, [hydrated, markHydrated]);

  const clocks = useQuery({
    queryKey: ["clocks"],
    queryFn: () => getMarketClocks(),
    refetchInterval: 60_000,
  });
  const indices = useQuery({
    queryKey: ["home-indices"],
    queryFn: () => getHomeIndices(),
    refetchInterval: 20_000,
  });
  const movers = useQuery({
    queryKey: ["movers", "ALL"],
    queryFn: () => getMovers({ data: { region: "ALL" } }),
    refetchInterval: 45_000,
  });
  const watch = useQuery({
    queryKey: ["quotes", symbols],
    queryFn: () => getQuotesFn({ data: { symbols } }),
    enabled: symbols.length > 0,
    refetchInterval: 20_000,
  });
  const news = useQuery({
    queryKey: ["news", "india"],
    queryFn: () => getNewsFn({ data: { tab: "india" } }),
  });
  const deals = useQuery({
    queryKey: ["deals"],
    queryFn: () => getDealsFn(),
  });

  const anyOpen = clocks.data?.some((c) => c.open);

  return (
    <AppShell>
      <div className="stagger-in space-y-8">
        <section>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {marketDateLabel()}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-snug tracking-tight text-fg italic sm:text-4xl">
            Markets at a glance
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {clocks.data?.map((c) => (
              <Badge key={c.id} variant={c.open ? "live" : "default"}>
                {c.open && <span className="live-dot mr-1.5 inline-block size-1.5 rounded-full bg-up" />}
                {c.name} · {c.open ? "Open" : "Closed"}
              </Badge>
            ))}
            {!clocks.data && <Skeleton className="h-6 w-40 rounded-full" />}
          </div>
          {anyOpen && (
            <p className="mt-2 text-xs text-muted">
              Live session in progress. Quotes refresh every few seconds.
            </p>
          )}
        </section>

        <section>
          <SectionHead title="Benchmarks" to="/markets" />
          <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
            {indices.data?.map((q) => (
              <IndexCard key={q.symbol} quote={q} />
            ))}
            {!indices.data &&
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-[168px] shrink-0 rounded-2xl" />
              ))}
          </div>
        </section>

        <section>
          <SectionHead title="Watchlist" to="/watchlist" />
          <div className="rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]">
            {watch.data?.slice(0, 6).map((q) => (
              <QuoteRow key={q.symbol} quote={q} />
            ))}
            {!watch.data &&
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="mb-2 h-14 rounded-xl" />
              ))}
          </div>
        </section>

        <section>
          <SectionHead title="Movers" to="/markets" />
          <Tabs defaultValue="gainers">
            <TabsList>
              <TabsTrigger value="gainers">Gainers</TabsTrigger>
              <TabsTrigger value="losers">Losers</TabsTrigger>
            </TabsList>
            <TabsContent value="gainers" className="mt-3">
              <div className="rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]">
                {movers.data?.gainers.map((q) => (
                  <QuoteRow key={q.symbol} quote={q} />
                ))}
                {!movers.data &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="mb-2 h-14 rounded-xl" />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="losers" className="mt-3">
              <div className="rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]">
                {movers.data?.losers.map((q) => (
                  <QuoteRow key={q.symbol} quote={q} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHead title="Market-moving news" to="/news" />
            <div className="space-y-3">
              {news.data?.slice(0, 5).map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
              {!news.data &&
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-2xl" />
                ))}
            </div>
          </div>
          <div>
            <SectionHead title="Deals" to="/deals" />
            <div className="space-y-3">
              {deals.data?.slice(0, 5).map((n) => (
                <DealCard key={n.id} item={n} />
              ))}
              {!deals.data &&
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-2xl" />
                ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function SectionHead({ title, to }: { title: string; to: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-sm font-medium tracking-wide text-muted uppercase">{title}</h2>
      <Link
        to={to}
        className="inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-fg"
      >
        See all
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
