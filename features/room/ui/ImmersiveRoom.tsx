"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { HotspotDefinition } from "../domain/hotspot";
import type { QualityProfile } from "../domain/quality";
import type { NavigationStore } from "../state/navigation-store";
import type { CalloutRegistry } from "../state/callout-registry";
import Vignette from "./Vignette";
import CalloutLayer from "./CalloutLayer";
import RoomLoader from "./RoomLoader";

const RoomCanvas = dynamic(() => import("../scene/RoomCanvas"), { ssr: false });

// If something stalls (a texture that never arrives), stop covering the page.
const GIVE_UP_MS = 15_000;

// Loading weights: the 3D code arriving, then textures, then the first frame.
function loaderProgress(ready: boolean, assets: number | null) {
  if (ready) return 100;
  if (assets === null) return 10;
  return 40 + assets * 0.5;
}

// The 3D layer: canvas, overlays, and the loader that covers it until the
// first frame. Mounted only in 3D mode, so its loading state starts fresh
// each time the room is switched on.
export default function ImmersiveRoom({
  hotspots,
  store,
  quality,
  callouts,
  onSelect,
  loadingLabel,
}: Readonly<{
  hotspots: HotspotDefinition[];
  store: NavigationStore;
  quality: QualityProfile;
  callouts: CalloutRegistry;
  onSelect: (index: number) => void;
  loadingLabel: string;
}>) {
  const [ready, setReady] = useState(false);
  const [assets, setAssets] = useState<number | null>(null);
  const markReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const timer = window.setTimeout(markReady, GIVE_UP_MS);
    return () => window.clearTimeout(timer);
  }, [markReady]);

  return (
    <>
      <div aria-hidden className="sticky top-0 h-svh -mb-[100svh]">
        <RoomCanvas
          hotspots={hotspots}
          store={store}
          quality={quality}
          onSelect={onSelect}
          callouts={callouts}
          revealed={ready}
          onProgress={setAssets}
          onReady={markReady}
        />
        <Vignette hotspots={hotspots} store={store} />
        <CalloutLayer
          hotspots={hotspots}
          store={store}
          registry={callouts}
          onSelect={(id) => onSelect(hotspots.findIndex((h) => h.id === id))}
        />
      </div>
      <RoomLoader label={loadingLabel} progress={loaderProgress(ready, assets)} done={ready} />
    </>
  );
}
