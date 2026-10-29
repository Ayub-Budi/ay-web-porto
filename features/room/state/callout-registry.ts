import type { Vec3 } from "../domain/hotspot";

// Bridges the DOM callout layer and the canvas: the layer registers each
// label element with its 3D anchor, and the canvas writes screen positions
// straight to those elements whenever it renders.
export interface CalloutRegistry {
  set(key: string, entry: { element: HTMLElement; anchor: Vec3 } | null): void;
  forEach(fn: (element: HTMLElement, anchor: Vec3) => void): void;
}

export function createCalloutRegistry(): CalloutRegistry {
  const entries = new Map<string, { element: HTMLElement; anchor: Vec3 }>();
  return {
    set(key, entry) {
      if (entry) entries.set(key, entry);
      else entries.delete(key);
    },
    forEach(fn) {
      entries.forEach(({ element, anchor }) => fn(element, anchor));
    },
  };
}
