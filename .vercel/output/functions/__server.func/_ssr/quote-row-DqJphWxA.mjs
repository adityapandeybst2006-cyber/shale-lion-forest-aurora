import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn, o as formatPercent, r as TickerMark, s as formatPrice, x as signedClass } from "./skeleton-DK0XSJ_c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-row-DqJphWxA.js
var import_jsx_runtime = require_jsx_runtime();
function Sparkline({ values, className, positive }) {
	const pts = values.filter((n) => Number.isFinite(n));
	if (pts.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-8 w-16", className) });
	const min = Math.min(...pts);
	const span = Math.max(...pts) - min || 1;
	const w = 64;
	const h = 28;
	const d = pts.map((v, i) => {
		const x = i / (pts.length - 1) * w;
		const y = h - (v - min) / span * h;
		return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
	}).join(" ");
	const up = positive ?? pts[pts.length - 1] >= pts[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("h-8 w-16 overflow-visible", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke: up ? "var(--color-up)" : "var(--color-down)",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function QuoteRow({ quote, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/stock/$symbol",
		params: { symbol: quote.symbol },
		className: "flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 transition-[background-color] duration-150 hover:bg-surface-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TickerMark, { symbol: quote.symbol }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-sm font-medium text-fg",
					children: quote.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "truncate text-xs text-muted",
					children: [quote.symbol, quote.sector ? ` · ${quote.sector}` : ""]
				})]
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
				values: quote.spark,
				positive: quote.changePercent >= 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-24 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "tabular text-sm font-medium text-fg",
					children: formatPrice(quote.price, quote.currency)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("tabular text-xs", signedClass(quote.changePercent)),
					children: formatPercent(quote.changePercent)
				})]
			})
		]
	});
}
//#endregion
export { Sparkline as n, QuoteRow as t };
