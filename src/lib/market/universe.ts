import type { Region, Security } from "./types";

const IN: [string, string, string][] = [
  ["RELIANCE.NS", "Reliance Industries", "Energy"],
  ["TCS.NS", "Tata Consultancy Services", "Information Technology"],
  ["HDFCBANK.NS", "HDFC Bank", "Banking"],
  ["INFY.NS", "Infosys", "Information Technology"],
  ["ICICIBANK.NS", "ICICI Bank", "Banking"],
  ["HINDUNILVR.NS", "Hindustan Unilever", "FMCG"],
  ["ITC.NS", "ITC", "FMCG"],
  ["SBIN.NS", "State Bank of India", "Banking"],
  ["BHARTIARTL.NS", "Bharti Airtel", "Telecom"],
  ["BAJFINANCE.NS", "Bajaj Finance", "Financials"],
  ["KOTAKBANK.NS", "Kotak Mahindra Bank", "Banking"],
  ["LT.NS", "Larsen & Toubro", "Infrastructure"],
  ["HCLTECH.NS", "HCL Technologies", "Information Technology"],
  ["AXISBANK.NS", "Axis Bank", "Banking"],
  ["ASIANPAINT.NS", "Asian Paints", "Consumer"],
  ["MARUTI.NS", "Maruti Suzuki", "Automobile"],
  ["SUNPHARMA.NS", "Sun Pharmaceutical", "Pharma"],
  ["TITAN.NS", "Titan Company", "Consumer"],
  ["ULTRACEMCO.NS", "UltraTech Cement", "Materials"],
  ["WIPRO.NS", "Wipro", "Information Technology"],
  ["ADANIENT.NS", "Adani Enterprises", "Conglomerate"],
  ["ADANIPORTS.NS", "Adani Ports", "Infrastructure"],
  ["NTPC.NS", "NTPC", "Energy"],
  ["POWERGRID.NS", "Power Grid", "Energy"],
  ["ONGC.NS", "ONGC", "Energy"],
  ["COALINDIA.NS", "Coal India", "Energy"],
  ["TATASTEEL.NS", "Tata Steel", "Metals"],
  ["JSWSTEEL.NS", "JSW Steel", "Metals"],
  ["M&M.NS", "Mahindra & Mahindra", "Automobile"],
  ["NESTLEIND.NS", "Nestle India", "FMCG"],
  ["TATAMOTORS.NS", "Tata Motors", "Automobile"],
  ["TECHM.NS", "Tech Mahindra", "Information Technology"],
  ["BAJAJFINSV.NS", "Bajaj Finserv", "Financials"],
  ["HINDALCO.NS", "Hindalco", "Metals"],
  ["CIPLA.NS", "Cipla", "Pharma"],
  ["DRREDDY.NS", "Dr. Reddy's Laboratories", "Pharma"],
  ["EICHERMOT.NS", "Eicher Motors", "Automobile"],
  ["APOLLOHOSP.NS", "Apollo Hospitals", "Healthcare"],
  ["BRITANNIA.NS", "Britannia Industries", "FMCG"],
  ["BPCL.NS", "Bharat Petroleum", "Energy"],
  ["TATACONSUM.NS", "Tata Consumer", "FMCG"],
  ["DLF.NS", "DLF", "Real Estate"],
  ["ZOMATO.NS", "Eternal (Zomato)", "Consumer Internet"],
  ["BEL.NS", "Bharat Electronics", "Defence"],
  ["HAL.NS", "Hindustan Aeronautics", "Defence"],
  ["TRENT.NS", "Trent", "Retail"],
  ["SBILIFE.NS", "SBI Life Insurance", "Financials"],
  ["HDFCLIFE.NS", "HDFC Life", "Financials"],
  ["DIVISLAB.NS", "Divi's Laboratories", "Pharma"],
  ["BAJAJ-AUTO.NS", "Bajaj Auto", "Automobile"],
  ["VBL.NS", "Varun Beverages", "FMCG"],
  ["IRCTC.NS", "IRCTC", "Consumer"],
  ["LTIM.NS", "LTIMindtree", "Information Technology"],
  ["PERSISTENT.NS", "Persistent Systems", "Information Technology"],
  ["DIXON.NS", "Dixon Technologies", "Electronics"],
  ["POLYCAB.NS", "Polycab India", "Industrials"],
  ["INDHOTEL.NS", "Indian Hotels", "Hospitality"],
  ["PFC.NS", "Power Finance Corporation", "Financials"],
  ["RECLTD.NS", "REC", "Financials"],
  ["VEDL.NS", "Vedanta", "Metals"],
];

