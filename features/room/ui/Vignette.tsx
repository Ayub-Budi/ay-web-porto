"use client";

import { useSyncExternalStore } from "react";
import type { HotspotDefinition } from "../domain/hotspot";
import type { NavigationStore } from "../state/navigation-store";

// Darkens the side the copy sits on (left on desktop, bottom on phones), but
// only for panels placed straight on the scene; cards carry their own
// background, and the room should read clearly behind them.
export default function Vignette({
  hotspots,
  store,
}: Readonly<{ hotspots: HotspotDefinition[]; store: NavigationStore }>) {
  const active = useSyncExternalStore(store.subscribe, store.get, () => 0);
  const on = hotspots[active]?.panelStyle === "bare";

  return (
    <div
      className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/30 transition-opacity duration-700 md:bg-gradient-to-r md:from-night/90 md:via-night/35 md:to-transparent ${
        on ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
