import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { computeRating } from "./rating";
import { fetchCompanyNews, fetchDeals, fetchMarketNews } from "./news";
import { marketClocks } from "./clock";
import { BY_SYMBOL, HOME_INDICES, INDICES, universeByRegion } from "./universe";
import { cached, fetchChart, fetchQuotes, fetchSearch, RANGE_MAP } from "./yahoo";
import type { Quote, Region } from "./types";

const symbolList = z.object({
  symbols: z.array(z.string().min(1).max(32)).max(40),
});

export const getMarketClocks = createServerFn({ method: "GET" }).handler(
  async () => marketClocks(),
);

export const getQuotesFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => symbolList.parse(input))
  .handler(async ({ data }) => {
    const key = `q:${data.symbols.slice().sort().join(",")}`;
    return cached(key, 20_000, () => fetchQuotes(data.symbols));
  });

export const getHomeIndices = createServerFn({ method: "GET" }).handler(async () => {
  return cached("home-indices", 20_000, () => fetchQuotes(HOME_INDICES));
});

export const getAllIndices = createServerFn({ method: "GET" }).handler(async () => {
  return cached("all-indices", 30_000, () =>
    fetchQuotes(INDICES.map((i) => i.symbol)),
  );
});

function rankMovers(quotes: Quote[]) {
  const tradable = quotes.filter(
    (q) => q.instrument !== "INDEX" && Number.isFinite(q.changePercent),
  );
  const gainers = [...tradable]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 8);
  const losers = [...tradable]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 8);
  return { gainers, losers };
}

export const getMovers = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        region: z.enum(["IN", "US", "EU", "AS", "ALL"]).default("ALL"),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const pool =
      data.region === "ALL"
        ? [
            ...universeByRegion("IN").slice(0, 28).map((s) => s.symbol),
            ...universeByRegion("US").slice(0, 22).map((s) => s.symbol),
          ]
        : universeByRegion(data.region as Region).map((s) => s.symbol);
    return cached(`movers:${data.region}`, 45_000, async () => {
      const quotes = await fetchQuotes(pool);
      return rankMovers(quotes);
    });
  });

export const getUniverseQuotes = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        region: z.enum(["IN", "US", "EU", "AS"]),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const symbols = universeByRegion(data.region).map((s) => s.symbol);
    return cached(`uni:${data.region}`, 30_000, () => fetchQuotes(symbols));
  });

export const searchSecurities = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ q: z.string().min(1).max(80) }).parse(input),
  )
  .handler(async ({ data }) => {
    return cached(`s:${data.q.toLowerCase()}`, 60_000, () => fetchSearch(data.q));
  });

export const getChartFn = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        symbol: z.string().min(1).max(32),
        range: z.string().default("1Y"),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const range = data.range in RANGE_MAP ? data.range : "1Y";
    return cached(`c:${data.symbol}:${range}`, 45_000, () =>
      fetchChart(data.symbol, range),
    );
  });

export const getNewsFn = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        tab: z.enum(["india", "global", "watchlist"]).default("india"),
        names: z.array(z.string()).max(8).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const key = `n:${data.tab}:${(data.names ?? []).join(",")}`;
    return cached(key, 120_000, () => fetchMarketNews(data.tab, data.names));
  });

export const getDealsFn = createServerFn({ method: "GET" }).handler(async () => {
  return cached("deals", 120_000, () => fetchDeals());
});

export const getStockBundle = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ symbol: z.string().min(1).max(32) }).parse(input),
  )
  .handler(async ({ data }) => {
    return cached(`d:${data.symbol}`, 30_000, async () => {
      const known = BY_SYMBOL.get(data.symbol);
      const nameGuess = known?.name ?? data.symbol;
      const [quotes, year, news] = await Promise.all([
        fetchQuotes([data.symbol]),
        fetchChart(data.symbol, "1Y").catch(() => null),
        fetchCompanyNews(nameGuess).catch(() => []),
      ]);
      const quote = quotes[0] ?? null;
      const closes = year?.points.map((p) => p.close) ?? [];
      const rating = computeRating(closes);
      return {
        quote,
        year,
        rating,
        news,
        profile: known
          ? {
              name: known.name,
              sector: known.sector,
              country: known.country,
              region: known.region,
            }
          : quote
            ? {
                name: quote.name,
                sector: quote.sector ?? "—",
                country: quote.country ?? "—",
                region: quote.region ?? "US",
              }
            : null,
      };
    });
  });

export const getAiBrief = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ symbol: z.string().min(1).max(32) }).parse(input),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI briefing is unavailable right now." };
    }
    const [quotes, year] = await Promise.all([
      fetchQuotes([data.symbol]),
      fetchChart(data.symbol, "1Y").catch(() => null),
    ]);
    const quote = quotes[0];
    if (!quote) return { ok: false as const, error: "Could not load this company." };
    const closes = year?.points.map((p) => p.close) ?? [];
    const rating = computeRating(closes);
    const news = await fetchCompanyNews(quote.name).catch(() => []);
    const headlines = news
      .slice(0, 5)
      .map((n) => `- ${n.title} (${n.source})`)
      .join("\n");
    const volPct = ((rating?.volatility ?? 0) * 100).toFixed(0);
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 380,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "You are a markets briefing writer for retail investors in India and globally. Be precise, calm, and non-promotional. Never present this as personalised financial advice. Use short paragraphs and 3-5 bullets max. Mention both supporting and cautionary signals.",
          },
          {
            role: "user",
            content: `Write a brief on ${quote.name} (${quote.symbol}).
Price: ${quote.price} ${quote.currency} (${quote.changePercent.toFixed(2)}% today)
52w: ${quote.fiftyTwoWeekLow} – ${quote.fiftyTwoWeekHigh}
Behaviour rating (from price history, 0-100): ${
              rating
                ? `${rating.score} ${rating.label}; 1M ${((rating.return1m ?? 0) * 100).toFixed(1)}%; 3M ${((rating.return3m ?? 0) * 100).toFixed(1)}%; 1Y ${((rating.return1y ?? 0) * 100).toFixed(1)}%; vol ${volPct}%`
                : "n/a"
            }
Recent headlines:
${headlines || "None available"}`,
          },
        ],
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: "The briefing service is busy. Try again." };
    }
    const body = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "Empty briefing." };
    return { ok: true as const, text };
  });
