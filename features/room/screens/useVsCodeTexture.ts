"use client";

import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { highlightHtml, toLines } from "./highlight-html";
import { drawVsCode, SCREEN } from "./draw-vscode";
import { CanvasSurface } from "./canvas-surface";

const CHARS_PER_TICK = 4;
const TICK_MS = 45;

// Paints a VS Code window into a texture and "types" the source into it.
// Each tick redraws once and requests one frame; when typing finishes the
// texture is left alone and the scene goes back to idle.
export function useVsCodeTexture(source: string, title: string) {
  const invalidate = useThree((state) => state.invalidate);
  const maxAnisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy());
  const surface = useMemo(() => new CanvasSurface(SCREEN.width, SCREEN.height), []);

  useEffect(() => {
    surface.setAnisotropy(Math.min(8, maxAnisotropy));
  }, [surface, maxAnisotropy]);

  useEffect(() => {
    const lines = toLines(highlightHtml(source));
    const total = source.length;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = reducedMotion ? total : 0;

    const paint = () => {
      surface.paint((ctx) => drawVsCode(ctx, lines, visible, title));
      invalidate();
    };
    paint();
    if (visible >= total) return;

    const timer = window.setInterval(() => {
      visible = Math.min(total, visible + CHARS_PER_TICK);
      paint();
      if (visible >= total) window.clearInterval(timer);
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [surface, source, title, invalidate]);

  useEffect(() => () => surface.dispose(), [surface]);

  return surface.texture;
}
