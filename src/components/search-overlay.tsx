import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { TickerMark } from "@/components/ticker-mark";
import { Input } from "@/components/ui/input";
import { searchSecurities } from "@/lib/market/functions";
import { displayName, REGION_LABEL, UNIVERSE } from "@/lib/market/universe";
import type { Region } from "@/lib/market/types";
import { useWatchlist } from "@/lib/watchlist-store";

type Hit = {
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  region?: Region;
};

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const recents = useWatchlist((s) => s.recents);
  const remember = useWatchlist((s) => s.remember);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const trimmed = q.trim();
  const { data, isFetching } = useQuery({
    queryKey: ["search", trimmed],
    queryFn: () => searchSecurities({ data: { q: trimmed } }),
    enabled: open && trimmed.length >= 1,
  });

  const local = useMemo(() => {
    if (trimmed.length < 1) return [];
    const needle = trimmed.toLowerCase();
    return UNIVERSE.filter(
      (s) =>
        s.symbol.toLowerCase().includes(needle) ||
        s.name.toLowerCase().includes(needle),
    ).slice(0, 8);
  }, [trimmed]);

  const hits: Hit[] = data?.length
    ? data
    : local.map((s) => ({
        symbol: s.symbol,
        name: s.name,
        type: "Equity",
        exchange: s.country,
        region: s.region,
        sector: s.sector,
      }));

  if (!open) return null;

  const rows: Hit[] =
    trimmed.length < 1
      ? recents.map((s) => ({
          symbol: s,
          name: displayName(s, s),
          type: "",
          exchange: "",
        }))
      : hits;

  return (
    <div className="fixed inset-0 z-50 bg-bg/95">
      <div className="mx-auto flex h-full max-w-lg flex-col px-4 pt-4 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
            <Input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Indian and global companies"
              className="pl-10"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface-2"
            aria-label="Close search"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pb-8">
          {trimmed.length < 1 && recents.length > 0 && (
            <p className="mb-2 text-xs font-medium tracking-wide text-muted uppercase">
              Recent
            </p>
          )}
          {trimmed.length < 1 && recents.length === 0 && (
            <p className="pt-10 text-center text-sm text-muted">
              Try Reliance, TCS, Apple, NVIDIA, Nestle, or Nifty.
            </p>
          )}
          {trimmed.length >= 1 && !hits.length && !isFetching && (
            <p className="pt-10 text-center text-sm text-muted">No matches.</p>
          )}
          <ul className="space-y-1">
            {rows.map((hit) => (
              <li key={hit.symbol}>
                <Link
                  to="/stock/$symbol"
                  params={{ symbol: hit.symbol }}
                  onClick={() => {
                    remember(hit.symbol);
                    onClose();
                  }}
                  className="flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 hover:bg-surface-2"
                >
                  <TickerMark symbol={hit.symbol} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{hit.name}</div>
                    <div className="truncate text-xs text-muted">
                      {hit.symbol}
                      {hit.exchange ? ` · ${hit.exchange}` : ""}
                      {hit.region ? ` · ${REGION_LABEL[hit.region]}` : ""}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
