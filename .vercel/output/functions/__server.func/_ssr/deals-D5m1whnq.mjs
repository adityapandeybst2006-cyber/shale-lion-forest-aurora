import { i as __toESM } from "../_runtime.mjs";
import { t as DEAL_LABEL } from "./news-DdPQCQH-.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as getDealsFn, n as Skeleton, t as AppShell } from "./skeleton-DK0XSJ_c.mjs";
import { n as DealCard } from "./news-card-LjRyGJ_e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deals-D5m1whnq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"all",
	"block",
	"bulk",
	"merger",
	"buyback",
	"ipo",
	"insider"
];
function DealsPage() {
	const [kind, setKind] = (0, import_react.useState)("all");
	const deals = useQuery({
		queryKey: ["deals"],
		queryFn: () => getDealsFn()
	});
	const filtered = (0, import_react.useMemo)(() => {
		const rows = deals.data ?? [];
		if (kind === "all") return rows;
		return rows.filter((d) => d.kind === kind);
	}, [deals.data, kind]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-tight italic",
			children: "Deals"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Block and bulk trades, mergers, buybacks and other activity that can reprice a stock."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hide-scrollbar mt-5 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1",
			children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setKind(f),
				className: kind === f ? "h-9 shrink-0 rounded-full bg-accent px-3 text-xs font-medium text-accent-fg" : "h-9 shrink-0 rounded-full bg-surface-2 px-3 text-xs font-medium text-muted",
				children: f === "all" ? "All" : DEAL_LABEL[f]
			}, f))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3",
			children: [
				filtered.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DealCard, { item: d }, d.id)),
				!deals.data && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" }, i)),
				deals.data && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-muted",
					children: "No deals in this filter."
				})
			]
		})
	] });
}
//#endregion
export { DealsPage as component };
