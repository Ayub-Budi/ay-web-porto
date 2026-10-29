import type { HotspotDefinition, HotspotFactory } from "../domain/hotspot";
import { RouteBoard } from "../scene/lazy-models";
import { BOARD, stopWorldX } from "../scene/board-layout";
import { portraitStop } from "../scene/camera-math";
import type { RouteBoardData } from "../screens/draw-route-board";
import ExperienceStepPanel from "../panels/ExperienceStepPanel";
import { formatMonthYear, formatRange } from "@/lib/format-date";

// One scroll step per job. The camera faces the board head-on (so the text
// reads), sits left of it so the board clears the card, and drifts a little
// toward the active stop.
export const experienceHotspot: HotspotFactory = ({ content, dict, locale }) => {
  const { experiences } = content;
  const total = experiences.length;
  if (total === 0) return null;

  const stepIds = experiences.map((experience, i) =>
    i === 0 ? "experience" : `experience-${experience.id}`,
  );
  const first = experiences[0];
  const last = experiences[total - 1];
  const board: RouteBoardData = {
    title: dict.experience.title,
    span: formatRange(first.startDate, last.endDate, locale, dict.experience.present),
    hint: dict.experience.boardHint,
    stops: experiences.map((experience) => ({
      date: formatMonthYear(experience.startDate, locale),
      name: experience.companyShort,
      title: experience.title,
      detail: `${experience.company}, ${formatRange(
        experience.startDate,
        experience.endDate,
        locale,
        dict.experience.present,
      )}`,
    })),
  };

  return experiences.map((experience, i): HotspotDefinition => {
    const x = BOARD.center[0] - 0.88 +(stopWorldX(i, total) - BOARD.center[0]) * 0.15;
    return {
      id: stepIds[i],
      section: "experience",
      label: dict.sections.experience,
      camera: {
        position: [x, 1.65, -0.75],
        lookAt: [x, 1.67, BOARD.center[2]],
        // Phones see only part of the board, so follow the active stop.
        portrait: portraitStop(
          [
            BOARD.center[0] + (stopWorldX(i, total) - BOARD.center[0]) * 0.6,
            BOARD.center[1] - 0.08,
            BOARD.center[2],
          ],
          [0, 0, 1],
          2.4,
        ),
      },
      model: i === 0 ? <RouteBoard data={board} stepIds={stepIds} /> : null,
      panel: (
        <ExperienceStepPanel
          experience={experience}
          index={i}
          total={total}
          dict={dict.experience}
          locale={locale}
        />
      ),
    };
  });
};
