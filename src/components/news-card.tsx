import { relativeTime } from "@/lib/format";
import type { NewsItem } from "@/lib/market/types";
import { DEAL_LABEL } from "@/lib/market/news";
import type { Deal } from "@/lib/market/types";
import { Badge } from "@/components/ui/badge";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="mb-2 flex items-center gap-2 text-xs text-muted">
        <span className="truncate font-medium text-fg/80">{item.source}</span>
        <span aria-hidden>·</span>
        <span className="shrink-0">{relativeTime(item.publishedAt)}</span>
      </div>
      <p className="text-sm leading-snug text-fg">{item.title}</p>
    </a>
  );
}

export function DealCard({ item }: { item: Deal }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="flex gap-3 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant={item.kind === "merger" ? "accent" : "default"}>
            {DEAL_LABEL[item.kind]}
          </Badge>
          <span className="text-xs text-muted">{relativeTime(item.publishedAt)}</span>
        </div>
        <p className="text-sm leading-snug text-fg">{item.title}</p>
        <p className="mt-1 text-xs text-muted">{item.source}</p>
      </div>
    </a>
  );
}
