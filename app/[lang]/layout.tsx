import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Overpass } from "next/font/google";
import "../globals.css";
import "remixicon/fonts/remixicon.css";
import { hasLocale, localeTags, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteName, siteUrl } from "@/lib/site";

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    authors: [{ name: siteName }],
    openGraph: {
      siteName,
      locale: localeTags[lang].replace("-", "_"),
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang}>
      <body className={`${overpass.variable} antialiased`}>{children}</body>
    </html>
  );
}
