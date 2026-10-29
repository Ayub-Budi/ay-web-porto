"use client";

import { palette } from "../palette";
import { useVsCodeTexture } from "../../screens/useVsCodeTexture";

export default function Monitor({
  source,
  title,
}: Readonly<{ source: string; title: string }>) {
  const screen = useVsCodeTexture(source, title);
  return (
    <group position={[0, 0.75, -2.5]}>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.2]} />
        <meshStandardMaterial color={palette.metal} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <boxGeometry args={[0.06, 0.3, 0.04]} />
        <meshStandardMaterial color={palette.metal} />
      </mesh>
      <mesh position={[0, 0.37, 0.02]}>
        <boxGeometry args={[0.95, 0.55, 0.04]} />
        <meshStandardMaterial color="#121a26" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.37, 0.041]}>
        <planeGeometry args={[0.9, 0.5]} />
        <meshBasicMaterial map={screen} toneMapped={false} />
      </mesh>
      <pointLight
        position={[0, 0.37, 0.35]}
        color={palette.screenGlow}
        intensity={0.6}
        decay={2}
      />
    </group>
  );
}
