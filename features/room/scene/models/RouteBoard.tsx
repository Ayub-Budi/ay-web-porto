"use client";

import { palette } from "../palette";
import { BOARD } from "../board-layout";
import { useActiveHotspotId } from "../../state/active-hotspot";
import { useRouteBoardTexture } from "../../screens/useRouteBoardTexture";
import type { RouteBoardData } from "../../screens/draw-route-board";

// The experience board on the wall. Lights up the stop for whichever
// experience step the visitor has scrolled to.
export default function RouteBoard({
  data,
  stepIds,
}: Readonly<{ data: RouteBoardData; stepIds: string[] }>) {
  const activeId = useActiveHotspotId();
  const active = activeId ? stepIds.indexOf(activeId) : -1;
  const texture = useRouteBoardTexture(data, active);

  return (
    <group position={BOARD.center}>
      <mesh>
        <boxGeometry args={[BOARD.width + 0.06, BOARD.height + 0.06, 0.03]} />
        <meshStandardMaterial color={palette.woodDark} />
      </mesh>
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[BOARD.width, BOARD.height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}
