"use client";

import { useEffect, useMemo, useState } from "react";
import { useThree } from "@react-three/fiber";
import { BOARD } from "../scene/board-layout";
import { CanvasSurface } from "./canvas-surface";
import { drawRouteBoard, type RouteBoardData } from "./draw-route-board";

// The page's own typeface (next/font exposes it as a CSS variable).
const pageFont = () =>
  getComputedStyle(document.body).getPropertyValue("--font-overpass").trim() ||
  "sans-serif";

// Repaints only when the active stop changes, then requests a single frame.
export function useRouteBoardTexture(data: RouteBoardData, active: number) {
  const invalidate = useThree((state) => state.invalidate);
  const maxAnisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy());
  const surface = useMemo(
    () => new CanvasSurface(BOARD.canvas.width, BOARD.canvas.height),
    [],
  );
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => live && setFontsReady(true));
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    surface.setAnisotropy(Math.min(8, maxAnisotropy));
  }, [surface, maxAnisotropy]);

  useEffect(() => {
    surface.paint((ctx) => drawRouteBoard(ctx, data, active, pageFont()));
    invalidate();
  }, [surface, data, active, fontsReady, invalidate]);

  useEffect(() => () => surface.dispose(), [surface]);

  return surface.texture;
}
