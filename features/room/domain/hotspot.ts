import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { RoomContent } from "./room-content";

export type Vec3 = [number, number, number];

export interface CameraStop {
  position: Vec3;
  lookAt: Vec3;
  // Framing for portrait screens (phones), where the panel sits below the
  // object instead of beside it. Falls back to the landscape framing.
  portrait?: { position: Vec3; lookAt: Vec3 };
}

// One place in the room: an object to look at and the content it opens.
// Any hotspot can stand in for another; the scene only reads these fields.
// A label pinned to a point in the room, shown while its hotspot is active.
// With a target it doubles as a shortcut to that hotspot.
export interface Callout {
  id: string;
  anchor: Vec3;
  label: string;
  target?: string;
}

export interface HotspotDefinition {
  id: string;
  label: string;
  // "bare" puts the panel straight on the scene (used for the intro);
  // the default is a glass card.
  panelStyle?: "card" | "bare";
  callouts?: Callout[];
  // Consecutive hotspots sharing a section show as one entry in the nav
  // (e.g. one scroll step per job). Defaults to the hotspot's own id.
  section?: string;
  camera: CameraStop;
  // Null for steps that reuse an object rendered by an earlier step.
  model: ReactNode;
  panel: ReactNode;
}

export interface HotspotContext {
  content: RoomContent;
  dict: Dictionary;
  locale: Locale;
}

// Returns null when there is nothing to show yet (e.g. no projects),
// which keeps the object out of the room, or several steps for a section
// that is read one scroll at a time.
export type HotspotFactory = (
  ctx: HotspotContext,
) => HotspotDefinition | HotspotDefinition[] | null;
