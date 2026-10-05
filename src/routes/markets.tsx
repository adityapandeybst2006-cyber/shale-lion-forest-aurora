import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { IndexCard } from "@/components/index-card";
import { QuoteRow } from "@/components/quote-row";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllIndices, getUniverseQuotes } from "@/lib/market/functions";
import type { Region } from "@/lib/market/types";

export const Route = createFileRoute("/markets")({ component: MarketsPage });

const REGIONS: { id: Region; label: string }[] = [
  { id: "IN", label: "India" },
  { id: "US", label: "United States" },
  { id: "EU", label: "Europe" },
  { id: "AS", label: "Asia" },
];

function MarketsPage() {
  const [region, setRegion] = useState<Region>("IN");
  const [sector, setSector] = useState("All");

  const indices = useQuery({
    queryKey: ["all-indices"],
    queryFn: () => getAllIndices(),
    refetchInterval: 30_000,
  });
  const quotes = useQuery({
    queryKey: ["universe", region],
    queryFn: () => getUniverseQuotes({ data: { region: region as "IN" | "US" | "EU" | "AS" } }),
    refetchInterval: 30_000,
  });

  const sectors = useMemo(() => {
    const set = new Set(quotes.data?.map((q) => q.sector).filter(Boolean) as string[]);
    return ["All", ...[...set].sort()];
  }, [quotes.data]);

  const filtered = (quotes.data ?? []).filter(
    (q) => sector === "All" || q.sector === sector,
  );

  return (
    <AppShell>
      <h1 className="font-display text-3xl tracking-tight italic">Markets</h1>
      <p className="mt-1 text-sm text-muted">
        Indian exchanges plus the United States, Europe and Asia. Search for any other listing.
      </p>

      <div className="hide-scrollbar mt-6 -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {indices.data?.map((q) => (
          <IndexCard key={q.symbol} quote={q} />
        ))}
        {!indices.data &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-[168px] shrink-0 rounded-2xl" />
          ))}
      </div>

      <Tabs
        value={region}
        onValueChange={(v) => {
          setRegion(v as Region);
          setSector("All");
        }}
        className="mt-8"
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          {REGIONS.map((r) => (
            <TabsTrigger key={r.id} value={r.id} className="flex-1">
              {r.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {REGIONS.map((r) => (
          <TabsContent key={r.id} value={r.id} className="mt-4">
            <div className="hide-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
              {sectors.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSector(s)}
                  className={
                    sector === s
                      ? "h-9 shrink-0 rounded-full bg-accent px-3 text-xs font-medium text-accent-fg"
                      : "h-9 shrink-0 rounded-full bg-surface-2 px-3 text-xs font-medium text-muted"
                  }
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]">
              {filtered.map((q) => (
                <QuoteRow key={q.symbol} quote={q} />
              ))}
              {!quotes.data &&
                Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="mb-2 h-14 rounded-xl" />
                ))}
              {quotes.data && filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted">No companies in this sector.</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </AppShell>
  );
}
