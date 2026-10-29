import { palette } from "../palette";

export default function Chair() {
  return (
    <group position={[1.05, 0, -1.5]} rotation={[0, -1.0, 0]}>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 16]} />
        <meshStandardMaterial color={palette.metal} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.42, 8]} />
        <meshStandardMaterial color={palette.metal} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#26364f" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.88, 0.24]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.48, 0.62, 0.07]} />
        <meshStandardMaterial color="#26364f" roughness={0.9} />
      </mesh>
    </group>
  );
}
