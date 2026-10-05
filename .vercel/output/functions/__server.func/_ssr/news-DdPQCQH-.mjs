//#region node_modules/.nitro/vite/services/ssr/assets/news-DdPQCQH-.js
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
function decodeXml(value) {
	return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, "\"").replace(/&#39;/g, "'").replace(/'/g, "'").trim();
}
function tag(block, name) {
	const cdata = block.match(new RegExp(`<${name}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${name}>`, "i"));
	if (cdata?.[1]) return decodeXml(cdata[1]);
	const plain = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"));
	return plain?.[1] ? decodeXml(plain[1]) : "";
}
function parseRss(xml, topic) {
	return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((m, i) => {
		const block = m[1] ?? "";
		const rawTitle = tag(block, "title");
		let source = tag(block, "source");
		let title = rawTitle;
		if (!source && title.includes(" - ")) {
			const idx = title.lastIndexOf(" - ");
			source = title.slice(idx + 3);
			title = title.slice(0, idx);
		}
		const url = tag(block, "link") || tag(block, "guid");
		const publishedAt = tag(block, "pubDate");
		const iso = publishedAt ? new Date(publishedAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
		return {
			id: `${topic}-${i}-${url.slice(0, 48)}`,
			title: title || rawTitle,
			source: source || "News",
			url,
			publishedAt: iso,
			topic
		};
	});
}
async function rss(query, locale, topic) {
	const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&${locale === "IN" ? "hl=en-IN&gl=IN&ceid=IN:en" : "hl=en-US&gl=US&ceid=US:en"}`;
	const res = await fetch(url, { headers: {
		"User-Agent": UA,
		Accept: "application/rss+xml, application/xml, text/xml"
	} });
	if (!res.ok) return [];
	return parseRss(await res.text(), topic).filter((n) => n.title && n.url);
}
function uniqueNews(items, limit) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const item of items) {
		const key = item.title.toLowerCase().slice(0, 80);
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(item);
		if (out.length >= limit) break;
	}
	return out;
}
async function fetchMarketNews(tab, extra) {
	if (tab === "india") {
		const [a, b] = await Promise.all([rss("Nifty Sensex stock market", "IN", "India"), rss("BSE NSE shares news", "IN", "India")]);
		return uniqueNews([...a, ...b], 24);
	}
	if (tab === "watchlist" && extra?.length) {
		const q = extra.slice(0, 6).join(" OR ");
		const [inNews, usNews] = await Promise.all([rss(`${q} stock`, "IN", "Watchlist"), rss(`${q} stock`, "US", "Watchlist")]);
		return uniqueNews([...inNews, ...usNews], 20);
	}
	const [us, eu, as] = await Promise.all([
		rss("stock market S&P Nasdaq earnings", "US", "Global"),
		rss("European stock market DAX FTSE", "US", "Europe"),
		rss("Asia stock market Nikkei Hang Seng", "US", "Asia")
	]);
	return uniqueNews([
		...us,
		...eu,
		...as
	], 24);
}
async function fetchCompanyNews(name) {
	const [inNews, usNews] = await Promise.all([rss(`${name} shares OR stock`, "IN", name), rss(`${name} stock OR shares`, "US", name)]);
	return uniqueNews([...inNews, ...usNews], 12);
}
function classify(title) {
	const t = title.toLowerCase();
	if (/\bblock deal\b/.test(t)) return "block";
	if (/\bbulk deal\b/.test(t)) return "bulk";
	if (/\binsider\b|\bpromoter\b/.test(t)) return "insider";
	if (/\bbuyback\b/.test(t)) return "buyback";
	if (/\bipo\b|\bfpo\b|\boffer for sale\b/.test(t)) return "ipo";
	if (/\bmerger\b|\bacqui|\btakeover\b|\bdeal to buy\b/.test(t)) return "merger";
	return "other";
}
async function fetchDeals() {
	const [a, b, c] = await Promise.all([
		rss("block deal OR bulk deal NSE BSE", "IN", "Deals"),
		rss("merger acquisition buyback stock India", "IN", "Deals"),
		rss("merger acquisition stock deal buyback", "US", "Deals")
	]);
	return uniqueNews([
		...a,
		...b,
		...c
	], 28).map((n) => ({
		...n,
		kind: classify(n.title)
	}));
}
var DEAL_LABEL = {
	block: "Block deal",
	bulk: "Bulk deal",
	merger: "M&A",
	buyback: "Buyback",
	ipo: "IPO",
	insider: "Insider",
	other: "Market deal"
};
//#endregion
export { fetchMarketNews as i, fetchCompanyNews as n, fetchDeals as r, DEAL_LABEL as t };
