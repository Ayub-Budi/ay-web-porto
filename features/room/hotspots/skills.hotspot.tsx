import { portraitStop } from "../scene/camera-math";
import type { HotspotFactory } from "../domain/hotspot";
import { Bookshelf } from "../scene/lazy-models";
import Skill from "@/components/landing/skill";

export const skillsHotspot: HotspotFactory = ({ content, dict }) =>
  content.skills.length === 0
    ? null
    : {
        id: "skills",
        label: dict.sections.skills,
        camera: { position: [-0.6, 1.4, 1.4], lookAt: [-3.12, 0.95, 0.75], portrait: portraitStop([-2.82, 0.95, 0.2], [1, 0.12, 0.15], 3) },
        model: <Bookshelf />,
        panel: <Skill skills={content.skills} dict={dict.skills} />,
      };
