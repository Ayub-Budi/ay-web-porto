import type { CameraStop, Vec3 } from "../domain/hotspot";

// Vertical field of view per orientation. Portrait screens are narrow, so
// they get a wider lens to keep objects in frame.
export const FOV = { landscape: 45, portrait: 55 };

// Portrait stop: the camera sits `distance` away from `focus` along `from`
// (a direction pointing from the object toward the camera) and aims a little
// below the object, so it lands in the upper part of the screen, above the
// bottom sheet.
export function portraitStop(focus: Vec3, from: Vec3, distance: number): CameraStop {
  const length = Math.hypot(...from);
  const [dx, dy, dz] = from.map((v) => v / length);
  const drop = distance * Math.tan(((FOV.portrait / 2) * Math.PI) / 180) * 0.4;
  return {
    position: [focus[0] + dx * distance, focus[1] + dy * distance, focus[2] + dz * distance],
    lookAt: [focus[0], focus[1] - drop, focus[2]],
  };
}
