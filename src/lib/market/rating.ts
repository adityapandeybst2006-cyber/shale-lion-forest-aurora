import type { Rating, RatingLabel } from "./types";

function lastN(values: number[], n: number): number[] {
  return n >= values.length ? values.slice() : values.slice(values.length - n);
}

function mean(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function returns(closes: number[]): number[] {
  const out: number[] = [];
  for (let i = 1; i < closes.length; i++) {
    const prev = closes[i - 1];
    const cur = closes[i];
    if (prev > 0 && Number.isFinite(cur)) out.push(cur / prev - 1);
  }
  return out;
}

function periodReturn(closes: number[], days: number): number | null {
  if (closes.length < 3) return null;
  const window = lastN(closes, days + 1);
  const first = window[0];
  const last = window[window.length - 1];
  if (!(first > 0)) return null;
  return last / first - 1;
}

function sma(closes: number[], n: number): number | null {
  if (closes.length < n) return mean(closes);
  return mean(lastN(closes, n));
}

function stdev(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  const v = mean(values.map((x) => (x - m) ** 2));
  return Math.sqrt(v);
}

function maxDrawdown(closes: number[]): number {
  let peak = closes[0] ?? 0;
  let dd = 0;
  for (const c of closes) {
    if (c > peak) peak = c;
    if (peak > 0) dd = Math.max(dd, 1 - c / peak);
  }
  return dd;
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, n));
}

function labelFor(score: number): RatingLabel {
  if (score >= 78) return "Strong buy";
  if (score >= 62) return "Accumulate";
  if (score >= 45) return "Hold";
  if (score >= 30) return "Reduce";
  return "Caution";
}

export function computeRating(closes: number[]): Rating | null {
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

  const wret =
    (r1m ?? 0) * 0.4 + (r3m ?? 0) * 0.3 + (r1y ?? 0) * 0.3;
  const momentum = clamp(50 + wret * 180);

  let trend = 48;
  if (sma50 != null && last > sma50) trend += 16;
  if (sma200 != null && last > sma200) trend += 18;
  if (sma50 != null && sma200 != null && sma50 > sma200) trend += 14;
  if (r1m != null && r1m > 0 && r3m != null && r3m > 0) trend += 4;
  trend = clamp(trend);

  const stability = vol == null ? 50 : clamp(100 - vol * 220);
  const resilience = clamp(100 - mdd * 140);

  const score = clamp(
    momentum * 0.35 + trend * 0.3 + stability * 0.2 + resilience * 0.15,
  );

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
    sample: series.length,
  };
}
