import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

// Canonical + hreflang links for a path that exists in every locale.
// `path` is locale-free, e.g. "" for home.
export function localeAlternates(
  locale: Locale,
  path: string,
): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
