import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as displayName } from "./universe-C58z3fEQ.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as useWatchlist, h as getNewsFn, n as Skeleton, t as AppShell } from "./skeleton-DK0XSJ_c.mjs";
import { r as NewsCard } from "./news-card-LjRyGJ_e.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BDwGh5O0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-Cc9CMoE7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	const [tab, setTab] = (0, import_react.useState)("india");
	const names = useWatchlist((s) => s.symbols).slice(0, 6).map((s) => displayName(s));
	const news = useQuery({
		queryKey: [
			"news",
			tab,
			names.join(",")
		],
		queryFn: () => getNewsFn({ data: {
			tab,
			names
		} })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-tight italic",
			children: "News"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Headlines that tend to move Indian and global shares."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onValueChange: (v) => setTab(v),
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "india",
						className: "flex-1",
						children: "India"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "global",
						className: "flex-1",
						children: "Global"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "watchlist",
						className: "flex-1",
						children: "Watchlist"
					})
				]
			}), [
				"india",
				"global",
				"watchlist"
			].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: t,
				className: "mt-4 space-y-3",
				children: [
					news.data?.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsCard, { item: n }, n.id)),
					!news.data && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" }, i)),
					news.data && news.data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted",
						children: "No headlines right now."
					})
				]
			}, t))]
		})
	] });
}
//#endregion
export { NewsPage as component };
