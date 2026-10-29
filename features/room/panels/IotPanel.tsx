import type { Dictionary } from "@/i18n/get-dictionary";
import TextTitle from "@/components/landing/text/title";

export default function IotPanel({
  dict,
  techStack,
}: Readonly<{ dict: Dictionary["iot"]; techStack: string[] }>) {
  return (
    <div className="flex flex-col gap-5">
      <TextTitle title={dict.title} description={dict.teachingNote} />
      <p className="leading-relaxed max-w-[60ch]">{dict.body}</p>
      <ul className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-sm border border-line px-2.5 py-1 text-sm text-fog"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}
