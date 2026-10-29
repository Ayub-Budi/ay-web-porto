import type { Profile } from "@/domain/content/types";
import type { Locale } from "@/i18n/config";

// The HTML shown on the monitor: a plain version of this very page.
export function buildPortfolioSource({
  profile,
  locale,
  comment,
}: {
  profile: Profile;
  locale: Locale;
  comment: string;
}) {
  return [
    "<!DOCTYPE html>",
    `<html lang="${locale}">`,
    "<head>",
    '  <meta charset="UTF-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `  <title>${profile.name} — ${profile.role}</title>`,
    '  <link rel="stylesheet" href="style.css" />',
    "</head>",
    "<body>",
    `  <!-- ${comment} -->`,
    '  <header class="hero">',
    `    <h1>${profile.name}</h1>`,
    `    <p>${profile.role}, ${profile.location}</p>`,
    "  </header>",
    "",
    '  <main id="room">',
    '    <section id="experience"></section>',
    '    <section id="skills"></section>',
    "  </main>",
    "",
    '  <script src="script.js" defer></script>',
    "</body>",
    "</html>",
  ].join("\n");
}
