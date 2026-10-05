import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_WATCHLIST } from "@/lib/market/universe";

type WatchlistState = {
  symbols: string[];
  recents: string[];
  hydrated: boolean;
  toggle: (symbol: string) => void;
  add: (symbol: string) => void;
  remove: (symbol: string) => void;
  has: (symbol: string) => boolean;
  remember: (symbol: string) => void;
  markHydrated: () => void;
};

export const useWatchlist = create<WatchlistState>()(
  persist(
    (set, get) => ({
      symbols: DEFAULT_WATCHLIST,
      recents: [],
      hydrated: false,
      toggle: (symbol) => {
        const symbols = get().symbols;
        set({
          symbols: symbols.includes(symbol)
            ? symbols.filter((s) => s !== symbol)
            : [symbol, ...symbols].slice(0, 40),
        });
      },
      add: (symbol) => {
        const symbols = get().symbols;
        if (symbols.includes(symbol)) return;
        set({ symbols: [symbol, ...symbols].slice(0, 40) });
      },
      remove: (symbol) =>
        set({ symbols: get().symbols.filter((s) => s !== symbol) }),
      has: (symbol) => get().symbols.includes(symbol),
      remember: (symbol) => {
        const recents = get().recents.filter((s) => s !== symbol);
        set({ recents: [symbol, ...recents].slice(0, 8) });
      },
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "meridian-watchlist",
      partialize: (s) => ({ symbols: s.symbols, recents: s.recents }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
