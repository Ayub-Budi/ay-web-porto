import type { Profile } from "@/domain/content/types";
import type { Dictionary } from "@/i18n/get-dictionary";
import TextTitle from "@/components/landing/text/title";

export default function AboutPanel({
  profile,
  dict,
}: Readonly<{ profile: Profile; dict: Dictionary["about"] }>) {
  return (
    <div className="flex flex-col gap-5">
      <TextTitle title={dict.title} description={dict.lead} />
      <p className="text-fog leading-relaxed max-w-[60ch]">{profile.bio}</p>
      <dl className="border-y border-line divide-y divide-line max-w-[60ch]">
        <div className="py-3 grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
          <dt className="font-semibold">{dict.basedIn}</dt>
          <dd className="text-fog">{profile.location}</dd>
        </div>
        <div className="py-3 grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
          <dt className="font-semibold">{dict.worksWith}</dt>
          <dd className="text-fog">{profile.techStack.join(", ")}</dd>
        </div>
      </dl>
    </div>
  );
}
