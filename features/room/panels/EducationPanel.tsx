import type { Education } from "@/domain/content/types";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { formatRange } from "@/lib/format-date";
import TextTitle from "@/components/landing/text/title";

export default function EducationPanel({
  education,
  dict,
  locale,
}: Readonly<{
  education: Education[];
  dict: Dictionary["education"];
  locale: Locale;
}>) {
  return (
    <div className="flex flex-col gap-6">
      <TextTitle title={dict.title} description={dict.description} />
      <ol className="border-y border-line divide-y divide-line">
        {education.map((item) => (
          <li key={item.id} className="py-4 flex flex-col gap-1">
            <p className="text-sm text-sodium">
              {formatRange(item.startDate, item.endDate, locale, dict.present)}
            </p>
            <h3 className="font-semibold">
              {item.degree}, {item.field}
            </h3>
            <p className="text-fog">{item.institution}</p>
            {item.description && (
              <p className="text-fog max-w-[60ch]">{item.description}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
