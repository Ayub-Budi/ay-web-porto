import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((module) => module.en),
  id: () => import("./dictionaries/id").then((module) => module.id),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();

export type { Dictionary };
