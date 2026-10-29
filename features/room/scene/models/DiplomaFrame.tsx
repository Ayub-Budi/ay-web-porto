import { palette } from "../palette";

const lines = [0.08, 0.02, -0.04, -0.08];

export default function DiplomaFrame() {
  return (
    <group position={[-2.97, 1.7, -2.3]} rotation={[0, Math.PI / 2, 0]}>
      <mesh>
        <boxGeometry args={[0.6, 0.45, 0.03]} />
        <meshStandardMaterial color={palette.woodDark} />
      </mesh>
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[0.52, 0.37]} />
        <meshStandardMaterial color={palette.paper} />
      </mesh>
      {lines.map((y, i) => (
        <mesh key={y} position={[0, y, 0.017]}>
          <planeGeometry args={[i === 0 ? 0.3 : 0.4, i === 0 ? 0.03 : 0.012]} />
          <meshStandardMaterial color="#5b6577" />
        </mesh>
      ))}
      <mesh position={[0.17, -0.12, 0.018]}>
        <circleGeometry args={[0.035, 20]} />
        <meshStandardMaterial color={palette.sodium} />
      </mesh>
    </group>
  );
}
