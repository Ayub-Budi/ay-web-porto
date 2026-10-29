"use client";

import { useEffect } from "react";

// Full-screen cover shown until the room has loaded and drawn its first
// frame, so visitors step into a finished room instead of watching it
// assemble. Also rendered in the server HTML, so the flat layout never
// flashes before 3D takes over.
export default function RoomLoader({
  label,
  progress,
  done,
}: Readonly<{ label: string; progress: number | null; done: boolean }>) {
  // Hold the page still while covered, so the visitor starts at the top.
  useEffect(() => {
    if (done) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [done]);

  const percent = Math.round(progress ?? 0);

  return (
    <div
      id="room-loader"
      role="status"
      aria-live="polite"
      aria-hidden={done}
      className={`fixed inset-0 z-[60] grid place-items-center bg-night transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Without JavaScript the room never loads; show the page instead. */}
      <noscript>
        <style>{"#room-loader{display:none}"}</style>
      </noscript>
      <div className="flex w-[min(320px,80vw)] flex-col gap-4">
        <p className="text-lg font-extrabold tracking-tight">Ayub Budi Santoso</p>
        <div className="h-1 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-sodium transition-[width] duration-500"
            style={{ width: `${Math.max(percent, 4)}%` }}
          />
        </div>
        <p className="flex justify-between text-sm text-fog">
          <span>{label}</span>
          <span>{percent}%</span>
        </p>
      </div>
    </div>
  );
}
