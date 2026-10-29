import { portraitStop } from "../scene/camera-math";
import type { HotspotFactory } from "../domain/hotspot";
import { Monitor } from "../scene/lazy-models";
import { buildPortfolioSource } from "../screens/portfolio-source";
import IntroPanel from "../panels/IntroPanel";

export const introHotspot: HotspotFactory = ({ content, dict, locale }) => {
  const callouts = [
    {
      id: "stack",
      anchor: [-0.38, 1.38, -2.47] as [number, number, number],
      label: content.profile.techStack.slice(0, 3).join(", "),
      target: "skills",
    },
    ...(content.experiences.length > 0
      ? [
          {
            id: "experience",
            anchor: [-0.12, 0.8, -1.98] as [number, number, number],
            label: dict.sections.experience,
            target: "experience",
          },
        ]
      : []),
    {
      id: "about",
      anchor: [-0.5, 1.04, -2.3] as [number, number, number],
      label: dict.sections.about,
      target: "about",
    },
  ];

  return {
    id: "intro",
    label: dict.sections.intro,
    panelStyle: "bare",
    callouts,
    camera: { position: [0.4, 1.38, -0.9], lookAt: [-0.39, 1.08, -2.36], portrait: portraitStop([0, 1.12, -2.46], [0.15, 0.25, 1], 2.3) },
    model: (
      <Monitor
        source={buildPortfolioSource({
          profile: content.profile,
          locale,
          comment: dict.room.codeComment,
        })}
        title="index.html — portfolio — Visual Studio Code"
      />
    ),
    panel: (
      <IntroPanel
        profile={content.profile}
        dict={dict.intro}
        scrollHint={dict.room.scrollHint}
      />
    ),
  };
};
