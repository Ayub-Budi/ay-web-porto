export const locales = ["en", "id"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// BCP 47 tags for Intl formatting and Open Graph.
export const localeTags: Record<Locale, string> = {
  en: "en-US",
  id: "id-ID",
};
