import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn, o as formatPercent, s as formatPrice, x as signedClass } from "./skeleton-DK0XSJ_c.mjs";
import { n as Sparkline } from "./quote-row-DqJphWxA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/index-card-BerY5XLD.js
var import_jsx_runtime = require_jsx_runtime();
function IndexCard({ quote }) {
	const up = quote.changePercent >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/stock/$symbol",
		params: { symbol: quote.symbol },
		className: "flex w-[168px] shrink-0 flex-col gap-3 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: quote.shortName || quote.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tabular text-lg font-medium leading-tight text-fg",
				children: formatPrice(quote.price, quote.currency)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("tabular text-xs font-medium", signedClass(quote.changePercent)),
					children: formatPercent(quote.changePercent)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
					values: quote.spark,
					positive: up,
					className: "h-6 w-12"
				})]
			})
		]
	});
}
//#endregion
export { IndexCard as t };
