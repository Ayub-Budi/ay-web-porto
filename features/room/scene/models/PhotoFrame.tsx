"use client";

import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";
import { palette } from "../palette";

export default function PhotoFrame({ src }: Readonly<{ src: string }>) {
  const texture = useTexture(src, (t) => {
    t.colorSpace = SRGBColorSpace;
  });
  return (
    <group position={[-0.5, 0.75, -2.3]} rotation={[0, 0.35, 0]}>
      <group rotation={[-0.15, 0, 0]} position={[0, 0.14, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 0.28, 0.02]} />
          <meshStandardMaterial color={palette.woodDark} />
        </mesh>
        <mesh position={[0, 0, 0.011]}>
          <planeGeometry args={[0.16, 0.24]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
