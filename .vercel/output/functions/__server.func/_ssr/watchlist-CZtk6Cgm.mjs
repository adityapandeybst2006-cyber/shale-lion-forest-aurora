import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as useWatchlist, g as getQuotesFn, n as Skeleton, t as AppShell } from "./skeleton-DK0XSJ_c.mjs";
import { t as QuoteRow } from "./quote-row-DqJphWxA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watchlist-CZtk6Cgm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WatchlistPage() {
	const symbols = useWatchlist((s) => s.symbols);
	const hydrated = useWatchlist((s) => s.hydrated);
	const markHydrated = useWatchlist((s) => s.markHydrated);
	(0, import_react.useEffect)(() => {
		if (!hydrated) markHydrated();
	}, [hydrated, markHydrated]);
	const quotes = useQuery({
		queryKey: ["quotes", symbols],
		queryFn: () => getQuotesFn({ data: { symbols } }),
		enabled: symbols.length > 0,
		refetchInterval: 2e4
	});
	const sorted = [...quotes.data ?? []].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-tight italic",
			children: "Watchlist"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Saved on this device. Open any company and tap the bookmark to add or remove it."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]",
			children: [
				sorted.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteRow, { quote: q }, q.symbol)),
				symbols.length > 0 && !quotes.data && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-2 h-14 rounded-xl" }, i)),
				symbols.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 py-10 text-center text-sm text-muted",
					children: "Your watchlist is empty. Search a company to start following it."
				})
			]
		})
	] });
}
//#endregion
export { WatchlistPage as component };
