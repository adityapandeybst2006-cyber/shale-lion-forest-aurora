import type { ChartSeries, Quote, SearchHit } from "./types";
import { BY_SYMBOL, INDICES, regionOf } from "./universe";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const memory = new Map<string, { at: number; data: unknown }>();

export async function cached<T>(
  key: string,
  ttlMs: number,
  fn: () => Promise<T>,
): Promise<T> {
  const hit = memory.get(key);
  if (hit && Date.now() - hit.at < ttlMs) return hit.data as T;
  const data = await fn();
  memory.set(key, { at: Date.now(), data });
  return data;
}

async function yahoo<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Market feed unavailable (${res.status})`);
  return (await res.json()) as T;
}

type SparkMeta = {
  currency?: string;
  symbol?: string;
  shortName?: string;
  longName?: string;
  exchangeName?: string;
  instrumentType?: string;
  regularMarketPrice?: number;
  chartPreviousClose?: number;
  previousClose?: number;
  regularMarketChangePercent?: number;
  regularMarketVolume?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
};

type SparkPayload = {
  spark?: {
    result?: Array<{
      symbol: string;
      response?: Array<{
        meta?: SparkMeta;
        timestamp?: number[];
        indicators?: { quote?: Array<{ close?: Array<number | null> }> };
      }>;
    }>;
  };
};

function enrich(quote: Quote): Quote {
  const known =
    BY_SYMBOL.get(quote.symbol) ?? INDICES.find((i) => i.symbol === quote.symbol);
  return {
    ...quote,
    name: known?.name ?? quote.name,
    region: known?.region ?? regionOf(quote.symbol),
    sector: known?.sector ?? quote.sector,
    country: known?.country ?? quote.country,
  };
}

function fromMeta(
  symbol: string,
  meta: SparkMeta,
  spark: number[],
): Quote {
  const price = meta.regularMarketPrice ?? spark.at(-1) ?? 0;
  const previous = meta.chartPreviousClose ?? meta.previousClose ?? price;
  const change = price - previous;
  const changePercent =
    meta.regularMarketChangePercent ??
    (previous ? (change / previous) * 100 : 0);
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
    spark,
  });
}

function downsample(values: number[], max = 40): number[] {
  if (values.length <= max) return values;
  const out: number[] = [];
  const step = (values.length - 1) / (max - 1);
  for (let i = 0; i < max; i++) {
    out.push(values[Math.round(i * step)] ?? 0);
  }
  return out;
}

export async function fetchQuotes(
  symbols: string[],
  range = "1d",
  interval = "5m",
): Promise<Quote[]> {
  const unique = [...new Set(symbols.filter(Boolean))];
  if (!unique.length) return [];
  const batches: string[][] = [];
  for (let i = 0; i < unique.length; i += 18) {
    batches.push(unique.slice(i, i + 18));
  }
  const parts = await Promise.all(
    batches.map(async (batch) => {
      const encoded = batch.map(encodeURIComponent).join(",");
      const url = `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${encoded}&range=${range}&interval=${interval}`;
      try {
        const data = await yahoo<SparkPayload>(url);
        const rows: Quote[] = [];
        for (const item of data.spark?.result ?? []) {
          const res = item.response?.[0];
          const meta = res?.meta;
          if (!meta) continue;
          const closes = (res?.indicators?.quote?.[0]?.close ?? []).filter(
            (n): n is number => typeof n === "number" && Number.isFinite(n),
          );
          rows.push(fromMeta(item.symbol, meta, downsample(closes)));
        }
        return rows;
      } catch {
        return [] as Quote[];
      }
    }),
  );
  const map = new Map<string, Quote>();
  for (const row of parts.flat()) map.set(row.symbol, row);
  return unique.map((s) => map.get(s)).filter((q): q is Quote => Boolean(q));
}

type ChartPayload = {
  chart?: {
    result?: Array<{
      meta?: SparkMeta & { regularMarketPrice?: number };
      timestamp?: number[];
      indicators?: { quote?: Array<{ close?: Array<number | null> }> };
    }>;
    error?: unknown;
  };
};

export const RANGE_MAP: Record<string, { range: string; interval: string }> = {
  "1D": { range: "1d", interval: "5m" },
  "1W": { range: "5d", interval: "15m" },
  "1M": { range: "1mo", interval: "1d" },
  "3M": { range: "3mo", interval: "1d" },
  "1Y": { range: "1y", interval: "1d" },
  "5Y": { range: "5y", interval: "1wk" },
};

export async function fetchChart(
  symbol: string,
  rangeKey: string,
): Promise<ChartSeries> {
  const spec = RANGE_MAP[rangeKey] ?? RANGE_MAP["1Y"];
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol,
  )}?interval=${spec.interval}&range=${spec.range}`;
  const data = await yahoo<ChartPayload>(url);
  const res = data.chart?.result?.[0];
  if (!res) throw new Error("No chart data");
  const meta = res.meta ?? {};
  const ts = res.timestamp ?? [];
  const closes = res.indicators?.quote?.[0]?.close ?? [];
  const points = ts
    .map((t, i) => {
      const close = closes[i];
      if (typeof close !== "number" || !Number.isFinite(close)) return null;
      return { t: t * 1000, close };
    })
    .filter((p): p is { t: number; close: number } => Boolean(p));
  const price = meta.regularMarketPrice ?? points.at(-1)?.close ?? 0;
  const previous = meta.chartPreviousClose ?? meta.previousClose ?? price;
  return {
    symbol,
    name: meta.longName || meta.shortName || symbol,
    currency: meta.currency || "USD",
    points,
    previousClose: previous,
    price,
    changePercent: previous ? ((price - previous) / previous) * 100 : 0,
  };
}

type SearchPayload = {
  quotes?: Array<{
    symbol?: string;
    shortname?: string;
    longname?: string;
    quoteType?: string;
    exchDisp?: string;
    exchange?: string;
    sector?: string;
    typeDisp?: string;
  }>;
};

export async function fetchSearch(query: string): Promise<SearchHit[]> {
  const q = query.trim();
  if (q.length < 1) return [];
  const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(
    q,
  )}&quotesCount=18&newsCount=0&enableFuzzyQuery=false`;
  const data = await yahoo<SearchPayload>(url);
  const hits: SearchHit[] = [];
  const seen = new Set<string>();
  for (const row of data.quotes ?? []) {
    const symbol = row.symbol;
    if (!symbol || seen.has(symbol)) continue;
    const type = row.quoteType || row.typeDisp || "";
    if (type && !/equity|etf|index|cryptocurrency|ecb|mutualfund/i.test(type)) {
      continue;
    }
    seen.add(symbol);
    hits.push({
      symbol,
      name: row.longname || row.shortname || symbol,
      type: row.typeDisp || row.quoteType || "Equity",
      exchange: row.exchDisp || row.exchange || "",
      region: regionOf(symbol),
      sector: row.sector,
    });
  }
  return hits;
}
