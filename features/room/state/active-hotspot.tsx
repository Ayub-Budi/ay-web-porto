"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { NavigationStore } from "./navigation-store";

interface ActiveHotspot {
  store: NavigationStore;
  ids: string[];
}

const ActiveHotspotContext = createContext<ActiveHotspot | null>(null);

// Lets objects in the scene react to where the visitor is, by hotspot id,
// without knowing about scroll or the order of the room.
export function ActiveHotspotProvider({
  store,
  ids,
  children,
}: Readonly<ActiveHotspot & { children: ReactNode }>) {
  return (
    <ActiveHotspotContext.Provider value={{ store, ids }}>
      {children}
    </ActiveHotspotContext.Provider>
  );
}

const noop = () => () => {};

export function useActiveHotspotId(): string | null {
  const value = useContext(ActiveHotspotContext);
  const index = useSyncExternalStore(
    value?.store.subscribe ?? noop,
    () => value?.store.get() ?? -1,
    () => -1,
  );
  return value?.ids[index] ?? null;
}
