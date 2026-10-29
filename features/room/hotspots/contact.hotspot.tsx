import { portraitStop } from "../scene/camera-math";
import type { HotspotFactory } from "../domain/hotspot";
import { Phone } from "../scene/lazy-models";
import ContactPanel from "../panels/ContactPanel";

// Close on the phone, square to its screen, so the profile on it reads.
export const contactHotspot: HotspotFactory = ({ content, dict }) => {
  const { contactLinks } = content;
  if (contactLinks.length === 0) return null;
  const preview = contactLinks.find((link) => link.preview)?.preview;
  return {
    id: "contact",
    label: dict.sections.contact,
    camera: { position: [0.533, 0.935, -1.687], lookAt: [0.597, 0.835, -1.994], portrait: portraitStop([0.665, 0.835, -1.961], [-0.413, 0.315, 0.855], 0.34) },
    model: <Phone screenSrc={preview?.src} />,
    panel: <ContactPanel links={contactLinks} dict={dict.contact} />,
  };
};
