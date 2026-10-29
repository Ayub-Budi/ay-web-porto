import type { Localized } from "@/domain/content/localized";
import type { ContactKind } from "@/domain/content/types";

// Education and projects are filled in through the CMS (phase 6).
// While these lists are empty, the matching room objects stay hidden.

export const educationSeed: {
  id: string;
  institution: string;
  degree: Localized<string>;
  field: Localized<string>;
  startDate: string;
  endDate: string | null;
  description?: Localized<string>;
}[] = [];

export const projectsSeed: {
  id: string;
  slug: string;
  title: Localized<string>;
  summary: Localized<string>;
  coverImage: { src: string; alt: Localized<string> };
  techStack: string[];
  year: number;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}[] = [];

export const contactSeed: {
  id: string;
  kind: ContactKind;
  label: Localized<string>;
  href: string;
  preview?: { src: string; alt: Localized<string> };
}[] = [
  {
    id: "linkedin",
    kind: "linkedin",
    label: { en: "LinkedIn", id: "LinkedIn" },
    href: "https://www.linkedin.com/in/ayub09/",
  },
  {
    id: "instagram",
    kind: "instagram",
    label: { en: "Instagram", id: "Instagram" },
    href: "https://www.instagram.com/ayub_budi213/",
    preview: {
      src: "/room/instagram-profile.webp",
      alt: {
        en: "Instagram profile of ayub_budi213",
        id: "Profil Instagram ayub_budi213",
      },
    },
  },
];
