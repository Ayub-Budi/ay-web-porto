import type {
  ContactLink,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/domain/content/types";

// Everything the room needs, fetched on the server and passed down as props.
export interface RoomContent {
  profile: Profile;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  contactLinks: ContactLink[];
}
