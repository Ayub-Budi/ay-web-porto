"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import ViewModeToggle from "@/features/room/ui/ViewModeToggle";

// Same path, other locale: /en -> /id.
const swapLocale = (pathname: string, to: Locale) =>
  pathname.replace(/^\/[^/]+/, `/${to}`);

// Name (back home), the 3D/2D switch on the home page, and the language.
// Other pages are reached from the calls to action in the content.
export default function Navbar({
  locale,
  dict,
}: Readonly<{ locale: Locale; dict: Dictionary["nav"] }>) {
  const pathname = usePathname();
  const other = locales.find((l) => l !== locale) ?? locale;
  const onHome = pathname === `/${locale}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-night/85 backdrop-blur">
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          aria-current={onHome ? "page" : undefined}
          className="font-extrabold tracking-tight whitespace-nowrap"
        >
          Ayub Budi Santoso
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          {onHome && (
            <ViewModeToggle
              labels={{ group: dict.modeLabel, "3d": dict.mode3d, "2d": dict.mode2d }}
            />
          )}
          <Link
            href={swapLocale(pathname, other)}
            hrefLang={other}
            lang={other}
            aria-label={`${dict.languageLabel}: ${dict.switchTo}`}
            className="rounded-sm border border-line px-2 py-1 text-sm text-fog uppercase transition-colors hover:text-ink hover:border-fog"
          >
            {other}
          </Link>
        </div>
      </nav>
    </header>
  );
}
