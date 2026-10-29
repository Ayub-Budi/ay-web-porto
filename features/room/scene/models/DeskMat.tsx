"use client";

import { RoundedBox } from "@react-three/drei";

export default function DeskMat() {
  return (
    <RoundedBox
      args={[0.8, 0.003, 0.34]}
      radius={0.0015}
      smoothness={2}
      position={[0.05, 0.7515, -2.02]}
    >
      <meshStandardMaterial color="#1c2738" roughness={1} />
    </RoundedBox>
  );
}
