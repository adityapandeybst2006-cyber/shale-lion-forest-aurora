import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as REGION_LABEL, n as DEFAULT_WATCHLIST, o as UNIVERSE } from "./universe-C58z3fEQ.mjs";
import { a as object, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
import { a as Newspaper, i as Search, o as Earth, r as Sparkles, s as Bookmark, t as X, u as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skeleton-DK0XSJ_c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var TONES = [
	"bg-surface-2 text-fg",
	"bg-accent/10 text-fg",
	"bg-up/10 text-up",
	"bg-down/10 text-down"
];
function tone(symbol) {
	let n = 0;
	for (const c of symbol) n = (n + c.charCodeAt(0)) % TONES.length;
	return TONES[n];
}
function TickerMark({ symbol, className }) {
	const label = symbol.replace(/\.[A-Z]+$/i, "").replace("^", "").slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-[11px] font-medium tracking-wide", tone(symbol), className),
		children: label
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-surface-2 px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-[var(--shadow-border-hover)] focus-visible:ring-2 focus-visible:ring-ring/40", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var symbolList = object({ symbols: array(string().min(1).max(32)).max(40) });
var getMarketClocks = createServerFn({ method: "GET" }).handler(createSsrRpc("7cef0373fef916b651e90ec26e77178f67f9c50388379157fdb9733058d4691e"));
var getQuotesFn = createServerFn({ method: "POST" }).validator((input) => symbolList.parse(input)).handler(createSsrRpc("f84171a8a87487b476ae4f04f771da66f866f84a14913987baab2360b561d5eb"));
var getHomeIndices = createServerFn({ method: "GET" }).handler(createSsrRpc("3f9d05eeffcefde5d58e7a3f43156f379ed4579551b9a93722c60e09982c2a00"));
var getAllIndices = createServerFn({ method: "GET" }).handler(createSsrRpc("2acc175b67e786898a3a684bde4d2d51a5a02ab85740c4407ae81a307985df2b"));
var getMovers = createServerFn({ method: "POST" }).validator((input) => object({ region: _enum([
	"IN",
	"US",
	"EU",
	"AS",
	"ALL"
]).default("ALL") }).parse(input)).handler(createSsrRpc("2d445aac49a45e27f1ee3227ea056c22bcbe3953bad2bcc8ec2d407c7a2cabd7"));
var getUniverseQuotes = createServerFn({ method: "POST" }).validator((input) => object({ region: _enum([
	"IN",
	"US",
	"EU",
	"AS"
]) }).parse(input)).handler(createSsrRpc("97cb61aa258ae39c5c909fa3ef775724efb41b980f53d4810a12f579f10e8fcf"));
var searchSecurities = createServerFn({ method: "POST" }).validator((input) => object({ q: string().min(1).max(80) }).parse(input)).handler(createSsrRpc("c6006ac001c9695dc8e9cf8d217c6a2a522d6308a84daea7e7a5cd5a200cc758"));
var getChartFn = createServerFn({ method: "POST" }).validator((input) => object({
	symbol: string().min(1).max(32),
	range: string().default("1Y")
}).parse(input)).handler(createSsrRpc("739a326a71cb88260381d31639e508ae30505f1f0a13a9c12a8de1e2e7f81247"));
var getNewsFn = createServerFn({ method: "POST" }).validator((input) => object({
	tab: _enum([
		"india",
		"global",
		"watchlist"
	]).default("india"),
	names: array(string()).max(8).optional()
}).parse(input)).handler(createSsrRpc("c48c07e0957518f25d1d3a5352dba0ed41728408f0ebb45268d03d473f555cde"));
var getDealsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("b1b6da6b948b5565e23eb62279eac0dd257535aea4f611cf9fc5f284db3a5f60"));
var getStockBundle = createServerFn({ method: "POST" }).validator((input) => object({ symbol: string().min(1).max(32) }).parse(input)).handler(createSsrRpc("7c78547f5581d141dbd21637efc3443bfe00a2186eb5e915b4a64686916f24ca"));
var getAiBrief = createServerFn({ method: "POST" }).validator((input) => object({ symbol: string().min(1).max(32) }).parse(input)).handler(createSsrRpc("8a04a53e02dcd8466359e9649cf6cc59a684851af6b9466700eab32e9e8cb692"));
var useWatchlist = create()(persist((set, get) => ({
	symbols: DEFAULT_WATCHLIST,
	recents: [],
	hydrated: false,
	toggle: (symbol) => {
		const symbols = get().symbols;
		set({ symbols: symbols.includes(symbol) ? symbols.filter((s) => s !== symbol) : [symbol, ...symbols].slice(0, 40) });
	},
	add: (symbol) => {
		const symbols = get().symbols;
		if (symbols.includes(symbol)) return;
		set({ symbols: [symbol, ...symbols].slice(0, 40) });
	},
	remove: (symbol) => set({ symbols: get().symbols.filter((s) => s !== symbol) }),
	has: (symbol) => get().symbols.includes(symbol),
	remember: (symbol) => {
		set({ recents: [symbol, ...get().recents.filter((s) => s !== symbol)].slice(0, 8) });
	},
	markHydrated: () => set({ hydrated: true })
}), {
	name: "meridian-watchlist",
	partialize: (s) => ({
		symbols: s.symbols,
		recents: s.recents
	}),
	onRehydrateStorage: () => (state) => {
		state?.markHydrated();
	}
}));
function SearchOverlay({ open, onClose }) {
	const [q, setQ] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const recents = useWatchlist((s) => s.recents);
	const remember = useWatchlist((s) => s.remember);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const t = window.setTimeout(() => inputRef.current?.focus(), 40);
		const onKey = (e) => {
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
		enabled: open && trimmed.length >= 1
	});
	const local = (0, import_react.useMemo)(() => {
		if (trimmed.length < 1) return [];
		const needle = trimmed.toLowerCase();
		return UNIVERSE.filter((s) => s.symbol.toLowerCase().includes(needle) || s.name.toLowerCase().includes(needle)).slice(0, 8);
	}, [trimmed]);
	const hits = data?.length ? data : local.map((s) => ({
		symbol: s.symbol,
		name: s.name,
		type: "Equity",
		exchange: s.country,
		region: s.region,
		sector: s.sector
	}));
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-bg/95",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-full max-w-lg flex-col px-4 pt-4 pb-[env(safe-area-inset-bottom)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						ref: inputRef,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search Indian and global companies",
						className: "pl-10",
						autoComplete: "off",
						autoCorrect: "off"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface-2",
					"aria-label": "Close search",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 min-h-0 flex-1 overflow-y-auto pb-8",
				children: [
					trimmed.length < 1 && recents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium tracking-wide text-muted uppercase",
						children: "Recent"
					}),
					trimmed.length < 1 && recents.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-10 text-center text-sm text-muted",
						children: "Try Reliance, TCS, Apple, NVIDIA, Nestle, or Nifty."
					}),
					trimmed.length >= 1 && !hits.length && !isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-10 text-center text-sm text-muted",
						children: "No matches."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1",
						children: (trimmed.length < 1 ? recents.map((s) => ({
							symbol: s,
							name: s,
							type: "",
							exchange: ""
						})) : hits).map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/stock/$symbol",
							params: { symbol: hit.symbol },
							onClick: () => {
								remember(hit.symbol);
								onClose();
							},
							className: "flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 hover:bg-surface-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TickerMark, { symbol: hit.symbol }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: hit.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "truncate text-xs text-muted",
									children: [
										hit.symbol,
										hit.exchange ? ` · ${hit.exchange}` : "",
										hit.region ? ` · ${REGION_LABEL[hit.region]}` : ""
									]
								})]
							})]
						}) }, hit.symbol))
					})
				]
			})]
		})
	});
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: Sparkles
	},
	{
		to: "/markets",
		label: "Markets",
		icon: Earth
	},
	{
		to: "/watchlist",
		label: "Watchlist",
		icon: Bookmark
	},
	{
		to: "/news",
		label: "News",
		icon: Newspaper
	}
];
function AppShell({ children }) {
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const onStock = pathname.startsWith("/stock/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border/80 bg-bg/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center gap-3 px-4",
					children: [
						onStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface-2",
							"aria-label": "Back",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl tracking-tight italic",
								children: "Meridian"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSearchOpen(true),
							className: "inline-flex h-11 items-center gap-2 rounded-md bg-surface-2 px-3 text-sm text-muted shadow-[var(--shadow-border)] hover:text-fg",
							"aria-label": "Search companies",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Search companies"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-52 shrink-0 flex-col gap-1 border-r border-border p-4 lg:flex",
					children: [NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium", active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
						}, item.to);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/deals",
						className: cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium", pathname.startsWith("/deals") ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface hover:text-fg"),
						children: "Deals"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 px-4 pt-5 pb-28 lg:pb-10",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-lg grid-cols-4",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium", active ? "text-fg" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
						}, item.to);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOverlay, {
				open: searchOpen,
				onClose: () => setSearchOpen(false)
			})
		]
	});
}
var COMPACT = {
	notation: "compact",
	maximumFractionDigits: 2
};
function formatPrice(value, currency) {
	if (!Number.isFinite(value)) return "—";
	const abs = Math.abs(value);
	const digits = abs >= 1e3 ? 2 : abs >= 100 ? 2 : abs >= 1 ? 2 : 4;
	try {
		if (currency) return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency,
			maximumFractionDigits: digits,
			minimumFractionDigits: digits > 2 ? 4 : 2
		}).format(value);
	} catch {}
	return value.toLocaleString("en-IN", {
		maximumFractionDigits: digits,
		minimumFractionDigits: Math.min(2, digits)
	});
}
function formatCompact(value) {
	if (value == null || !Number.isFinite(value) || value === 0) return "—";
	return new Intl.NumberFormat("en-IN", COMPACT).format(value);
}
function formatPercent(value, digits = 2) {
	if (value == null || !Number.isFinite(value)) return "—";
	return `${value > 0 ? "+" : ""}${value.toFixed(digits)}%`;
}
function signedClass(value) {
	if (value == null || !Number.isFinite(value) || value === 0) return "text-muted";
	return value > 0 ? "text-up" : "text-down";
}
function relativeTime(iso) {
	const then = new Date(iso).getTime();
	if (!Number.isFinite(then)) return "";
	const diff = Date.now() - then;
	const min = Math.round(diff / 6e4);
	if (min < 1) return "just now";
	if (min < 60) return `${min}m ago`;
	const hr = Math.round(min / 60);
	if (hr < 24) return `${hr}h ago`;
	const day = Math.round(hr / 24);
	if (day < 7) return `${day}d ago`;
	return new Date(iso).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short"
	});
}
function marketDateLabel(now = /* @__PURE__ */ new Date()) {
	return now.toLocaleDateString("en-IN", {
		weekday: "long",
		day: "numeric",
		month: "short"
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-surface-2", className),
		...props
	});
}
//#endregion
export { useWatchlist as S, getStockBundle as _, formatCompact as a, relativeTime as b, getAiBrief as c, getDealsFn as d, getHomeIndices as f, getQuotesFn as g, getNewsFn as h, cn as i, getAllIndices as l, getMovers as m, Skeleton as n, formatPercent as o, getMarketClocks as p, TickerMark as r, formatPrice as s, AppShell as t, getChartFn as u, getUniverseQuotes as v, signedClass as x, marketDateLabel as y };
