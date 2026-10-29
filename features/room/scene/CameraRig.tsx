"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, type Camera, type PerspectiveCamera } from "three";
import type { CameraStop } from "../domain/hotspot";
import type { NavigationStore } from "../state/navigation-store";
import { FOV } from "./camera-math";

const SETTLED = 1e-6;
const SPEED = 3;
const PORTRAIT_BELOW = 0.8; // width / height

function setFov(camera: Camera, fov: number) {
  const perspective = camera as PerspectiveCamera;
  if (!perspective.isPerspectiveCamera || perspective.fov === fov) return;
  perspective.fov = fov;
  perspective.updateProjectionMatrix();
}

// Eases the camera toward the active stop, using the portrait framing on
// phones. With frameloop="demand" it only requests frames while still
// moving, so the GPU idles once it arrives.
export default function CameraRig({
  stops,
  store,
  reducedMotion,
}: Readonly<{
  stops: CameraStop[];
  store: NavigationStore;
  reducedMotion: boolean;
}>) {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const portrait = useThree((state) => state.size.width / state.size.height < PORTRAIT_BELOW);
  const entered = useRef(false);
  const goal = useMemo(
    () => ({ position: new Vector3(), lookAt: new Vector3(), look: new Vector3() }),
    [],
  );

  useEffect(() => {
    setFov(camera, portrait ? FOV.portrait : FOV.landscape);

    const aim = (snap: boolean) => {
      const stop = stops[store.get()] ?? stops[0];
      if (!stop) return;
      const framing = (portrait && stop.portrait) || stop;
      goal.position.set(...framing.position);
      goal.lookAt.set(...framing.lookAt);
      if (snap) {
        camera.position.copy(goal.position);
        goal.look.copy(goal.lookAt);
        camera.lookAt(goal.look);
      }
      invalidate();
    };

    // Entrance, once: start at the doorway and walk in, unless motion is
    // reduced. Later runs (e.g. rotating the phone) just re-aim.
    if (!entered.current) {
      entered.current = true;
      goal.look.set(0, 1.2, -2.5);
      camera.lookAt(goal.look);
      aim(reducedMotion);
    } else {
      aim(false);
    }
    return store.subscribe(() => aim(reducedMotion));
  }, [camera, goal, invalidate, portrait, reducedMotion, stops, store]);

  useFrame((_, delta) => {
    const t = 1 - Math.exp(-Math.min(delta, 0.1) * SPEED);
    camera.position.lerp(goal.position, t);
    goal.look.lerp(goal.lookAt, t);
    camera.lookAt(goal.look);
    if (
      camera.position.distanceToSquared(goal.position) > SETTLED ||
      goal.look.distanceToSquared(goal.lookAt) > SETTLED
    ) {
      invalidate();
    }
  });

  return null;
}
