// Active hotspot index shared between the DOM (scroll, nav) and the canvas
// (camera). Subscribers are notified on change only, never per frame.
export interface NavigationStore {
  get(): number;
  set(index: number): void;
  subscribe(listener: () => void): () => void;
}

export function createNavigationStore(initial = 0): NavigationStore {
  let index = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => index,
    set(next) {
      if (next === index) return;
      index = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
