"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Html } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { Vec3 } from "../domain/hotspot";

// Makes any object in the room clickable without the object knowing about
// it, and names the section it opens while the pointer is over it.
export default function Selectable({
  label,
  onSelect,
  children,
}: Readonly<{ label: string; onSelect: () => void; children: ReactNode }>) {
  const [hoverAt, setHoverAt] = useState<Vec3 | null>(null);

  useEffect(() => () => void (document.body.style.cursor = ""), []);

  return (
    <group
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHoverAt([e.point.x, e.point.y, e.point.z]);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "";
        setHoverAt(null);
      }}
    >
      {children}
      {hoverAt && (
        <Html position={hoverAt} zIndexRange={[40, 30]} style={{ pointerEvents: "none" }}>
          <span className="block -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap rounded-full bg-sodium px-3 py-1 text-sm font-semibold text-night">
            {label}
          </span>
        </Html>
      )}
    </group>
  );
}
