"use client";

import { Instance, Instances, RoundedBox } from "@react-three/drei";
import { CatmullRomCurve3, Vector3 } from "three";
import { palette } from "../palette";

const U = 0.019; // one key unit, 19 mm
const GAP = 0.0016;
const CAP_HEIGHT = 0.011;

type Cap = "alpha" | "mod" | "accent";

// 60% layout plus a function row. Each key: [width in units, cap style].
const rows: [number, Cap][][] = [
  [[1, "accent"], ...Array.from({ length: 12 }, (): [number, Cap] => [1, "mod"]), [2, "mod"]],
  [...Array.from({ length: 13 }, (): [number, Cap] => [1, "alpha"]), [2, "mod"]],
  [[1.5, "mod"], ...Array.from({ length: 12 }, (): [number, Cap] => [1, "alpha"]), [1.5, "mod"]],
  [[1.75, "mod"], ...Array.from({ length: 11 }, (): [number, Cap] => [1, "alpha"]), [2.25, "accent"]],
  [[2.25, "mod"], ...Array.from({ length: 10 }, (): [number, Cap] => [1, "alpha"]), [2.75, "mod"]],
  [[1.25, "mod"], [1.25, "mod"], [1.25, "mod"], [6.25, "alpha"], [1.25, "mod"], [1.25, "mod"], [1.25, "mod"], [1.25, "mod"]],
];

const capColors: Record<Cap, string> = {
  alpha: "#d9e0ea",
  mod: "#2c3f5c",
  accent: palette.sodium,
};

const WIDTH = 15 * U;
const DEPTH = rows.length * U;

// Keycap transforms, computed once. Rows step up slightly toward the back,
// like a sculpted profile; the function row sits a little apart.
const keycaps = rows.flatMap((row, r) => {
  let x = -WIDTH / 2;
  const z = -DEPTH / 2 + r * U + U / 2 + (r === 0 ? -0.004 : 0);
  const y = CAP_HEIGHT / 2 + (rows.length - r) * 0.0007;
  return row.map(([units, cap]) => {
    const width = units * U;
    const position: [number, number, number] = [x + width / 2, y, z];
    x += width;
    return {
      position,
      scale: [width - GAP * 2, CAP_HEIGHT, U - GAP * 2] as [number, number, number],
      color: capColors[cap],
    };
  });
});

// Coiled cable from the back of the keyboard to under the monitor.
const cable = (() => {
  const points: Vector3[] = [];
  const start = new Vector3(0.02, 0.006, -DEPTH / 2 - 0.012);
  for (let i = 0; i <= 120; i++) {
    const t = i / 120;
    const along = start.z - t * 0.32;
    const coil = t > 0.2 && t < 0.55 ? 0.006 : 0;
    const angle = t * Math.PI * 2 * 14;
    points.push(
      new Vector3(
        start.x + Math.sin(t * Math.PI) * 0.04 + Math.cos(angle) * coil,
        start.y + Math.sin(angle) * coil + (t > 0.2 && t < 0.55 ? 0.006 : 0),
        along,
      ),
    );
  }
  return new CatmullRomCurve3(points);
})();

export default function MechanicalKeyboard() {
  return (
    <group position={[-0.02, 0.753, -2.04]} rotation={[0, 0.03, 0]} scale={1.3}>
      {/* Case and plate */}
      <RoundedBox
        args={[WIDTH + 0.016, 0.018, DEPTH + 0.02]}
        radius={0.004}
        smoothness={2}
        position={[0, 0.009, -0.002]}
      >
        <meshStandardMaterial color="#1a2230" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.0185, -0.002]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[WIDTH + 0.004, DEPTH + 0.008]} />
        <meshStandardMaterial color="#0d131c" />
      </mesh>

      {/* Underglow */}
      <mesh position={[0, 0.0015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[WIDTH + 0.03, DEPTH + 0.03]} />
        <meshBasicMaterial color={palette.sodium} transparent opacity={0.18} toneMapped={false} />
      </mesh>

      <group position={[0, 0.019, 0]}>
        <Instances limit={keycaps.length} frustumCulled={false}>
          <boxGeometry />
          <meshStandardMaterial roughness={0.55} />
          {keycaps.map((cap, i) => (
            <Instance key={i} position={cap.position} scale={cap.scale} color={cap.color} />
          ))}
        </Instances>
      </group>

      <mesh>
        <tubeGeometry args={[cable, 160, 0.0022, 6, false]} />
        <meshStandardMaterial color={palette.sodium} roughness={0.6} />
      </mesh>
    </group>
  );
}
