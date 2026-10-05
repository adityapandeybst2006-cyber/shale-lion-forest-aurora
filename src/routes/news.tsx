import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { NewsCard } from "@/components/news-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNewsFn } from "@/lib/market/functions";
import { displayName } from "@/lib/market/universe";
import { useWatchlist } from "@/lib/watchlist-store";

export const Route = createFileRoute("/news")({ component: NewsPage });

function NewsPage() {
  const [tab, setTab] = useState<"india" | "global" | "watchlist">("india");
  const symbols = useWatchlist((s) => s.symbols);
  const names = symbols.slice(0, 6).map((s) => displayName(s));

  const news = useQuery({
    queryKey: ["news", tab, names.join(",")],
    queryFn: () => getNewsFn({ data: { tab, names } }),
  });

  return (
    <AppShell>
      <h1 className="font-display text-3xl tracking-tight italic">News</h1>
      <p className="mt-1 text-sm text-muted">
        Headlines that tend to move Indian and global shares.
      </p>
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="mt-6">
        <TabsList className="w-full">
          <TabsTrigger value="india" className="flex-1">
            India
          </TabsTrigger>
          <TabsTrigger value="global" className="flex-1">
            Global
          </TabsTrigger>
          <TabsTrigger value="watchlist" className="flex-1">
            Watchlist
          </TabsTrigger>
        </TabsList>
        {(["india", "global", "watchlist"] as const).map((t) => (
          <TabsContent key={t} value={t} className="mt-4 space-y-3">
            {news.data?.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
            {!news.data &&
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-2xl" />
              ))}
            {news.data && news.data.length === 0 && (
              <p className="py-10 text-center text-sm text-muted">No headlines right now.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </AppShell>
  );
}
