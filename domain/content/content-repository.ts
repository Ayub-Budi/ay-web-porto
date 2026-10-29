import type { Locale } from "@/i18n/config";
import type {
  ContactLink,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "./types";

// Read side used by public pages. The write side (ContentWriter) arrives
// with the CMS in phase 6 and stays out of public code.
export interface ContentReader {
  getProfile(locale: Locale): Promise<Profile>;
  getSkills(locale: Locale): Promise<Skill[]>;
  // Oldest first, so the route map reads left to right.
  getExperiences(locale: Locale): Promise<Experience[]>;
  getEducation(locale: Locale): Promise<Education[]>;
  getProjects(locale: Locale, opts?: { featured?: boolean }): Promise<Project[]>;
  getProjectBySlug(locale: Locale, slug: string): Promise<Project | null>;
  getContactLinks(locale: Locale): Promise<ContactLink[]>;
}
