"use client";

import { useQuality } from "../state/quality-snapshot";
import { useViewMode, viewMode, type ViewMode } from "../state/view-mode";

// Hidden on devices that cannot run the room: they only get the 2D page.
export default function ViewModeToggle({
  labels,
}: Readonly<{ labels: { group: string; "3d": string; "2d": string } }>) {
  const quality = useQuality();
  const mode = useViewMode();
  if (!quality?.render3D || !mode) return null;

  return (
    <div
      role="group"
      aria-label={labels.group}
      className="flex rounded-sm border border-line p-0.5 text-sm"
    >
      {(["3d", "2d"] as ViewMode[]).map((option) => {
        const selected = mode === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => viewMode.set(option)}
            className={`rounded-[3px] px-2 py-0.5 transition-colors ${
              selected ? "bg-sodium text-night font-semibold" : "text-fog hover:text-ink"
            }`}
          >
            {labels[option]}
          </button>
        );
      })}
    </div>
  );
}
