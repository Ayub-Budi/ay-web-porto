"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
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

function LoadingOverlay({ label }: Readonly<{ label: string }>) {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <p
      role="status"
      className="absolute inset-x-0 bottom-8 text-center text-sm text-fog"
    >
      {label} {Math.round(progress)}%
    </p>
  );
}

// Loaded with next/dynamic so three.js never blocks the first paint.
export default function RoomCanvas({
  hotspots,
  store,
  quality,
  onSelect,
  callouts,
  loadingLabel,
}: Readonly<{
  hotspots: HotspotDefinition[];
  store: NavigationStore;
  quality: QualityProfile;
  onSelect: (index: number) => void;
  callouts: CalloutRegistry;
  loadingLabel: string;
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
          </Suspense>
          <CalloutProjector registry={callouts} />
        </ActiveHotspotProvider>
        <CameraRig
          stops={stops}
          store={store}
          reducedMotion={quality.reducedMotion}
        />
      </Canvas>
      <LoadingOverlay label={loadingLabel} />
    </>
  );
}
