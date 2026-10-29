import { palette } from "../palette";

const legs: [number, number][] = [
  [-0.85, -0.35],
  [0.85, -0.35],
  [-0.85, 0.35],
  [0.85, 0.35],
];

export default function Desk() {
  return (
    <group position={[0, 0, -2.2]}>
      <mesh position={[0, 0.725, 0]}>
        <boxGeometry args={[1.8, 0.05, 0.8]} />
        <meshStandardMaterial color={palette.wood} roughness={0.7} />
      </mesh>
      {legs.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.35, z]}>
          <boxGeometry args={[0.05, 0.7, 0.05]} />
          <meshStandardMaterial color={palette.metal} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
