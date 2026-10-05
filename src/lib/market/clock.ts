import type { MarketClock } from "./types";

function partsInZone(timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const bag: Record<string, string> = {};
  for (const p of fmt.formatToParts(new Date())) {
    if (p.type !== "literal") bag[p.type] = p.value;
  }
  return {
    weekday: bag.weekday ?? "",
    minutes: Number(bag.hour) * 60 + Number(bag.minute),
  };
}

function session(
  id: string,
  name: string,
  city: string,
  timeZone: string,
  openMin: number,
  closeMin: number,
): MarketClock {
  const { weekday, minutes } = partsInZone(timeZone);
  const weekend = weekday === "Sat" || weekday === "Sun";
  const open = !weekend && minutes >= openMin && minutes < closeMin;
  const hh = (n: number) =>
    `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
  return {
    id,
    name,
    city,
    open,
    note: weekend
      ? "Weekend"
      : open
        ? `Open · ${hh(closeMin)} close`
        : `Closed · ${hh(openMin)} open`,
  };
}

export function marketClocks(): MarketClock[] {
  return [
    session("IN", "India", "Mumbai", "Asia/Kolkata", 9 * 60 + 15, 15 * 60 + 30),
    session("US", "United States", "New York", "America/New_York", 9 * 60 + 30, 16 * 60),
    session("EU", "Europe", "London", "Europe/London", 8 * 60, 16 * 60 + 30),
    session("AS", "Asia", "Tokyo", "Asia/Tokyo", 9 * 60, 15 * 60),
  ];
}
