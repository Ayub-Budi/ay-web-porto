export type QualityTier = "high" | "medium" | "low";

export interface QualityProfile {
  tier: QualityTier;
  // Low tier and missing WebGL fall back to the 2D sections.
  render3D: boolean;
  dpr: [min: number, max: number];
  antialias: boolean;
  reducedMotion: boolean;
}

export interface QualityDetector {
  detect(): QualityProfile;
}
