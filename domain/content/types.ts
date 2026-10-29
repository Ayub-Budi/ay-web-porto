// Content as the site renders it: already resolved to one locale.

export interface Image {
  src: string;
  alt: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  headline: string;
  summary: string;
  bio: string;
  photo: Image;
  techStack: string[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
}

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "internship"
  | "freelance"
  | "teaching";

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyShort: string;
  employmentType: EmploymentType;
  // ISO dates (YYYY-MM-DD); endDate null means ongoing.
  startDate: string;
  endDate: string | null;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  description?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage: Image;
  techStack: string[];
  year: number;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export type ContactKind = "email" | "linkedin" | "github" | "instagram" | "other";

export interface ContactLink {
  id: string;
  kind: ContactKind;
  label: string;
  href: string;
  // Screenshot of the profile, shown on the phone in the room.
  preview?: Image;
}
