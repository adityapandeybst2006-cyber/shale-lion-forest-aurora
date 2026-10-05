import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as REGION_LABEL } from "./universe-C58z3fEQ.mjs";
import { c as BookmarkCheck, s as Bookmark } from "../_libs/lucide-react.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { S as useWatchlist, _ as getStockBundle, a as formatCompact, c as getAiBrief, i as cn, n as Skeleton, o as formatPercent, r as TickerMark, s as formatPrice, t as AppShell, u as getChartFn, x as signedClass } from "./skeleton-DK0XSJ_c.mjs";
import { r as NewsCard } from "./news-card-LjRyGJ_e.mjs";
import { n as Route } from "./router-BPJTGqDG.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock._symbol-DYNClbSG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function meter(value) {
	return Math.max(0, Math.min(100, value));
}
function labelTone(label) {
	if (label === "Strong buy" || label === "Accumulate") return "text-up";
	if (label === "Reduce" || label === "Caution") return "text-down";
	return "text-fg";
}
function Bar({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[88px_1fr_36px] items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-accent",
					style: { width: `${meter(value)}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular text-right text-xs text-fg",
				children: Math.round(value)
			})
		]
	});
}
function RatingCard({ rating }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Behaviour rating"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-1 font-display text-3xl leading-none", labelTone(rating.label)),
					children: rating.label
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular font-display text-4xl leading-none text-fg",
						children: rating.score
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "of 100"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "Momentum",
						value: rating.momentum
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "Trend",
						value: rating.trend
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "Stability",
						value: rating.stability
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "Resilience",
						value: rating.resilience
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						label: "1M",
						value: formatPercent((rating.return1m ?? 0) * 100),
						tone: rating.return1m
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						label: "3M",
						value: formatPercent((rating.return3m ?? 0) * 100),
						tone: rating.return3m
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
						label: "1Y",
						value: formatPercent((rating.return1y ?? 0) * 100),
						tone: rating.return1y
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs leading-relaxed text-subtle",
				children: "Built from past price behaviour — returns, trend versus moving averages, volatility and drawdown. Not a buy or sell recommendation."
			})
		]
	});
}
function Stat$1({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface-2 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("tabular text-sm font-medium", tone == null || tone === 0 ? "text-fg" : tone > 0 ? "text-up" : "text-down"),
			children: value
		})]
	});
}
var RANGES = [
	"1D",
	"1W",
	"1M",
	"3M",
	"1Y",
	"5Y"
];
function RangePills({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-1 rounded-xl bg-surface-2 p-1",
		children: RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(r),
			className: value === r ? "h-8 min-w-10 rounded-lg bg-surface px-2.5 text-xs font-medium text-fg shadow-[var(--shadow-border)]" : "h-8 min-w-10 rounded-lg px-2.5 text-xs font-medium text-muted",
			children: r
		}, r))
	});
}
function StockChart({ series, range }) {
	const data = (0, import_react.useMemo)(() => series.points.map((p) => ({
		t: p.t,
		close: p.close
	})), [series.points]);
	const up = (data.at(-1)?.close ?? 0) >= (data[0]?.close ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 8,
					right: 0,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "upFill",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-up)",
							stopOpacity: .22
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-up)",
							stopOpacity: 0
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "downFill",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-down)",
							stopOpacity: .22
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-down)",
							stopOpacity: 0
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "t",
						hide: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						domain: ["auto", "auto"],
						hide: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						cursor: { stroke: "var(--color-border)" },
						content: ({ active, payload }) => {
							if (!active || !payload?.[0]) return null;
							const row = payload[0].payload;
							const d = new Date(row.t);
							const label = range === "1D" ? d.toLocaleTimeString("en-IN", {
								hour: "2-digit",
								minute: "2-digit"
							}) : d.toLocaleDateString("en-IN", {
								day: "numeric",
								month: "short"
							});
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-surface-2 px-2.5 py-1.5 text-xs shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "tabular font-medium text-fg",
									children: formatPrice(row.close, series.currency)
								})]
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "close",
						stroke: up ? "var(--color-up)" : "var(--color-down)",
						strokeWidth: 1.8,
						fill: `url(#${up ? "upFill" : "downFill"})`,
						dot: false,
						isAnimationActive: false
					})
				]
			})
		})
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "text-fg hover:bg-surface-2",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			subtle: "bg-surface-2 text-fg hover:bg-surface"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function StockPage() {
	const { symbol: raw } = Route.useParams();
	const symbol = decodeURIComponent(raw);
	const [range, setRange] = (0, import_react.useState)("1Y");
	const has = useWatchlist((s) => s.symbols.includes(symbol));
	const toggle = useWatchlist((s) => s.toggle);
	const remember = useWatchlist((s) => s.remember);
	const bundle = useQuery({
		queryKey: ["stock", symbol],
		queryFn: () => getStockBundle({ data: { symbol } }),
		refetchInterval: 3e4
	});
	const chart = useQuery({
		queryKey: [
			"chart",
			symbol,
			range
		],
		queryFn: () => getChartFn({ data: {
			symbol,
			range
		} })
	});
	const brief = useMutation({ mutationFn: () => getAiBrief({ data: { symbol } }) });
	const quote = bundle.data?.quote;
	const rating = bundle.data?.rating;
	const profile = bundle.data?.profile;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TickerMark, {
						symbol,
						className: "size-12 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-2xl leading-tight tracking-tight",
							children: profile?.name ?? quote?.name ?? symbol
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-sm text-muted",
							children: [
								symbol,
								profile?.sector ? ` · ${profile.sector}` : "",
								profile?.region ? ` · ${REGION_LABEL[profile.region]}` : ""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							toggle(symbol);
							remember(symbol);
						},
						className: "inline-flex size-11 items-center justify-center rounded-md text-fg hover:bg-surface-2",
						"aria-label": has ? "Remove from watchlist" : "Add to watchlist",
						children: has ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" })
					})
				]
			}),
			quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tabular font-display text-4xl leading-none tracking-tight",
				children: formatPrice(quote.price, quote.currency)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-1 tabular text-sm font-medium", signedClass(quote.changePercent)),
				children: [
					formatPrice(quote.change, quote.currency),
					" (",
					formatPercent(quote.changePercent),
					")"
				]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 w-48" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-surface p-3 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangePills, {
						value: range,
						onChange: setRange
					})
				}), chart.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockChart, {
					series: chart.data,
					range
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-56 rounded-xl" })]
			}),
			quote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Previous close",
						value: formatPrice(quote.previousClose, quote.currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Day range",
						value: quote.dayLow != null && quote.dayHigh != null ? `${formatPrice(quote.dayLow)} – ${formatPrice(quote.dayHigh)}` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "52-week",
						value: quote.fiftyTwoWeekLow != null && quote.fiftyTwoWeekHigh != null ? `${formatPrice(quote.fiftyTwoWeekLow)} – ${formatPrice(quote.fiftyTwoWeekHigh)}` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Volume",
						value: formatCompact(quote.volume)
					})
				]
			}),
			rating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingCard, { rating }) : bundle.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 rounded-2xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Not enough history to rate this listing yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium tracking-wide text-muted uppercase",
						children: "Intelligence brief"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "A short reading of price behaviour and the latest headlines. Generated on request."
					}),
					brief.data?.ok && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 whitespace-pre-wrap text-sm leading-relaxed text-fg",
						children: brief.data.text
					}),
					brief.data && !brief.data.ok && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-down",
						children: brief.data.error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						variant: brief.data?.ok ? "outline" : "default",
						disabled: brief.isPending,
						onClick: () => brief.mutate(),
						children: brief.isPending ? "Writing…" : brief.data?.ok ? "Refresh brief" : "Write a brief"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm font-medium tracking-wide text-muted uppercase",
				children: "News that can move this stock"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					bundle.data?.news.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsCard, { item: n }, n.id)),
					bundle.isLoading && Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" }, i)),
					bundle.data && bundle.data.news.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No recent headlines found."
					})
				]
			})] })
		]
	}) });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 tabular text-sm font-medium text-fg",
			children: value
		})]
	});
}
//#endregion
export { StockPage as component };
