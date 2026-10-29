"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const immersiveSurface = {
  // Glass card for reading sections over the room. On phones it is a short
  // bottom sheet so the room stays visible above it.
  card: "reveal-on-scroll pointer-events-auto relative w-full md:w-[min(480px,44vw)] rounded-lg border border-line bg-night/85 p-5 backdrop-blur-md md:p-8",
  // Straight on the scene, carried by the vignette behind it.
  bare: "pointer-events-auto w-full md:w-[min(640px,52vw)]",
};

// Collapsed sheet height on phones: the room keeps the upper ~60%.
const SHEET = "max-md:max-h-[38svh] max-md:overflow-hidden";

// One screen of the scroll track. In 3D mode the section lets clicks through
// to the canvas and only the panel itself takes pointer input.
export default function ContentPanel({
  id,
  index,
  immersive,
  position,
  surface = "card",
  labels,
  children,
}: Readonly<{
  id: string;
  index: number;
  immersive: boolean;
  // Place within a run of steps of the same section. In 2D, steps after
  // the first drop their spacing so a timeline can run through them.
  position: "single" | "first" | "middle" | "last";
  surface?: "card" | "bare";
  labels: { more: string; less: string };
  children: ReactNode;
}>) {
  const sheet = immersive && surface === "card";
  const body = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [clipped, setClipped] = useState(false);

  // Offer "read more" only when the collapsed sheet actually cuts content.
  useEffect(() => {
    const element = body.current;
    if (!sheet || !element) return;
    const observer = new ResizeObserver(() => {
      setClipped(element.scrollHeight > element.clientHeight + 1);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [sheet]);

  return (
    <section
      id={id}
      data-hotspot-index={index}
      className={`relative scroll-mt-14 max-w-[1200px] mx-auto px-4 sm:px-8 ${
        immersive
          ? // Bottom padding clears the floating section nav.
            "min-h-svh flex items-end md:items-center pt-20 pb-28 md:pb-24 pointer-events-none"
          : {
              single: "py-16 md:py-24 first:pt-28",
              first: "pt-16 md:pt-24",
              middle: "",
              last: "pb-16 md:pb-24",
            }[position]
      }`}
    >
      {/* data-immersive lets panels adapt with group-data-[immersive=true]:… */}
      <div
        data-immersive={immersive}
        className={`group ${immersive ? immersiveSurface[surface] : "w-full"}`}
      >
        <div ref={body} className={sheet && !expanded ? SHEET : undefined}>
          {children}
        </div>
        {sheet && (clipped || expanded) && (
          <div
            className={`md:hidden ${
              expanded
                ? "pt-4"
                : "absolute inset-x-0 bottom-0 rounded-b-lg bg-gradient-to-t from-night via-night/95 to-transparent px-5 pb-4 pt-10"
            }`}
          >
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((open) => !open)}
              className="rounded-full border border-line bg-night px-4 py-2 text-sm font-semibold text-ink"
            >
              {expanded ? labels.less : labels.more}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
