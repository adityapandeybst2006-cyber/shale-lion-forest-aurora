import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  Globe2,
  Newspaper,
  Search,
  Sparkles,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { SearchOverlay } from "@/components/search-overlay";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: Sparkles },
  { to: "/markets", label: "Markets", icon: Globe2 },
  { to: "/watchlist", label: "Watchlist", icon: Bookmark },
  { to: "/news", label: "News", icon: Newspaper },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onStock = pathname.startsWith("/stock/");

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          {onStock ? (
            <Link
              to="/"
              className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface-2"
              aria-label="Back"
            >
              <ArrowLeft className="size-5" />
            </Link>
          ) : (
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-xl tracking-tight italic">Meridian</span>
            </Link>
          )}
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-surface-2 px-3 text-sm text-muted shadow-[var(--shadow-border)] hover:text-fg"
            aria-label="Search companies"
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Search companies</span>
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        <nav className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-52 shrink-0 flex-col gap-1 border-r border-border p-4 lg:flex">
          {NAV.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium",
                  active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface hover:text-fg",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/deals"
            className={cn(
              "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium",
              pathname.startsWith("/deals")
                ? "bg-surface-2 text-fg"
                : "text-muted hover:bg-surface hover:text-fg",
            )}
          >
            Deals
          </Link>
        </nav>
        <main className="min-w-0 flex-1 px-4 pt-6 pb-28 lg:pb-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-4">
          {NAV.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium",
                  active ? "text-fg" : "text-muted",
                )}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
