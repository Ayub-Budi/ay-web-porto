// Where the experience board hangs, shared by the 3D model, the texture
// drawing and the camera stops. No three.js here, so hotspots can import it.

export const BOARD = {
  center: [-1.65, 1.7, -2.97] as [number, number, number],
  width: 1.5,
  height: 0.9,
  canvas: { width: 1600, height: 960 },
  // The route line spans this fraction of the board's width.
  line: { start: 210 / 1600, end: 1390 / 1600 },
};

// Fraction (0–1) across the board where stop `index` of `count` sits.
export function stopFraction(index: number, count: number) {
  const { start, end } = BOARD.line;
  return count > 1 ? start + (index / (count - 1)) * (end - start) : (start + end) / 2;
}

// World X of that stop.
export function stopWorldX(index: number, count: number) {
  return BOARD.center[0] - BOARD.width / 2 + stopFraction(index, count) * BOARD.width;
}
