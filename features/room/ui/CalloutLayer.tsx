"use client";

import { useSyncExternalStore } from "react";
import type { HotspotDefinition } from "../domain/hotspot";
import type { NavigationStore } from "../state/navigation-store";
import type { CalloutRegistry } from "../state/callout-registry";

// Pinned labels (dot, leader line, chip) for the active hotspot. The canvas
// positions them; they are shortcuts mirroring the section nav, so they
// stay out of the tab order.
export default function CalloutLayer({
  hotspots,
  store,
  registry,
  onSelect,
}: Readonly<{
  hotspots: HotspotDefinition[];
  store: NavigationStore;
  registry: CalloutRegistry;
  onSelect: (id: string) => void;
}>) {
  const active = useSyncExternalStore(store.subscribe, store.get, () => 0);
  const activeId = hotspots[active]?.id;

  return (
    // Phones have no room beside the copy for labels, so they start at md.
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
      {hotspots.flatMap((hotspot) =>
        (hotspot.callouts ?? []).map((callout) => {
          const key = `${hotspot.id}-${callout.id}`;
          const visible = hotspot.id === activeId;
          return (
            <div
              key={key}
              ref={(element) => {
                registry.set(key, element ? { element, anchor: callout.anchor } : null);
              }}
              className="absolute left-0 top-0"
            >
              <div
                className={`relative transition-opacity duration-500 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="absolute -left-1.5 -top-1.5 size-3 rounded-full bg-sodium ring-4 ring-sodium/25" />
                <span className="absolute left-0 top-0 h-px w-10 origin-left -rotate-[35deg] bg-sodium/70" />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => callout.target && onSelect(callout.target)}
                  className={`absolute left-8 -top-10 whitespace-nowrap rounded-full border border-line bg-night/85 px-3 py-1.5 text-sm text-ink backdrop-blur transition-colors hover:border-sodium ${
                    visible ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                >
                  {callout.label}
                </button>
              </div>
            </div>
          );
        }),
      )}
    </div>
  );
}