const US: [string, string, string][] = [
  ["AAPL", "Apple", "Technology"],
  ["MSFT", "Microsoft", "Technology"],
  ["GOOGL", "Alphabet", "Technology"],
  ["AMZN", "Amazon", "Consumer"],
  ["NVDA", "NVIDIA", "Semiconductors"],
  ["META", "Meta Platforms", "Technology"],
  ["TSLA", "Tesla", "Automobile"],
  ["BRK-B", "Berkshire Hathaway", "Financials"],
  ["JPM", "JPMorgan Chase", "Banking"],
  ["V", "Visa", "Financials"],
  ["UNH", "UnitedHealth", "Healthcare"],
  ["JNJ", "Johnson & Johnson", "Healthcare"],
  ["WMT", "Walmart", "Retail"],
  ["PG", "Procter & Gamble", "FMCG"],
  ["MA", "Mastercard", "Financials"],
  ["XOM", "Exxon Mobil", "Energy"],
  ["AVGO", "Broadcom", "Semiconductors"],
  ["ORCL", "Oracle", "Technology"],
  ["COST", "Costco", "Retail"],
  ["NFLX", "Netflix", "Media"],
  ["AMD", "AMD", "Semiconductors"],
  ["BAC", "Bank of America", "Banking"],
  ["KO", "Coca-Cola", "FMCG"],
  ["PEP", "PepsiCo", "FMCG"],
  ["CSCO", "Cisco", "Technology"],
  ["CRM", "Salesforce", "Technology"],
  ["DIS", "Walt Disney", "Media"],
  ["INTC", "Intel", "Semiconductors"],
  ["QCOM", "Qualcomm", "Semiconductors"],
  ["IBM", "IBM", "Technology"],
  ["GS", "Goldman Sachs", "Financials"],
  ["CAT", "Caterpillar", "Industrials"],
  ["GE", "GE Aerospace", "Industrials"],
  ["BA", "Boeing", "Industrials"],
  ["NKE", "Nike", "Consumer"],
  ["UBER", "Uber", "Consumer Internet"],
  ["PLTR", "Palantir", "Technology"],
  ["COIN", "Coinbase", "Financials"],
  ["ABNB", "Airbnb", "Consumer Internet"],
  ["AMD", "AMD", "Semiconductors"],
];

const EU: [string, string, string][] = [
  ["SAP.DE", "SAP", "Technology"],
  ["ASML.AS", "ASML", "Semiconductors"],
  ["NESN.SW", "Nestle", "FMCG"],
  ["MC.PA", "LVMH", "Consumer"],
  ["OR.PA", "L'Oreal", "Consumer"],
  ["SHEL.L", "Shell", "Energy"],
  ["AZN.L", "AstraZeneca", "Pharma"],
  ["BP.L", "BP", "Energy"],
  ["SIE.DE", "Siemens", "Industrials"],
  ["AIR.PA", "Airbus", "Industrials"],
  ["BMW.DE", "BMW", "Automobile"],
  ["NOVN.SW", "Novartis", "Pharma"],
  ["ROG.SW", "Roche", "Pharma"],
  ["HSBA.L", "HSBC", "Banking"],
  ["ULVR.L", "Unilever", "FMCG"],
  ["DTE.DE", "Deutsche Telekom", "Telecom"],
  ["SAN.PA", "Sanofi", "Pharma"],
  ["IBE.MC", "Iberdrola", "Energy"],
];

