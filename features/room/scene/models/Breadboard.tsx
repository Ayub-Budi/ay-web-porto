import { palette } from "../palette";

const wires: [number, string][] = [
  [-0.04, "#c0504d"],
  [0, "#7fb2ff"],
  [0.04, "#f2c14e"],
];

// Arduino + breadboard: the IoT background, sitting on the desk.
export default function Breadboard() {
  return (
    <group position={[-0.55, 0.75, -1.98]} rotation={[0, 0.2, 0]}>
      <mesh position={[0.06, 0.012, 0]}>
        <boxGeometry args={[0.2, 0.024, 0.08]} />
        <meshStandardMaterial color={palette.breadboard} roughness={0.8} />
      </mesh>
      <mesh position={[-0.12, 0.008, 0]}>
        <boxGeometry args={[0.11, 0.012, 0.08]} />
        <meshStandardMaterial color={palette.pcb} />
      </mesh>
      <mesh position={[-0.15, 0.02, 0]}>
        <boxGeometry args={[0.03, 0.014, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {wires.map(([z, color]) => (
        <mesh
          key={color}
          position={[-0.02, 0.026, z / 2]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.003, 0.003, 0.12, 6]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      <mesh position={[0.1, 0.035, 0]}>
        <sphereGeometry args={[0.008, 10, 10]} />
        <meshBasicMaterial color="#ff4d4d" toneMapped={false} />
      </mesh>
    </group>
  );
}
