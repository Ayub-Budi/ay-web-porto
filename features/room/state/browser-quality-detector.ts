import type { QualityDetector, QualityProfile } from "../domain/quality";

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return gl !== null;
  } catch {
    return false;
  }
};

// Picks a tier from cheap signals before the canvas exists.
export const browserQualityDetector: QualityDetector = {
  detect(): QualityProfile {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 4;
    const memory = nav.deviceMemory ?? 4;
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;

    if (!hasWebGL() || cores <= 2 || memory <= 2) {
      return { tier: "low", render3D: false, dpr: [1, 1], antialias: false, reducedMotion };
    }
    if (smallScreen || cores <= 4 || memory <= 4) {
      return { tier: "medium", render3D: true, dpr: [1, 1.25], antialias: false, reducedMotion };
    }
    return { tier: "high", render3D: true, dpr: [1, 1.75], antialias: true, reducedMotion };
  },
};
