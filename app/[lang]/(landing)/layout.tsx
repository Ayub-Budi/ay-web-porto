import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/landing/footer";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function LandingLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <section className="relative min-h-screen">
      <Navbar locale={lang} dict={dict.nav} />
      <main>{children}</main>
      <Footer dict={dict.footer} />
    </section>
  );
}
