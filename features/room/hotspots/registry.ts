import type {
  HotspotContext,
  HotspotDefinition,
  HotspotFactory,
} from "../domain/hotspot";
import { introHotspot } from "./intro.hotspot";
import { aboutHotspot } from "./about.hotspot";
import { skillsHotspot } from "./skills.hotspot";
import { experienceHotspot } from "./experience.hotspot";
import { iotHotspot } from "./iot.hotspot";
import { educationHotspot } from "./education.hotspot";
import { projectsHotspot } from "./projects.hotspot";
import { contactHotspot } from "./contact.hotspot";

// The camera path through the room, in order. Adding a place to the room
// means adding a factory here; the scene, camera and nav read this list.
const factories: HotspotFactory[] = [
  introHotspot,
  aboutHotspot,
  skillsHotspot,
  experienceHotspot,
  iotHotspot,
  educationHotspot,
  projectsHotspot,
  contactHotspot,
];

export const buildHotspots = (ctx: HotspotContext): HotspotDefinition[] =>
  factories.flatMap((create) => create(ctx) ?? []);
