import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { contentReader } from "@/infrastructure/content";
import { localeAlternates } from "@/lib/alternates";
import RoomExperience from "@/features/room/ui/RoomExperience";
import PersonJsonLd from "@/components/seo/PersonJsonLd";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { alternates: localeAlternates(lang, "") };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const [dict, profile, skills, experiences, education, projects, contactLinks] =
    await Promise.all([
      getDictionary(lang),
      contentReader.getProfile(lang),
      contentReader.getSkills(lang),
      contentReader.getExperiences(lang),
      contentReader.getEducation(lang),
      contentReader.getProjects(lang, { featured: true }),
      contentReader.getContactLinks(lang),
    ]);

  return (
    <>
      <PersonJsonLd
        profile={profile}
        experiences={experiences}
        contactLinks={contactLinks}
      />
      <RoomExperience
        content={{ profile, skills, experiences, education, projects, contactLinks }}
        dict={dict}
        locale={lang}
      />
    </>
  );
}
