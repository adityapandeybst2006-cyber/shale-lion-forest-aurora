const COMPACT: Intl.NumberFormatOptions = {
  notation: "compact",
  maximumFractionDigits: 2,
};

export function formatPrice(value: number, currency?: string): string {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const digits = abs >= 1000 ? 2 : abs >= 100 ? 2 : abs >= 1 ? 2 : 4;
  try {
    if (currency) {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: digits,
        minimumFractionDigits: digits > 2 ? 4 : 2,
      }).format(value);
    }
  } catch {
    /* unknown currency code */
  }
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: digits,
    minimumFractionDigits: Math.min(2, digits),
  });
}

export function formatNumber(value: number | null | undefined, digits = 2): string {
  if (value == null || !Number.isFinite(value)) return "—";
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}

export function formatCompact(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value) || value === 0) return "—";
  return new Intl.NumberFormat("en-IN", COMPACT).format(value);
}

export function formatPercent(value: number | null | undefined, digits = 2): string {
  if (value == null || !Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function signedClass(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value) || value === 0) return "text-muted";
  return value > 0 ? "text-up" : "text-down";
}

export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const diff = Date.now() - then;
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 7) return `${day}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export function marketDateLabel(now = new Date()): string {
  return now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}
