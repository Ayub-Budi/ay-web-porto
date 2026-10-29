"use client";

import { Instance, Instances } from "@react-three/drei";
import { palette } from "../palette";

// Window opening in the back wall (x, y ranges); walls are built around it.
export const WINDOW = { left: 0.9, right: 2.3, bottom: 1.0, top: 2.1 };

// Deterministic skyline, computed once at module load.
const skyline = (() => {
  let seed = 11;
  const next = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const buildings: { x: number; z: number; w: number; h: number }[] = [];
  const lights: { position: [number, number, number]; color: string }[] = [];
  for (let x = -1.5; x < 5; x += 0.55 + next() * 0.3) {
    const w = 0.4 + next() * 0.4;
    const h = 1.5 + next() * 3.5;
    const z = -4.5 - next() * 2.5;
    buildings.push({ x, z, w, h });
    for (let y = 0.4; y < h - 0.2; y += 0.28) {
      for (let lx = -w / 2 + 0.1; lx < w / 2 - 0.05; lx += 0.14) {
        if (next() > 0.55) {
          lights.push({
            position: [x + lx, y - 0.5, z + 0.201],
            color: next() > 0.75 ? "#9fd0ff" : "#ffcf7a",
          });
        }
      }
    }
  }
  return { buildings, lights };
})();

export default function CityWindow() {
  const { left, right, bottom, top } = WINDOW;
  const width = right - left;
  const height = top - bottom;
  const cx = (left + right) / 2;
  const cy = (bottom + top) / 2;
  return (
    <group>
      {/* Frame */}
      {[
        [cx, top, width + 0.08, 0.06],
        [cx, bottom, width + 0.08, 0.06],
        [cx, cy, 0.04, height],
      ].map(([x, y, w, h]) => (
        <mesh key={`${x}-${y}-${w}`} position={[x, y, -2.96]}>
          <boxGeometry args={[w, h, 0.08]} />
          <meshStandardMaterial color="#2a3a52" />
        </mesh>
      ))}
      {[left, right].map((x) => (
        <mesh key={x} position={[x, cy, -2.96]}>
          <boxGeometry args={[0.06, height + 0.08, 0.08]} />
          <meshStandardMaterial color="#2a3a52" />
        </mesh>
      ))}

      {/* Night sky and skyline beyond the glass */}
      <mesh position={[1.5, 2, -8]}>
        <planeGeometry args={[14, 8]} />
        <meshBasicMaterial color="#0a1730" />
      </mesh>
      {skyline.buildings.map((b) => (
        <mesh key={`${b.x}`} position={[b.x, b.h / 2 - 0.5, b.z]}>
          <boxGeometry args={[b.w, b.h, 0.4]} />
          <meshStandardMaterial color={palette.building} />
        </mesh>
      ))}
      <Instances limit={skyline.lights.length} frustumCulled={false}>
        <planeGeometry args={[0.06, 0.09]} />
        <meshBasicMaterial toneMapped={false} />
        {skyline.lights.map((light, i) => (
          <Instance key={i} position={light.position} color={light.color} />
        ))}
      </Instances>
    </group>
  );
}
