"use client";

import { ContactShadows } from "@react-three/drei";
import { palette } from "./palette";
import Desk from "./models/Desk";
import Chair from "./models/Chair";
import DeskLamp from "./models/DeskLamp";
import CityWindow, { WINDOW } from "./models/CityWindow";
import DeskMat from "./models/DeskMat";
import MechanicalKeyboard from "./models/MechanicalKeyboard";
import Mouse from "./models/Mouse";

const ROOM = { width: 6, depth: 6, height: 3 };

// Back wall split into four panels around the window opening.
const backWallPanels = (() => {
  const half = ROOM.width / 2;
  const { left, right, bottom, top } = WINDOW;
  return [
    { x: (-half + left) / 2, y: ROOM.height / 2, w: left + half, h: ROOM.height },
    { x: (right + half) / 2, y: ROOM.height / 2, w: half - right, h: ROOM.height },
    { x: (left + right) / 2, y: bottom / 2, w: right - left, h: bottom },
    { x: (left + right) / 2, y: (top + ROOM.height) / 2, w: right - left, h: ROOM.height - top },
  ];
})();

function Shell() {
  const half = ROOM.width / 2;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
        <meshStandardMaterial color={palette.floor} roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.2, 0.002, -1.6]}>
        <planeGeometry args={[2.6, 1.8]} />
        <meshStandardMaterial color={palette.rug} roughness={1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM.height, 0]}>
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
        <meshStandardMaterial color={palette.wall} />
      </mesh>
      {backWallPanels.map((panel) => (
        <mesh key={`${panel.x}-${panel.y}`} position={[panel.x, panel.y, -half]}>
          <planeGeometry args={[panel.w, panel.h]} />
          <meshStandardMaterial color={palette.wall} />
        </mesh>
      ))}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-half, ROOM.height / 2, 0]}>
        <planeGeometry args={[ROOM.depth, ROOM.height]} />
        <meshStandardMaterial color={palette.wall} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[half, ROOM.height / 2, 0]}>
        <planeGeometry args={[ROOM.depth, ROOM.height]} />
        <meshStandardMaterial color={palette.wall} />
      </mesh>
    </group>
  );
}

function Plant() {
  return (
    <group position={[2.4, 0, -2.4]}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.18, 0.14, 0.4, 16]} />
        <meshStandardMaterial color={palette.pot} />
      </mesh>
      {[
        [0, 0.7, 0, 0.6],
        [0.1, 0.6, 0.08, 0.45],
        [-0.1, 0.62, -0.06, 0.5],
      ].map(([x, y, z, h]) => (
        <mesh key={`${x}${z}`} position={[x, y, z]}>
          <coneGeometry args={[0.16, h, 7]} />
          <meshStandardMaterial color={palette.leaf} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Mug() {
  return (
    <mesh position={[0.35, 0.8, -2.3]}>
      <cylinderGeometry args={[0.04, 0.035, 0.1, 16]} />
      <meshStandardMaterial color={palette.plastic} />
    </mesh>
  );
}

// Everything in the room that is not a hotspot.
export default function RoomEnvironment() {
  return (
    <>
      <color attach="background" args={[palette.night]} />
      <fog attach="fog" args={[palette.night, 7, 16]} />
      <ambientLight intensity={0.55} color="#9fb3d6" />
      <hemisphereLight args={["#2a3f63", "#0b1220", 0.6]} />
      <directionalLight position={[2, 3, -6]} intensity={0.35} color="#9fc4ff" />

      <Shell />
      <CityWindow />
      <Desk />
      <Chair />
      <DeskLamp />
      <DeskMat />
      <MechanicalKeyboard />
      <Mouse />
      <Plant />
      <Mug />

      {/* Rendered once: the room is static, so shadows never need updating. */}
      <ContactShadows
        position={[0, 0.003, -1.8]}
        scale={6}
        far={1.5}
        blur={2.5}
        opacity={0.55}
        frames={1}
      />
    </>
  );
}
