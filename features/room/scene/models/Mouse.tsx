import { palette } from "../palette";

export default function Mouse() {
  return (
    <group position={[0.32, 0.753, -2.02]} rotation={[0, -0.15, 0]} scale={1.2}>
      {/* Dome body: a half sphere stretched into a mouse shape. */}
      <mesh scale={[0.031, 0.019, 0.057]}>
        <sphereGeometry args={[1, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a2230" metalness={0.3} roughness={0.45} />
      </mesh>
      {/* Seam between the two buttons */}
      <mesh position={[0, 0.0175, -0.028]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.0012, 0.003, 0.034]} />
        <meshStandardMaterial color="#0b0f16" />
      </mesh>
      <mesh position={[0, 0.019, -0.022]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.0045, 0.0045, 0.004, 14]} />
        <meshStandardMaterial color={palette.sodium} roughness={0.5} />
      </mesh>
    </group>
  );
}
