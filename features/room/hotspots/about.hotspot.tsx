import { portraitStop } from "../scene/camera-math";
import type { HotspotFactory } from "../domain/hotspot";
import { PhotoFrame } from "../scene/lazy-models";
import AboutPanel from "../panels/AboutPanel";

export const aboutHotspot: HotspotFactory = ({ content, dict }) => ({
  id: "about",
  label: dict.sections.about,
  camera: { position: [-0.15, 1.2, -1.4], lookAt: [-0.73, 0.85, -2.21], portrait: portraitStop([-0.5, 0.89, -2.3], [0.3, 0.35, 1], 0.85) },
  model: <PhotoFrame src={content.profile.photo.src} />,
  panel: <AboutPanel profile={content.profile} dict={dict.about} />,
});
