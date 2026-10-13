import { formatDistanceToNowStrict, isValid, parseISO } from "date-fns";

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";
  const absolute = Math.abs(value);
  if (absolute >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (absolute >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(date: string | Date): string {
  const parsed = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsed)) return "";
  return formatDistanceToNowStrict(parsed, { addSuffix: true });
}

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const remainder = totalSeconds % 60;
  const paddedSeconds = String(remainder).padStart(2, "0");
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, "0")}:${paddedSeconds}`;
  return `${minutes}:${paddedSeconds}`;
}
