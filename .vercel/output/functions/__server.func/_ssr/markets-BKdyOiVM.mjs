import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as getAllIndices, n as Skeleton, t as AppShell, v as getUniverseQuotes } from "./skeleton-DK0XSJ_c.mjs";
import { t as QuoteRow } from "./quote-row-DqJphWxA.mjs";
import { t as IndexCard } from "./index-card-BerY5XLD.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BDwGh5O0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/markets-BKdyOiVM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REGIONS = [
	{
		id: "IN",
		label: "India"
	},
	{
		id: "US",
		label: "United States"
	},
	{
		id: "EU",
		label: "Europe"
	},
	{
		id: "AS",
		label: "Asia"
	}
];
function MarketsPage() {
	const [region, setRegion] = (0, import_react.useState)("IN");
	const [sector, setSector] = (0, import_react.useState)("All");
	const indices = useQuery({
		queryKey: ["all-indices"],
		queryFn: () => getAllIndices(),
		refetchInterval: 3e4
	});
	const quotes = useQuery({
		queryKey: ["universe", region],
		queryFn: () => getUniverseQuotes({ data: { region } }),
		refetchInterval: 3e4
	});
	const sectors = (0, import_react.useMemo)(() => {
		return ["All", ...[...new Set(quotes.data?.map((q) => q.sector).filter(Boolean))].sort()];
	}, [quotes.data]);
	const filtered = (quotes.data ?? []).filter((q) => sector === "All" || q.sector === sector);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-tight italic",
			children: "Markets"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Indian exchanges plus the United States, Europe and Asia. Search for any other listing."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hide-scrollbar mt-6 -mx-4 flex gap-3 overflow-x-auto px-4 pb-1",
			children: [indices.data?.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndexCard, { quote: q }, q.symbol)), !indices.data && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 w-[168px] shrink-0 rounded-2xl" }, i))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: region,
			onValueChange: (v) => {
				setRegion(v);
				setSector("All");
			},
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
				className: "w-full justify-start overflow-x-auto",
				children: REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: r.id,
					className: "flex-1",
					children: r.label
				}, r.id))
			}), REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: r.id,
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hide-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1",
					children: sectors.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSector(s),
						className: sector === s ? "h-9 shrink-0 rounded-full bg-accent px-3 text-xs font-medium text-accent-fg" : "h-9 shrink-0 rounded-full bg-surface-2 px-3 text-xs font-medium text-muted",
						children: s
					}, s))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]",
					children: [
						filtered.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteRow, { quote: q }, q.symbol)),
						!quotes.data && Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-2 h-14 rounded-xl" }, i)),
						quotes.data && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 py-8 text-center text-sm text-muted",
							children: "No companies in this sector."
						})
					]
				})]
			}, r.id))]
		})
	] });
}
//#endregion
export { MarketsPage as component };
