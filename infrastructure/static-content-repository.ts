import type { Locale } from "@/i18n/config";
import type { ContentReader } from "@/domain/content/content-repository";
import { localize } from "@/domain/content/localized";
import type {
  ContactLink,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/domain/content/types";
import { profileSeed } from "@/content/seed/profile";
import { skillsSeed } from "@/content/seed/skills";
import { experiencesSeed } from "@/content/seed/experiences";
import {
  contactSeed,
  educationSeed,
  projectsSeed,
} from "@/content/seed/collections";

const byStartDate = (a: { startDate: string }, b: { startDate: string }) =>
  a.startDate.localeCompare(b.startDate);

// Reads the seed files. Used until the database exists, and in tests.
export class StaticContentRepository implements ContentReader {
  async getProfile(locale: Locale): Promise<Profile> {
    return {
      name: profileSeed.name,
      role: localize(profileSeed.role, locale),
      location: profileSeed.location,
      headline: localize(profileSeed.headline, locale),
      summary: localize(profileSeed.summary, locale),
      bio: localize(profileSeed.bio, locale),
      photo: {
        src: profileSeed.photo.src,
        alt: localize(profileSeed.photo.alt, locale),
      },
      techStack: profileSeed.techStack,
    };
  }

  async getSkills(locale: Locale): Promise<Skill[]> {
    return skillsSeed.map((skill) => ({
      id: skill.id,
      name: localize(skill.name, locale),
      description: localize(skill.description, locale),
    }));
  }

  async getExperiences(locale: Locale): Promise<Experience[]> {
    return [...experiencesSeed].sort(byStartDate).map((experience) => ({
      ...experience,
      title: localize(experience.title, locale),
      highlights: localize(experience.highlights, locale),
    }));
  }

  async getEducation(locale: Locale): Promise<Education[]> {
    return [...educationSeed].sort(byStartDate).map((education) => ({
      ...education,
      degree: localize(education.degree, locale),
      field: localize(education.field, locale),
      description: education.description
        ? localize(education.description, locale)
        : undefined,
    }));
  }

  async getProjects(
    locale: Locale,
    opts: { featured?: boolean } = {},
  ): Promise<Project[]> {
    return projectsSeed
      .filter((project) => !opts.featured || project.featured)
      .map((project) => ({
        ...project,
        title: localize(project.title, locale),
        summary: localize(project.summary, locale),
        coverImage: {
          src: project.coverImage.src,
          alt: localize(project.coverImage.alt, locale),
        },
      }));
  }

  async getProjectBySlug(locale: Locale, slug: string): Promise<Project | null> {
    const projects = await this.getProjects(locale);
    return projects.find((project) => project.slug === slug) ?? null;
  }

  async getContactLinks(locale: Locale): Promise<ContactLink[]> {
    return contactSeed.map((link) => ({
      ...link,
      label: localize(link.label, locale),
      preview: link.preview
        ? { src: link.preview.src, alt: localize(link.preview.alt, locale) }
        : undefined,
    }));
  }
}
