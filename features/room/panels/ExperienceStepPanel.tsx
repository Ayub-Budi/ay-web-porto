import type { Experience } from "@/domain/content/types";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { formatRange } from "@/lib/format-date";

// One job per scroll step. The section title lives on the board in 3D, so it
// is only visible here in the flat layout (and always to screen readers).
export default function ExperienceStepPanel({
  experience,
  index,
  total,
  dict,
  locale,
}: Readonly<{
  experience: Experience;
  index: number;
  total: number;
  dict: Dictionary["experience"];
  locale: Locale;
}>) {
  return (
    <div className="flex flex-col gap-4">
      {index === 0 && (
        <div className="flex flex-col gap-3 pb-2 group-data-[immersive=true]:sr-only">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {dict.title}
          </h2>
          <p className="text-fog max-w-[44ch]">{dict.timelineDescription}</p>
        </div>
      )}
      {/* In 2D the steps line up as a timeline along a left rule. */}
      <div
        className={`flex flex-col gap-4 group-data-[immersive=false]:relative group-data-[immersive=false]:border-l-2 group-data-[immersive=false]:border-line group-data-[immersive=false]:pl-6 ${
          index < total - 1 ? "group-data-[immersive=false]:pb-14" : ""
        }`}
      >
        <span
          aria-hidden
          className="hidden group-data-[immersive=false]:block absolute -left-[9px] top-1 size-4 rounded-full border-4 border-sodium bg-night"
        />
        <p className="text-sm text-fog">
          {dict.stop} {index + 1}/{total}
        </p>
        <div className="flex flex-col gap-1">
          <p className="text-sodium">
            {formatRange(experience.startDate, experience.endDate, locale, dict.present)}
          </p>
          <h3 className="text-2xl font-extrabold tracking-tight leading-tight">
            {experience.title}
          </h3>
          <p className="text-fog">{experience.company}</p>
        </div>
        <ul className="flex flex-col gap-3 max-w-[64ch] list-disc pl-5 marker:text-sodium">
          {experience.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
