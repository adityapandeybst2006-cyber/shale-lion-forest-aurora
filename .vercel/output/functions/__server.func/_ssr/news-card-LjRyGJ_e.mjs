import { t as DEAL_LABEL } from "./news-DdPQCQH-.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { b as relativeTime, i as cn } from "./skeleton-DK0XSJ_c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-card-LjRyGJ_e.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "bg-surface-2 text-muted",
		up: "bg-up/15 text-up",
		down: "bg-down/15 text-down",
		live: "bg-up/15 text-up",
		warn: "bg-warn/15 text-warn",
		accent: "bg-accent/15 text-fg"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function NewsCard({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: item.url,
		target: "_blank",
		rel: "noreferrer",
		className: "block rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center gap-2 text-xs text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate font-medium text-fg/80",
					children: item.source
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					children: "·"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0",
					children: relativeTime(item.publishedAt)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-snug text-fg",
			children: item.title
		})]
	});
}
function DealCard({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: item.url,
		target: "_blank",
		rel: "noreferrer",
		className: "flex gap-3 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: item.kind === "merger" ? "accent" : "default",
						children: DEAL_LABEL[item.kind]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: relativeTime(item.publishedAt)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-snug text-fg",
					children: item.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: item.source
				})
			]
		})
	});
}
//#endregion
export { DealCard as n, NewsCard as r, Badge as t };
