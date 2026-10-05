import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as useWatchlist, d as getDealsFn, f as getHomeIndices, g as getQuotesFn, h as getNewsFn, m as getMovers, n as Skeleton, p as getMarketClocks, t as AppShell, y as marketDateLabel } from "./skeleton-DK0XSJ_c.mjs";
import { n as DealCard, r as NewsCard, t as Badge } from "./news-card-LjRyGJ_e.mjs";
import { t as QuoteRow } from "./quote-row-DqJphWxA.mjs";
import { t as IndexCard } from "./index-card-BerY5XLD.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BDwGh5O0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D4Fhxchb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const symbols = useWatchlist((s) => s.symbols);
	const hydrated = useWatchlist((s) => s.hydrated);
	const markHydrated = useWatchlist((s) => s.markHydrated);
	(0, import_react.useEffect)(() => {
		if (!hydrated) markHydrated();
	}, [hydrated, markHydrated]);
	const clocks = useQuery({
		queryKey: ["clocks"],
		queryFn: () => getMarketClocks(),
		refetchInterval: 6e4
	});
	const indices = useQuery({
		queryKey: ["home-indices"],
		queryFn: () => getHomeIndices(),
		refetchInterval: 2e4
	});
	const movers = useQuery({
		queryKey: ["movers", "ALL"],
		queryFn: () => getMovers({ data: { region: "ALL" } }),
		refetchInterval: 45e3
	});
	const watch = useQuery({
		queryKey: ["quotes", symbols],
		queryFn: () => getQuotesFn({ data: { symbols } }),
		enabled: symbols.length > 0,
		refetchInterval: 2e4
	});
	const news = useQuery({
		queryKey: ["news", "india"],
		queryFn: () => getNewsFn({ data: { tab: "india" } })
	});
	const deals = useQuery({
		queryKey: ["deals"],
		queryFn: () => getDealsFn()
	});
	const anyOpen = clocks.data?.some((c) => c.open);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: marketDateLabel()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl leading-tight tracking-tight text-fg italic sm:text-4xl",
					children: "Markets at a glance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [clocks.data?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: c.open ? "live" : "default",
						children: [
							c.open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot mr-1.5 inline-block size-1.5 rounded-full bg-up" }),
							c.name,
							" · ",
							c.open ? "Open" : "Closed"
						]
					}, c.id)), !clocks.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-40 rounded-full" })]
				}),
				anyOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Live session in progress. Quotes refresh every few seconds."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Benchmarks",
				to: "/markets"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1",
				children: [indices.data?.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndexCard, { quote: q }, q.symbol)), !indices.data && Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 w-[168px] shrink-0 rounded-2xl" }, i))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Watchlist",
				to: "/watchlist"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]",
				children: [watch.data?.slice(0, 6).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteRow, { quote: q }, q.symbol)), !watch.data && Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-2 h-14 rounded-xl" }, i))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Movers",
				to: "/markets"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "gainers",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "gainers",
						children: "Gainers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "losers",
						children: "Losers"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "gainers",
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]",
							children: [movers.data?.gainers.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteRow, { quote: q }, q.symbol)), !movers.data && Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-2 h-14 rounded-xl" }, i))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "losers",
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]",
							children: movers.data?.losers.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteRow, { quote: q }, q.symbol))
						})
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Market-moving news",
					to: "/news"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [news.data?.slice(0, 5).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsCard, { item: n }, n.id)), !news.data && Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" }, i))]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Deals",
					to: "/deals"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [deals.data?.slice(0, 5).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DealCard, { item: n }, n.id)), !deals.data && Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" }, i))]
				})] })]
			})
		]
	}) });
}
function SectionHead({ title, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium tracking-wide text-muted uppercase",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			className: "inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-fg",
			children: ["See all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
		})]
	});
}
//#endregion
export { Home as component };
