import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";

// Picks the best supported language from Accept-Language ("id-ID,id;q=0.9,en;q=0.8").
function preferredLocale(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((entry) => hasLocale(entry.lang));
  return match && hasLocale(match.lang) ? match.lang : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasPrefix) return;

  const url = request.nextUrl.clone();
  const locale = preferredLocale(request.headers.get("accept-language"));
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the admin, API routes and any file with an extension.
  matcher: ["/((?!_next|admin|api|.*\\..*).*)"],
};
