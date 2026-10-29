"use client";

import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";
import { palette } from "../palette";
import { PHONE } from "../desk-layout";

const WIDTH = 0.075;
const HEIGHT = 0.155;
const LEAN = PHONE.lean;

function Screen({ src }: Readonly<{ src: string }>) {
  const texture = useTexture(src, (t) => {
    t.colorSpace = SRGBColorSpace;
  });
  return (
    <mesh position={[0, 0, 0.0046]}>
      <planeGeometry args={[WIDTH - 0.006, HEIGHT - 0.01]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// A phone propped on a desk stand, its screen facing the chair.
export default function Phone({ screenSrc }: Readonly<{ screenSrc?: string }>) {
  return (
    <group position={PHONE.position} rotation={[0, PHONE.yaw, 0]}>
      {/* Stand: base and back support */}
      <mesh position={[0, 0.006, -0.01]}>
        <boxGeometry args={[0.07, 0.012, 0.07]} />
        <meshStandardMaterial color={palette.metal} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.05, -0.035]} rotation={[LEAN, 0, 0]}>
        <boxGeometry args={[0.04, 0.1, 0.006]} />
        <meshStandardMaterial color={palette.metal} metalness={0.5} roughness={0.4} />
      </mesh>

      <group position={[0, 0.012 + HEIGHT / 2 - 0.004, -0.012]} rotation={[LEAN, 0, 0]}>
        <mesh>
          <boxGeometry args={[WIDTH, HEIGHT, 0.008]} />
          <meshStandardMaterial color="#1a2230" metalness={0.3} roughness={0.4} />
        </mesh>
        {screenSrc ? (
          <Screen src={screenSrc} />
        ) : (
          <mesh position={[0, 0, 0.0046]}>
            <planeGeometry args={[WIDTH - 0.006, HEIGHT - 0.01]} />
            <meshBasicMaterial color="#2d5a8c" toneMapped={false} />
          </mesh>
        )}
      </group>
    </group>
  );
}
