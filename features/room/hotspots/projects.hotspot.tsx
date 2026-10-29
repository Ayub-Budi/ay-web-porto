import { portraitStop } from "../scene/camera-math";
import type { HotspotFactory } from "../domain/hotspot";
import { Laptop } from "../scene/lazy-models";
import ProjectsPanel from "../panels/ProjectsPanel";

export const projectsHotspot: HotspotFactory = ({ content, dict }) =>
  content.projects.length === 0
    ? null
    : {
        id: "projects",
        label: dict.sections.projects,
        camera: { position: [1.1, 1.3, -1.1], lookAt: [0.35, 0.86, -2.02], portrait: portraitStop([0.62, 0.88, -2.1], [-0.34, 0.45, 0.94], 0.9) },
        model: <Laptop />,
        panel: <ProjectsPanel projects={content.projects} dict={dict.projects} />,
      };
