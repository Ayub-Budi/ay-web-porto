"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import type { HotspotDefinition } from "../domain/hotspot";
import type { QualityProfile } from "../domain/quality";
import type { NavigationStore } from "../state/navigation-store";
import RoomEnvironment from "./RoomEnvironment";
import CameraRig from "./CameraRig";
import Selectable from "./Selectable";
import CalloutProjector from "./CalloutProjector";
import type { CalloutRegistry } from "../state/callout-registry";
import { ActiveHotspotProvider } from "../state/active-hotspot";

// Reports texture/asset loading (0–100). Its first call also tells the page
// that the 3D code itself has arrived.
function ProgressReporter({ onProgress }: Readonly<{ onProgress: (p: number) => void }>) {
  const { progress } = useProgress();
  useEffect(() => onProgress(progress), [progress, onProgress]);
  return null;
}

// Mounted inside the Suspense boundary, so it only runs once every model and
// texture has resolved; fires after the first full frame is on screen.
function ReadySignal({ onReady }: Readonly<{ onReady: () => void }>) {
  const invalidate = useThree((state) => state.invalidate);
  const fired = useRef(false);
  useEffect(() => invalidate(), [invalidate]);
  useFrame(() => {
    if (fired.current) return;
    fired.current = true;
    requestAnimationFrame(() => onReady());
  });
  return null;
}

// Loaded with next/dynamic so three.js never blocks the first paint.
export default function RoomCanvas({
  hotspots,
  store,
  quality,
  onSelect,
  callouts,
  revealed,
  onProgress,
  onReady,
}: Readonly<{
  hotspots: HotspotDefinition[];
  store: NavigationStore;
  quality: QualityProfile;
  onSelect: (index: number) => void;
  callouts: CalloutRegistry;
  // False while the loader still covers the room; the camera waits at the
  // door until then so the walk-in is seen.
  revealed: boolean;
  onProgress: (progress: number) => void;
  onReady: () => void;
}>) {
  const stops = useMemo(() => hotspots.map((h) => h.camera), [hotspots]);
  const ids = useMemo(() => hotspots.map((h) => h.id), [hotspots]);

  return (
    <>
      <Canvas
        frameloop="demand"
        dpr={quality.dpr}
        camera={{ fov: 45, near: 0.05, far: 30, position: [0, 1.6, 3.2] }}
        gl={{ antialias: quality.antialias, powerPreference: "high-performance" }}
      >
        <ActiveHotspotProvider store={store} ids={ids}>
          <Suspense fallback={null}>
            <RoomEnvironment />
            {hotspots.map((hotspot, index) =>
              hotspot.model ? (
                <Selectable
                  key={hotspot.id}
                  label={hotspot.label}
                  onSelect={() => onSelect(index)}
                >
                  {hotspot.model}
                </Selectable>
              ) : null,
            )}
            <ReadySignal onReady={onReady} />
          </Suspense>
          <CalloutProjector registry={callouts} />
        </ActiveHotspotProvider>
        <CameraRig
          stops={stops}
          store={store}
          revealed={revealed}
          reducedMotion={quality.reducedMotion}
        />
      </Canvas>
      <ProgressReporter onProgress={onProgress} />
    </>
  );
}
