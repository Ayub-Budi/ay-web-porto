"use client";

import { useSyncExternalStore } from "react";
import type { QualityProfile } from "../domain/quality";
import { browserQualityDetector } from "./browser-quality-detector";

// Detected once per page load and shared by everything that needs it.
let detected: QualityProfile | undefined;
const getQuality = () => (detected ??= browserQualityDetector.detect());
const noopSubscribe = () => () => {};

// Null on the server, where the 2D layout is rendered.
export const useQuality = (): QualityProfile | null =>
  useSyncExternalStore(noopSubscribe, getQuality, () => null);
