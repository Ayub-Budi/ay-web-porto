import type { ContactLink, Experience, Profile } from "@/domain/content/types";
import { siteUrl } from "@/lib/site";

// schema.org Person for the home page, built from the same content the page shows.
export default function PersonJsonLd({
  profile,
  experiences,
  contactLinks,
}: Readonly<{
  profile: Profile;
  experiences: Experience[];
  contactLinks: ContactLink[];
}>) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    image: `${siteUrl}${profile.photo.src}`,
    description: profile.headline,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
      addressCountry: "ID",
    },
    knowsAbout: profile.techStack,
    worksFor: experiences
      .filter((experience) => experience.endDate === null)
      .map((experience) => ({ "@type": "Organization", name: experience.company })),
    sameAs: contactLinks
      .filter((link) => link.kind !== "email")
      .map((link) => link.href),
  };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
