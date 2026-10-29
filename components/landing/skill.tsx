import type { Skill as SkillItem } from "@/domain/content/types";
import type { Dictionary } from "@/i18n/get-dictionary";
import TextTitle from "./text/title";

export default function Skill({
  skills,
  dict,
}: Readonly<{ skills: SkillItem[]; dict: Dictionary["skills"] }>) {
  return (
    <div className="@container">
      <div className="grid gap-8 @3xl:grid-cols-[minmax(0,320px)_1fr] @3xl:gap-10">
        <TextTitle title={dict.title} description={dict.description} />

        <dl className="border-y border-line divide-y divide-line">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="py-5 grid gap-2 @xl:grid-cols-[200px_1fr] @xl:gap-8"
            >
              <dt className="text-lg font-semibold">{skill.name}</dt>
              <dd className="text-fog max-w-[60ch]">{skill.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
