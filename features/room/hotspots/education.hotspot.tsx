import { portraitStop } from "../scene/camera-math";
import type { HotspotFactory } from "../domain/hotspot";
import { DiplomaFrame } from "../scene/lazy-models";
import EducationPanel from "../panels/EducationPanel";

export const educationHotspot: HotspotFactory = ({ content, dict, locale }) =>
  content.education.length === 0
    ? null
    : {
        id: "education",
        label: dict.sections.education,
        camera: { position: [-1.3, 1.6, -1.2], lookAt: [-3.25, 1.65, -1.88], portrait: portraitStop([-2.97, 1.7, -2.3], [1, 0.1, 0], 1.6) },
        model: <DiplomaFrame />,
        panel: (
          <EducationPanel
            education={content.education}
            dict={dict.education}
            locale={locale}
          />
        ),
      };
