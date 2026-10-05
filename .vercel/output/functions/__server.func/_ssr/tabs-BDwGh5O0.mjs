import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as cn } from "./skeleton-DK0XSJ_c.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tabs-BDwGh5O0.js
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 items-center gap-1 rounded-xl bg-surface-2 p-1", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-muted transition-[background-color,color] duration-150 data-[state=active]:bg-surface data-[state=active]:text-fg data-[state=active]:shadow-[var(--shadow-border)]", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("outline-none", className),
		...props
	});
}
//#endregion
export { TabsTrigger as i, TabsContent as n, TabsList as r, Tabs as t };
