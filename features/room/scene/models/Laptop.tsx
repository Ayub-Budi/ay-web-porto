import { palette } from "../palette";

export default function Laptop() {
  return (
    <group position={[0.62, 0.75, -2.1]} rotation={[0, -0.35, 0]}>
      <mesh position={[0, 0.008, 0]}>
        <boxGeometry args={[0.36, 0.016, 0.25]} />
        <meshStandardMaterial color="#9aa6b8" metalness={0.4} roughness={0.4} />
      </mesh>
      <group position={[0, 0.016, -0.125]} rotation={[-0.3, 0, 0]}>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.36, 0.24, 0.012]} />
          <meshStandardMaterial color="#9aa6b8" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.12, 0.007]}>
          <planeGeometry args={[0.33, 0.21]} />
          <meshBasicMaterial color="#1d3a5f" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.16, 0.008]}>
          <planeGeometry args={[0.2, 0.05]} />
          <meshBasicMaterial color={palette.sodium} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
