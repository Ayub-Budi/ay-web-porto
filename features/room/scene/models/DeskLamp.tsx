import { DoubleSide } from "three";
import { palette } from "../palette";

// The one dynamic light in the room: the warm desk lamp.
export default function DeskLamp() {
  return (
    <group position={[-0.75, 0.75, -2.45]}>
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.03, 16]} />
        <meshStandardMaterial color={palette.metal} />
      </mesh>
      <mesh position={[0.05, 0.2, 0.03]} rotation={[0.2, 0, -0.3]}>
        <boxGeometry args={[0.02, 0.4, 0.02]} />
        <meshStandardMaterial color={palette.metal} />
      </mesh>
      <mesh position={[0.15, 0.38, 0.12]} rotation={[0.9, 0, -0.4]}>
        <coneGeometry args={[0.08, 0.14, 16, 1, true]} />
        <meshStandardMaterial color={palette.sodium} side={DoubleSide} />
      </mesh>
      <mesh position={[0.17, 0.34, 0.15]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#fff1d6" toneMapped={false} />
      </mesh>
      <pointLight
        position={[0.2, 0.3, 0.2]}
        color={palette.lampLight}
        intensity={2.5}
        decay={2}
      />
    </group>
  );
}
