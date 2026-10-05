import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatPrice } from "@/lib/format";
import type { ChartSeries } from "@/lib/market/types";

const RANGES = ["1D", "1W", "1M", "3M", "1Y", "5Y"] as const;

export function RangePills({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-1 rounded-xl bg-surface-2 p-1">
      {RANGES.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => onChange(r)}
          className={
            value === r
              ? "h-8 min-w-10 rounded-lg bg-surface px-2.5 text-xs font-medium text-fg shadow-[var(--shadow-border)]"
              : "h-8 min-w-10 rounded-lg px-2.5 text-xs font-medium text-muted"
          }
        >
          {r}
        </button>
      ))}
    </div>
  );
}

export function StockChart({
  series,
  range,
}: {
  series: ChartSeries;
  range: string;
}) {
  const data = useMemo(
    () => series.points.map((p) => ({ t: p.t, close: p.close })),
    [series.points],
  );
  const up = (data.at(-1)?.close ?? 0) >= (data[0]?.close ?? 0);
  const stroke = up ? "var(--color-up)" : "var(--color-down)";
  const fillId = up ? "upFill" : "downFill";

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="upFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-up)" stopOpacity={0.22} />
              <stop offset="100%" stopColor="var(--color-up)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="downFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-down)" stopOpacity={0.22} />
              <stop offset="100%" stopColor="var(--color-down)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="t" hide />
          <YAxis domain={["auto", "auto"]} hide />
          <Tooltip
            cursor={{ stroke: "var(--color-border)" }}
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const row = payload[0].payload as { t: number; close: number };
              const d = new Date(row.t);
              const label =
                range === "1D"
                  ? d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
                  : d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
              return (
                <div className="rounded-md bg-surface-2 px-2.5 py-1.5 text-xs shadow-[var(--shadow-border)]">
                  <div className="text-muted">{label}</div>
                  <div className="tabular font-medium text-fg">
                    {formatPrice(row.close, series.currency)}
                  </div>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="close"
            stroke={stroke}
            strokeWidth={1.8}
            fill={`url(#${fillId})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