const AS: [string, string, string][] = [
  ["7203.T", "Toyota", "Automobile"],
  ["6758.T", "Sony", "Consumer"],
  ["9984.T", "SoftBank Group", "Conglomerate"],
  ["9988.HK", "Alibaba", "Consumer Internet"],
  ["0700.HK", "Tencent", "Technology"],
  ["005930.KS", "Samsung Electronics", "Semiconductors"],
  ["000660.KS", "SK Hynix", "Semiconductors"],
  ["TSM", "TSMC", "Semiconductors"],
  ["BABA", "Alibaba", "Consumer Internet"],
  ["SONY", "Sony", "Consumer"],
  ["TM", "Toyota", "Automobile"],
  ["HDB", "HDFC Bank (ADR)", "Banking"],
  ["IBN", "ICICI Bank (ADR)", "Banking"],
  ["INFY", "Infosys (ADR)", "Information Technology"],
];

function pack(
  rows: [string, string, string][],
  region: Region,
  country: string,
): Security[] {
  const seen = new Set<string>();
  const out: Security[] = [];
  for (const [symbol, name, sector] of rows) {
    if (seen.has(symbol)) continue;
    seen.add(symbol);
    out.push({ symbol, name, region, country, sector });
  }
  return out;
}

export const UNIVERSE: Security[] = [
  ...pack(IN, "IN", "India"),
  ...pack(US, "US", "United States"),
  ...pack(EU, "EU", "Europe"),
  ...pack(AS, "AS", "Asia"),
];

export const BY_SYMBOL = new Map(UNIVERSE.map((s) => [s.symbol, s]));

export const INDICES: Security[] = [
  { symbol: "^NSEI", name: "Nifty 50", region: "IN", country: "India", sector: "Index" },
  { symbol: "^BSESN", name: "Sensex", region: "IN", country: "India", sector: "Index" },
  { symbol: "^NSEBANK", name: "Bank Nifty", region: "IN", country: "India", sector: "Index" },
  { symbol: "^GSPC", name: "S&P 500", region: "US", country: "United States", sector: "Index" },
  { symbol: "^DJI", name: "Dow Jones", region: "US", country: "United States", sector: "Index" },
  { symbol: "^IXIC", name: "Nasdaq", region: "US", country: "United States", sector: "Index" },
  { symbol: "^FTSE", name: "FTSE 100", region: "EU", country: "United Kingdom", sector: "Index" },
  { symbol: "^GDAXI", name: "DAX", region: "EU", country: "Germany", sector: "Index" },
  { symbol: "^N225", name: "Nikkei 225", region: "AS", country: "Japan", sector: "Index" },
  { symbol: "^HSI", name: "Hang Seng", region: "AS", country: "Hong Kong", sector: "Index" },
  { symbol: "GC=F", name: "Gold", region: "GL", country: "Global", sector: "Commodity" },
  { symbol: "CL=F", name: "Crude Oil", region: "GL", country: "Global", sector: "Commodity" },
  { symbol: "BTC-USD", name: "Bitcoin", region: "GL", country: "Global", sector: "Crypto" },
  { symbol: "USDINR=X", name: "USD / INR", region: "IN", country: "India", sector: "FX" },
];

export const HOME_INDICES = [
  "^NSEI",
  "^BSESN",
  "^GSPC",
  "^IXIC",
  "^DJI",
  "^N225",
  "GC=F",
  "USDINR=X",
];

export const DEFAULT_WATCHLIST = [
  "RELIANCE.NS",
  "TCS.NS",
  "HDFCBANK.NS",
  "INFY.NS",
  "AAPL",
  "NVDA",
  "MSFT",
  "GOOGL",
];

export function regionOf(symbol: string): Region {
  const known = BY_SYMBOL.get(symbol) ?? INDICES.find((i) => i.symbol === symbol);
  if (known) return known.region;
  if (symbol.endsWith(".NS") || symbol.endsWith(".BO")) return "IN";
  if (/\.(DE|PA|AS|SW|L|MC)$/.test(symbol)) return "EU";
  if (/\.(T|HK|KS|TW)$/.test(symbol)) return "AS";
  return "US";
}

export function displayName(symbol: string, fallback?: string): string {
  return (
    BY_SYMBOL.get(symbol)?.name ??
    INDICES.find((i) => i.symbol === symbol)?.name ??
    fallback ??
    symbol
  );
}

export function universeByRegion(region: Region): Security[] {
  return UNIVERSE.filter((s) => s.region === region);
}

export const REGION_LABEL: Record<Region, string> = {
  IN: "India",
  US: "United States",
  EU: "Europe",
  AS: "Asia",
  GL: "Global",
};
