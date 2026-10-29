"use client";

import { Instance, Instances } from "@react-three/drei";
import { palette } from "../palette";

const WIDTH = 1;
const HEIGHT = 1.8;
const DEPTH = 0.3;
const SHELVES = [0.05, 0.5, 0.95, 1.4, 1.78];
const BOOK_COLORS = ["#f2902b", "#7fb2ff", "#e9eef5", "#3f8f5a", "#c0504d", "#8a9bb3"];

// Deterministic book layout, computed once at module load.
const books = (() => {
  const list: { position: [number, number, number]; scale: [number, number, number]; color: string }[] = [];
  let seed = 7;
  const next = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  SHELVES.slice(0, -1).forEach((shelfY, row) => {
    let x = -WIDTH / 2 + 0.06;
    while (x < WIDTH / 2 - 0.12) {
      const width = 0.035 + next() * 0.03;
      const height = 0.24 + next() * 0.12;
      list.push({
        position: [x + width / 2, shelfY + 0.02 + height / 2, 0],
        scale: [width, height, 0.2],
        color: BOOK_COLORS[(row * 3 + list.length) % BOOK_COLORS.length],
      });
      x += width + 0.004;
    }
  });
  return list;
})();

export default function Bookshelf() {
  return (
    <group position={[-2.82, 0, 0.2]} rotation={[0, Math.PI / 2, 0]}>
      {[-WIDTH / 2, WIDTH / 2].map((x) => (
        <mesh key={x} position={[x, HEIGHT / 2, 0]}>
          <boxGeometry args={[0.03, HEIGHT, DEPTH]} />
          <meshStandardMaterial color={palette.woodDark} />
        </mesh>
      ))}
      {SHELVES.map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[WIDTH, 0.03, DEPTH]} />
          <meshStandardMaterial color={palette.woodDark} />
        </mesh>
      ))}
      {/* LED strip under the top shelf, lighting the books from above. */}
      <mesh position={[0, 1.76, 0.12]}>
        <boxGeometry args={[WIDTH - 0.06, 0.01, 0.02]} />
        <meshBasicMaterial color="#cfe2ff" toneMapped={false} />
      </mesh>
      <pointLight position={[0, 1.6, 0.35]} color="#9fc4ff" intensity={1.2} decay={2} />
      {/* The instance bounds sit at the shelf origin; culling would hide the books. */}
      <Instances limit={books.length} frustumCulled={false}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.8} />
        {books.map((book, i) => (
          <Instance key={i} position={book.position} scale={book.scale} color={book.color} />
        ))}
      </Instances>
    </group>
  );
}
