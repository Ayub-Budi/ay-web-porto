"use client";

import { useSyncExternalStore } from "react";

export type ViewMode = "3d" | "2d";

const STORAGE_KEY = "ayub:view-mode";
const listeners = new Set<() => void>();
let mode: ViewMode | undefined;

// The visitor's choice is a per-browser convenience: storage can be missing
// (private mode, blocked site data), in which case 3D is the default.
function read(): ViewMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === "2d" ? "2d" : "3d";
  } catch {
    return "3d";
  }
}

export const viewMode = {
  get: (): ViewMode => (mode ??= read()),
  set(next: ViewMode) {
    mode = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

// Null on the server and during hydration, so the first paint matches.
export const useViewMode = (): ViewMode | null =>
  useSyncExternalStore(viewMode.subscribe, viewMode.get, () => null);
