import { i as fetchMarketNews, n as fetchCompanyNews, r as fetchDeals } from "./news-DdPQCQH-.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { c as regionOf, i as INDICES, l as universeByRegion, r as HOME_INDICES, t as BY_SYMBOL } from "./universe-C58z3fEQ.mjs";
import { a as object, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/functions-DUfVvdw6.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function lastN(values, n) {
	return n >= values.length ? values.slice() : values.slice(values.length - n);
}
function mean(values) {
	if (!values.length) return 0;
	return values.reduce((a, b) => a + b, 0) / values.length;
}
function returns(closes) {
	const out = [];
	for (let i = 1; i < closes.length; i++) {
		const prev = closes[i - 1];
		const cur = closes[i];
		if (prev > 0 && Number.isFinite(cur)) out.push(cur / prev - 1);
	}
	return out;
}
function periodReturn(closes, days) {
	if (closes.length < 3) return null;
	const window = lastN(closes, days + 1);
	const first = window[0];
	const last = window[window.length - 1];
	if (!(first > 0)) return null;
	return last / first - 1;
}
function sma(closes, n) {
	if (closes.length < n) return mean(closes);
	return mean(lastN(closes, n));
}
function stdev(values) {
	if (values.length < 2) return 0;
	const m = mean(values);
	const v = mean(values.map((x) => (x - m) ** 2));
	return Math.sqrt(v);
}
function maxDrawdown(closes) {
	let peak = closes[0] ?? 0;
	let dd = 0;
	for (const c of closes) {
		if (c > peak) peak = c;
		if (peak > 0) dd = Math.max(dd, 1 - c / peak);
	}
	return dd;
}
function clamp(n, min = 0, max = 100) {
	return Math.min(max, Math.max(min, n));
}
function labelFor(score) {
	if (score >= 78) return "Strong buy";
	if (score >= 62) return "Accumulate";
	if (score >= 45) return "Hold";
	if (score >= 30) return "Reduce";
	return "Caution";
}
function computeRating(closes) {
	const series = closes.filter((n) => Number.isFinite(n) && n > 0);
	if (series.length < 20) return null;
	const last = series[series.length - 1];
	const high = Math.max(...series);
	const r1m = periodReturn(series, 21);
	const r3m = periodReturn(series, 63);
	const r1y = periodReturn(series, 252);
	const sma50 = sma(series, 50);
	const sma200 = sma(series, Math.min(200, series.length));
	const daily = returns(lastN(series, 60));
	const vol = daily.length ? stdev(daily) * Math.sqrt(252) : null;
	const mdd = maxDrawdown(series);
	const vsHigh = high > 0 ? last / high - 1 : null;
	const momentum = clamp(50 + ((r1m ?? 0) * .4 + (r3m ?? 0) * .3 + (r1y ?? 0) * .3) * 180);
	let trend = 48;
	if (sma50 != null && last > sma50) trend += 16;
	if (sma200 != null && last > sma200) trend += 18;
	if (sma50 != null && sma200 != null && sma50 > sma200) trend += 14;
	if (r1m != null && r1m > 0 && r3m != null && r3m > 0) trend += 4;
	trend = clamp(trend);
	const stability = vol == null ? 50 : clamp(100 - vol * 220);
	const resilience = clamp(100 - mdd * 140);
	const score = clamp(momentum * .35 + trend * .3 + stability * .2 + resilience * .15);
	return {
		score: Math.round(score),
		label: labelFor(score),
		momentum: Math.round(momentum),
		trend: Math.round(trend),
		stability: Math.round(stability),
		resilience: Math.round(resilience),
		return1m: r1m,
		return3m: r3m,
		return1y: r1y,
		volatility: vol,
		maxDrawdown: mdd,
		vsHigh,
		sample: series.length
	};
}
function partsInZone(timeZone) {
	const fmt = new Intl.DateTimeFormat("en-GB", {
		timeZone,
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	});
	const bag = {};
	for (const p of fmt.formatToParts(/* @__PURE__ */ new Date())) if (p.type !== "literal") bag[p.type] = p.value;
	return {
		weekday: bag.weekday ?? "",
		minutes: Number(bag.hour) * 60 + Number(bag.minute)
	};
}
function session(id, name, city, timeZone, openMin, closeMin) {
	const { weekday, minutes } = partsInZone(timeZone);
	const weekend = weekday === "Sat" || weekday === "Sun";
	const open = !weekend && minutes >= openMin && minutes < closeMin;
	const hh = (n) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
	return {
		id,
		name,
		city,
		open,
		note: weekend ? "Weekend" : open ? `Open · ${hh(closeMin)} close` : `Closed · ${hh(openMin)} open`
	};
}
function marketClocks() {
	return [
		session("IN", "India", "Mumbai", "Asia/Kolkata", 555, 930),
		session("US", "United States", "New York", "America/New_York", 570, 960),
		session("EU", "Europe", "London", "Europe/London", 480, 990),
		session("AS", "Asia", "Tokyo", "Asia/Tokyo", 540, 900)
	];
}
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
var memory = /* @__PURE__ */ new Map();
async function cached(key, ttlMs, fn) {
	const hit = memory.get(key);
	if (hit && Date.now() - hit.at < ttlMs) return hit.data;
	const data = await fn();
	memory.set(key, {
		at: Date.now(),
		data
	});
	return data;
}
async function yahoo(url) {
	const res = await fetch(url, { headers: {
		"User-Agent": UA,
		Accept: "application/json"
	} });
	if (!res.ok) throw new Error(`Market feed unavailable (${res.status})`);
	return await res.json();
}
function enrich(quote) {
	const known = BY_SYMBOL.get(quote.symbol) ?? INDICES.find((i) => i.symbol === quote.symbol);
	return {
		...quote,
		name: known?.name ?? quote.name,
		region: known?.region ?? regionOf(quote.symbol),
		sector: known?.sector ?? quote.sector,
		country: known?.country ?? quote.country
	};
}
function fromMeta(symbol, meta, spark) {
	const price = meta.regularMarketPrice ?? spark.at(-1) ?? 0;
	const previous = meta.chartPreviousClose ?? meta.previousClose ?? price;
	const change = price - previous;
	const changePercent = meta.regularMarketChangePercent ?? (previous ? change / previous * 100 : 0);
	return enrich({
		symbol,
		name: meta.longName || meta.shortName || symbol,
		shortName: meta.shortName || meta.longName || symbol,
		currency: meta.currency || "USD",
		price,
		change,
		changePercent,
		previousClose: previous,
		dayHigh: meta.regularMarketDayHigh ?? null,
		dayLow: meta.regularMarketDayLow ?? null,
		volume: meta.regularMarketVolume ?? null,
		fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh ?? null,
		fiftyTwoWeekLow: meta.fiftyTwoWeekLow ?? null,
		exchange: meta.exchangeName || "",
		instrument: meta.instrumentType || "EQUITY",
		spark
	});
}
function downsample(values, max = 40) {
	if (values.length <= max) return values;
	const out = [];
	const step = (values.length - 1) / (max - 1);
	for (let i = 0; i < max; i++) out.push(values[Math.round(i * step)] ?? 0);
	return out;
}
async function fetchQuotes(symbols, range = "1d", interval = "5m") {
	const unique = [...new Set(symbols.filter(Boolean))];
	if (!unique.length) return [];
	const batches = [];
	for (let i = 0; i < unique.length; i += 18) batches.push(unique.slice(i, i + 18));
	const parts = await Promise.all(batches.map(async (batch) => {
		const url = `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${batch.map(encodeURIComponent).join(",")}&range=${range}&interval=${interval}`;
		try {
			const data = await yahoo(url);
			const rows = [];
			for (const item of data.spark?.result ?? []) {
				const res = item.response?.[0];
				const meta = res?.meta;
				if (!meta) continue;
				const closes = (res?.indicators?.quote?.[0]?.close ?? []).filter((n) => typeof n === "number" && Number.isFinite(n));
				rows.push(fromMeta(item.symbol, meta, downsample(closes)));
			}
			return rows;
		} catch {
			return [];
		}
	}));
	const map = /* @__PURE__ */ new Map();
	for (const row of parts.flat()) map.set(row.symbol, row);
	return unique.map((s) => map.get(s)).filter((q) => Boolean(q));
}
var RANGE_MAP = {
	"1D": {
		range: "1d",
		interval: "5m"
	},
	"1W": {
		range: "5d",
		interval: "15m"
	},
	"1M": {
		range: "1mo",
		interval: "1d"
	},
	"3M": {
		range: "3mo",
		interval: "1d"
	},
	"1Y": {
		range: "1y",
		interval: "1d"
	},
	"5Y": {
		range: "5y",
		interval: "1wk"
	}
};
async function fetchChart(symbol, rangeKey) {
	const spec = RANGE_MAP[rangeKey] ?? RANGE_MAP["1Y"];
	const res = (await yahoo(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${spec.interval}&range=${spec.range}`)).chart?.result?.[0];
	if (!res) throw new Error("No chart data");
	const meta = res.meta ?? {};
	const ts = res.timestamp ?? [];
	const closes = res.indicators?.quote?.[0]?.close ?? [];
	const points = ts.map((t, i) => {
		const close = closes[i];
		if (typeof close !== "number" || !Number.isFinite(close)) return null;
		return {
			t: t * 1e3,
			close
		};
	}).filter((p) => Boolean(p));
	const price = meta.regularMarketPrice ?? points.at(-1)?.close ?? 0;
	const previous = meta.chartPreviousClose ?? meta.previousClose ?? price;
	return {
		symbol,
		name: meta.longName || meta.shortName || symbol,
		currency: meta.currency || "USD",
		points,
		previousClose: previous,
		price,
		changePercent: previous ? (price - previous) / previous * 100 : 0
	};
}
async function fetchSearch(query) {
	const q = query.trim();
	if (q.length < 1) return [];
	const data = await yahoo(`https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=18&newsCount=0&enableFuzzyQuery=false`);
	const hits = [];
	const seen = /* @__PURE__ */ new Set();
	for (const row of data.quotes ?? []) {
		const symbol = row.symbol;
		if (!symbol || seen.has(symbol)) continue;
		const type = row.quoteType || row.typeDisp || "";
		if (type && !/equity|etf|index|cryptocurrency|ecb|mutualfund/i.test(type)) continue;
		seen.add(symbol);
		hits.push({
			symbol,
			name: row.longname || row.shortname || symbol,
			type: row.typeDisp || row.quoteType || "Equity",
			exchange: row.exchDisp || row.exchange || "",
			region: regionOf(symbol),
			sector: row.sector
		});
	}
	return hits;
}
var symbolList = object({ symbols: array(string().min(1).max(32)).max(40) });
var getMarketClocks_createServerFn_handler = createServerRpc({
	id: "7cef0373fef916b651e90ec26e77178f67f9c50388379157fdb9733058d4691e",
	name: "getMarketClocks",
	filename: "src/lib/market/functions.ts"
}, (opts) => getMarketClocks.__executeServer(opts));
var getMarketClocks = createServerFn({ method: "GET" }).handler(getMarketClocks_createServerFn_handler, async () => marketClocks());
var getQuotesFn_createServerFn_handler = createServerRpc({
	id: "f84171a8a87487b476ae4f04f771da66f866f84a14913987baab2360b561d5eb",
	name: "getQuotesFn",
	filename: "src/lib/market/functions.ts"
}, (opts) => getQuotesFn.__executeServer(opts));
var getQuotesFn = createServerFn({ method: "POST" }).validator((input) => symbolList.parse(input)).handler(getQuotesFn_createServerFn_handler, async ({ data }) => {
	return cached(`q:${data.symbols.slice().sort().join(",")}`, 2e4, () => fetchQuotes(data.symbols));
});
var getHomeIndices_createServerFn_handler = createServerRpc({
	id: "3f9d05eeffcefde5d58e7a3f43156f379ed4579551b9a93722c60e09982c2a00",
	name: "getHomeIndices",
	filename: "src/lib/market/functions.ts"
}, (opts) => getHomeIndices.__executeServer(opts));
var getHomeIndices = createServerFn({ method: "GET" }).handler(getHomeIndices_createServerFn_handler, async () => {
	return cached("home-indices", 2e4, () => fetchQuotes(HOME_INDICES));
});
var getAllIndices_createServerFn_handler = createServerRpc({
	id: "2acc175b67e786898a3a684bde4d2d51a5a02ab85740c4407ae81a307985df2b",
	name: "getAllIndices",
	filename: "src/lib/market/functions.ts"
}, (opts) => getAllIndices.__executeServer(opts));
var getAllIndices = createServerFn({ method: "GET" }).handler(getAllIndices_createServerFn_handler, async () => {
	return cached("all-indices", 3e4, () => fetchQuotes(INDICES.map((i) => i.symbol)));
});
function rankMovers(quotes) {
	const tradable = quotes.filter((q) => q.instrument !== "INDEX" && Number.isFinite(q.changePercent));
	return {
		gainers: [...tradable].sort((a, b) => b.changePercent - a.changePercent).slice(0, 8),
		losers: [...tradable].sort((a, b) => a.changePercent - b.changePercent).slice(0, 8)
	};
}
var getMovers_createServerFn_handler = createServerRpc({
	id: "2d445aac49a45e27f1ee3227ea056c22bcbe3953bad2bcc8ec2d407c7a2cabd7",
	name: "getMovers",
	filename: "src/lib/market/functions.ts"
}, (opts) => getMovers.__executeServer(opts));
var getMovers = createServerFn({ method: "POST" }).validator((input) => object({ region: _enum([
	"IN",
	"US",
	"EU",
	"AS",
	"ALL"
]).default("ALL") }).parse(input)).handler(getMovers_createServerFn_handler, async ({ data }) => {
	const pool = data.region === "ALL" ? [...universeByRegion("IN").slice(0, 28).map((s) => s.symbol), ...universeByRegion("US").slice(0, 22).map((s) => s.symbol)] : universeByRegion(data.region).map((s) => s.symbol);
	return cached(`movers:${data.region}`, 45e3, async () => {
		return rankMovers(await fetchQuotes(pool));
	});
});
var getUniverseQuotes_createServerFn_handler = createServerRpc({
	id: "97cb61aa258ae39c5c909fa3ef775724efb41b980f53d4810a12f579f10e8fcf",
	name: "getUniverseQuotes",
	filename: "src/lib/market/functions.ts"
}, (opts) => getUniverseQuotes.__executeServer(opts));
var getUniverseQuotes = createServerFn({ method: "POST" }).validator((input) => object({ region: _enum([
	"IN",
	"US",
	"EU",
	"AS"
]) }).parse(input)).handler(getUniverseQuotes_createServerFn_handler, async ({ data }) => {
	const symbols = universeByRegion(data.region).map((s) => s.symbol);
	return cached(`uni:${data.region}`, 3e4, () => fetchQuotes(symbols));
});
var searchSecurities_createServerFn_handler = createServerRpc({
	id: "c6006ac001c9695dc8e9cf8d217c6a2a522d6308a84daea7e7a5cd5a200cc758",
	name: "searchSecurities",
	filename: "src/lib/market/functions.ts"
}, (opts) => searchSecurities.__executeServer(opts));
var searchSecurities = createServerFn({ method: "POST" }).validator((input) => object({ q: string().min(1).max(80) }).parse(input)).handler(searchSecurities_createServerFn_handler, async ({ data }) => {
	return cached(`s:${data.q.toLowerCase()}`, 6e4, () => fetchSearch(data.q));
});
var getChartFn_createServerFn_handler = createServerRpc({
	id: "739a326a71cb88260381d31639e508ae30505f1f0a13a9c12a8de1e2e7f81247",
	name: "getChartFn",
	filename: "src/lib/market/functions.ts"
}, (opts) => getChartFn.__executeServer(opts));
var getChartFn = createServerFn({ method: "POST" }).validator((input) => object({
	symbol: string().min(1).max(32),
	range: string().default("1Y")
}).parse(input)).handler(getChartFn_createServerFn_handler, async ({ data }) => {
	const range = data.range in RANGE_MAP ? data.range : "1Y";
	return cached(`c:${data.symbol}:${range}`, 45e3, () => fetchChart(data.symbol, range));
});
var getNewsFn_createServerFn_handler = createServerRpc({
	id: "c48c07e0957518f25d1d3a5352dba0ed41728408f0ebb45268d03d473f555cde",
	name: "getNewsFn",
	filename: "src/lib/market/functions.ts"
}, (opts) => getNewsFn.__executeServer(opts));
var getNewsFn = createServerFn({ method: "POST" }).validator((input) => object({
	tab: _enum([
		"india",
		"global",
		"watchlist"
	]).default("india"),
	names: array(string()).max(8).optional()
}).parse(input)).handler(getNewsFn_createServerFn_handler, async ({ data }) => {
	return cached(`n:${data.tab}:${(data.names ?? []).join(",")}`, 12e4, () => fetchMarketNews(data.tab, data.names));
});
var getDealsFn_createServerFn_handler = createServerRpc({
	id: "b1b6da6b948b5565e23eb62279eac0dd257535aea4f611cf9fc5f284db3a5f60",
	name: "getDealsFn",
	filename: "src/lib/market/functions.ts"
}, (opts) => getDealsFn.__executeServer(opts));
var getDealsFn = createServerFn({ method: "GET" }).handler(getDealsFn_createServerFn_handler, async () => {
	return cached("deals", 12e4, () => fetchDeals());
});
var getStockBundle_createServerFn_handler = createServerRpc({
	id: "7c78547f5581d141dbd21637efc3443bfe00a2186eb5e915b4a64686916f24ca",
	name: "getStockBundle",
	filename: "src/lib/market/functions.ts"
}, (opts) => getStockBundle.__executeServer(opts));
var getStockBundle = createServerFn({ method: "POST" }).validator((input) => object({ symbol: string().min(1).max(32) }).parse(input)).handler(getStockBundle_createServerFn_handler, async ({ data }) => {
	return cached(`d:${data.symbol}`, 3e4, async () => {
		const [quotes, year] = await Promise.all([fetchQuotes([data.symbol]), fetchChart(data.symbol, "1Y").catch(() => null)]);
		const quote = quotes[0] ?? null;
		const rating = computeRating(year?.points.map((p) => p.close) ?? []);
		const known = BY_SYMBOL.get(data.symbol);
		const name = known?.name ?? quote?.name ?? data.symbol;
		return {
			quote,
			year,
			rating,
			news: await fetchCompanyNews(name).catch(() => []),
			profile: known ? {
				name: known.name,
				sector: known.sector,
				country: known.country,
				region: known.region
			} : quote ? {
				name: quote.name,
				sector: quote.sector ?? "—",
				country: quote.country ?? "—",
				region: quote.region ?? "US"
			} : null
		};
	});
});
var getAiBrief_createServerFn_handler = createServerRpc({
	id: "8a04a53e02dcd8466359e9649cf6cc59a684851af6b9466700eab32e9e8cb692",
	name: "getAiBrief",
	filename: "src/lib/market/functions.ts"
}, (opts) => getAiBrief.__executeServer(opts));
var getAiBrief = createServerFn({ method: "POST" }).validator((input) => object({ symbol: string().min(1).max(32) }).parse(input)).handler(getAiBrief_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI briefing is unavailable right now."
	};
	const [quotes, year] = await Promise.all([fetchQuotes([data.symbol]), fetchChart(data.symbol, "1Y").catch(() => null)]);
	const quote = quotes[0];
	if (!quote) return {
		ok: false,
		error: "Could not load this company."
	};
	const rating = computeRating(year?.points.map((p) => p.close) ?? []);
	const headlines = (await fetchCompanyNews(quote.name).catch(() => [])).slice(0, 5).map((n) => `- ${n.title} (${n.source})`).join("\n");
	const volPct = ((rating?.volatility ?? 0) * 100).toFixed(0);
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 380,
			temperature: .4,
			messages: [{
				role: "system",
				content: "You are a markets briefing writer for retail investors in India and globally. Be precise, calm, and non-promotional. Never present this as personalised financial advice. Use short paragraphs and 3-5 bullets max. Mention both supporting and cautionary signals."
			}, {
				role: "user",
				content: `Write a brief on ${quote.name} (${quote.symbol}).
Price: ${quote.price} ${quote.currency} (${quote.changePercent.toFixed(2)}% today)
52w: ${quote.fiftyTwoWeekLow} – ${quote.fiftyTwoWeekHigh}
Behaviour rating (from price history, 0-100): ${rating ? `${rating.score} ${rating.label}; 1M ${((rating.return1m ?? 0) * 100).toFixed(1)}%; 3M ${((rating.return3m ?? 0) * 100).toFixed(1)}%; 1Y ${((rating.return1y ?? 0) * 100).toFixed(1)}%; vol ${volPct}%` : "n/a"}
Recent headlines:
${headlines || "None available"}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "The briefing service is busy. Try again."
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Empty briefing."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { getAiBrief_createServerFn_handler, getAllIndices_createServerFn_handler, getChartFn_createServerFn_handler, getDealsFn_createServerFn_handler, getHomeIndices_createServerFn_handler, getMarketClocks_createServerFn_handler, getMovers_createServerFn_handler, getNewsFn_createServerFn_handler, getQuotesFn_createServerFn_handler, getStockBundle_createServerFn_handler, getUniverseQuotes_createServerFn_handler, searchSecurities_createServerFn_handler };
