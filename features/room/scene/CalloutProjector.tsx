"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { CalloutRegistry } from "../state/callout-registry";

// Moves each registered callout to its anchor's place on screen. Runs only
// on rendered frames, i.e. while the camera moves, never through React state.
export default function CalloutProjector({
  registry,
}: Readonly<{ registry: CalloutRegistry }>) {
  const point = useMemo(() => new Vector3(), []);

  useFrame(({ camera, size }) => {
    registry.forEach((element, anchor) => {
      point.set(...anchor).project(camera);
      const behind = point.z > 1;
      const x = ((point.x + 1) / 2) * size.width;
      const y = ((1 - point.y) / 2) * size.height;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      element.style.visibility = behind ? "hidden" : "";
    });
  });

  return null;
}
