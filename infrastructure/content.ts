import type { ContentReader } from "@/domain/content/content-repository";
import { StaticContentRepository } from "./static-content-repository";

// Composition root: the only place that decides where content comes from.
// Swap in a database-backed reader here when the CMS lands.
export const contentReader: ContentReader = new StaticContentRepository();
