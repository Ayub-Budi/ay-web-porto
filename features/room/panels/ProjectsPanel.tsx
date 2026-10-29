import Image from "next/image";
import type { Project } from "@/domain/content/types";
import type { Dictionary } from "@/i18n/get-dictionary";
import TextTitle from "@/components/landing/text/title";

export default function ProjectsPanel({
  projects,
  dict,
}: Readonly<{ projects: Project[]; dict: Dictionary["projects"] }>) {
  return (
    <div className="flex flex-col gap-6">
      <TextTitle title={dict.title} description={dict.description} />
      <ul className="flex flex-col gap-6">
        {projects.map((project) => (
          <li key={project.id} className="flex flex-col gap-3">
            <div className="relative aspect-video overflow-hidden rounded-sm bg-panel">
              <Image
                src={project.coverImage.src}
                alt={project.coverImage.alt}
                fill
                sizes="(min-width: 768px) 440px, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold">
              {project.title} <span className="text-fog font-normal">{project.year}</span>
            </h3>
            <p className="text-fog max-w-[60ch]">{project.summary}</p>
            <p className="text-sm text-fog">{project.techStack.join(", ")}</p>
            <div className="flex gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} className="underline decoration-sodium underline-offset-4 hover:text-sodium">
                  {dict.visit}
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} className="underline decoration-sodium underline-offset-4 hover:text-sodium">
                  {dict.source}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
