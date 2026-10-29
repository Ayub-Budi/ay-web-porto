import type { Locale } from "@/i18n/config";

// A value stored once per locale, as the CMS will hold it.
export type Localized<T> = Record<Locale, T>;

export const localize = <T>(value: Localized<T>, locale: Locale): T =>
  value[locale];
