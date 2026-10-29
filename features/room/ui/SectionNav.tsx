"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import type { HotspotDefinition } from "../domain/hotspot";
import type { NavigationStore } from "../state/navigation-store";

interface NavEntry {
  id: string;
  label: string;
  start: number;
  end: number;
}

// Consecutive hotspots in the same section become one entry.
function groupSections(hotspots: HotspotDefinition[]): NavEntry[] {
  const entries: NavEntry[] = [];
  hotspots.forEach((hotspot, index) => {
    const section = hotspot.section ?? hotspot.id;
    const last = entries[entries.length - 1];
    if (last && last.id === section) last.end = index;
    else entries.push({ id: section, label: hotspot.label, start: index, end: index });
  });
  return entries;
}

// Floating pill at the bottom of the screen; the current section is lit.
// On narrow screens it scrolls sideways and keeps the current entry in view.
export default function SectionNav({
  hotspots,
  store,
  onSelect,
  label,
}: Readonly<{
  hotspots: HotspotDefinition[];
  store: NavigationStore;
  onSelect: (index: number) => void;
  label: string;
}>) {
  const active = useSyncExternalStore(store.subscribe, store.get, () => 0);
  const entries = useMemo(() => groupSections(hotspots), [hotspots]);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    list.current
      ?.querySelector<HTMLElement>("[aria-current]")
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 pointer-events-none"
    >
      <ol
        ref={list}
        className="pointer-events-auto flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-night/85 p-1.5 backdrop-blur-md [scrollbar-width:none]"
      >
        {entries.map((entry) => {
          const current = active >= entry.start && active <= entry.end;
          return (
            <li key={entry.id} className="shrink-0">
              <a
                href={`#${hotspots[entry.start].id}`}
                aria-current={current ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(entry.start);
                }}
                className={`block rounded-full px-4 py-2 text-sm transition-colors ${
                  current
                    ? "bg-sodium font-semibold text-night"
                    : "text-fog hover:text-ink"
                }`}
              >
                {entry.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
