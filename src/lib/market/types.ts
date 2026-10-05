export type Region = "IN" | "US" | "EU" | "AS" | "GL";

export type Quote = {
  symbol: string;
  name: string;
  shortName: string;
  currency: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  dayHigh: number | null;
  dayLow: number | null;
  volume: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  exchange: string;
  instrument: string;
  spark: number[];
  region?: Region;
  sector?: string;
  country?: string;
};

export type ChartPoint = {
  t: number;
  close: number;
};

export type ChartSeries = {
  symbol: string;
  name: string;
  currency: string;
  points: ChartPoint[];
  previousClose: number;
  price: number;
  changePercent: number;
};

export type SearchHit = {
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  region?: Region;
  sector?: string;
};

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  topic: string;
};

export type Deal = NewsItem & {
  kind: "block" | "bulk" | "merger" | "buyback" | "ipo" | "insider" | "other";
};

export type RatingLabel =
  | "Strong buy"
  | "Accumulate"
  | "Hold"
  | "Reduce"
  | "Caution";

export type Rating = {
  score: number;
  label: RatingLabel;
  momentum: number;
  trend: number;
  stability: number;
  resilience: number;
  return1m: number | null;
  return3m: number | null;
  return1y: number | null;
  volatility: number | null;
  maxDrawdown: number | null;
  vsHigh: number | null;
  sample: number;
};

export type MarketClock = {
  id: string;
  name: string;
  city: string;
  open: boolean;
  note: string;
};

export type Security = {
  symbol: string;
  name: string;
  region: Region;
  country: string;
  sector: string;
};
