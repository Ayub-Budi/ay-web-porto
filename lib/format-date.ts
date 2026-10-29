import { localeTags, type Locale } from "@/i18n/config";

const monthYear = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(localeTags[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

export const formatMonthYear = monthYear;

// "Feb 2024 – Jun 2024", "Sep 2024 – present", or a single month when
// start and end fall in the same one.
export function formatRange(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
) {
  const from = monthYear(start, locale);
  if (end === null) return `${from} – ${presentLabel}`;
  const to = monthYear(end, locale);
  return from === to ? from : `${from} – ${to}`;
}
