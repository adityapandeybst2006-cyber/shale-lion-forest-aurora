import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { DealCard } from "@/components/news-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getDealsFn } from "@/lib/market/functions";
import { DEAL_LABEL } from "@/lib/market/news";
import type { Deal } from "@/lib/market/types";

export const Route = createFileRoute("/deals")({ component: DealsPage });

const FILTERS: Array<"all" | Deal["kind"]> = [
  "all",
  "block",
  "bulk",
  "merger",
  "buyback",
  "ipo",
  "insider",
];

function DealsPage() {
  const [kind, setKind] = useState<(typeof FILTERS)[number]>("all");
  const deals = useQuery({
    queryKey: ["deals"],
    queryFn: () => getDealsFn(),
  });

  const filtered = useMemo(() => {
    const rows = deals.data ?? [];
    if (kind === "all") return rows;
    return rows.filter((d) => d.kind === kind);
  }, [deals.data, kind]);

  return (
    <AppShell>
      <h1 className="font-display text-3xl tracking-tight italic">Deals</h1>
      <p className="mt-1 text-sm text-muted">
        Block and bulk trades, mergers, buybacks and other activity that can reprice a stock.
      </p>
      <div className="hide-scrollbar mt-5 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setKind(f)}
            className={
              kind === f
                ? "h-9 shrink-0 rounded-full bg-accent px-3 text-xs font-medium text-accent-fg"
                : "h-9 shrink-0 rounded-full bg-surface-2 px-3 text-xs font-medium text-muted"
            }
          >
            {f === "all" ? "All" : DEAL_LABEL[f]}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {filtered.map((d) => (
          <DealCard key={d.id} item={d} />
        ))}
        {!deals.data &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        {deals.data && filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted">No deals in this filter.</p>
        )}
      </div>
    </AppShell>
  );
}
