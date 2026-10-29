import type { ContactLink } from "@/domain/content/types";
import type { Dictionary } from "@/i18n/get-dictionary";
import TextTitle from "@/components/landing/text/title";

const icons: Record<ContactLink["kind"], string> = {
  email: "ri-mail-line",
  linkedin: "ri-linkedin-box-line",
  github: "ri-github-line",
  instagram: "ri-instagram-line",
  other: "ri-link",
};

export default function ContactPanel({
  links,
  dict,
}: Readonly<{ links: ContactLink[]; dict: Dictionary["contact"] }>) {
  return (
    <div className="flex flex-col gap-6">
      <TextTitle title={dict.title} description={dict.description} />
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              rel="me noopener"
              target="_blank"
              className="flex items-center gap-3 rounded-md border border-line px-4 py-3 transition-colors hover:border-sodium"
            >
              <i aria-hidden className={`${icons[link.kind]} text-xl text-sodium`} />
              <span className="font-semibold">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
