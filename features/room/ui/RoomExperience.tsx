"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { RoomContent } from "../domain/room-content";
import type { HotspotDefinition } from "../domain/hotspot";
import { buildHotspots } from "../hotspots/registry";
import { createNavigationStore } from "../state/navigation-store";
import { useQuality } from "../state/quality-snapshot";
import { useViewMode } from "../state/view-mode";
import ContentPanel from "./ContentPanel";
import SectionNav from "./SectionNav";
import Vignette from "./Vignette";
import CalloutLayer from "./CalloutLayer";
import { createCalloutRegistry } from "../state/callout-registry";

const sectionOf = (hotspot: HotspotDefinition) => hotspot.section ?? hotspot.id;

function positionInSection(hotspots: HotspotDefinition[], index: number) {
  const section = sectionOf(hotspots[index]);
  const prev = index > 0 && sectionOf(hotspots[index - 1]) === section;
  const next = index < hotspots.length - 1 && sectionOf(hotspots[index + 1]) === section;
  if (prev && next) return "middle";
  if (prev) return "last";
  if (next) return "first";
  return "single";
}

const RoomCanvas = dynamic(() => import("../scene/RoomCanvas"), { ssr: false });

export default function RoomExperience({
  content,
  dict,
  locale,
}: Readonly<{ content: RoomContent; dict: Dictionary; locale: Locale }>) {
  const hotspots = useMemo(
    () => buildHotspots({ content, dict, locale }),
    [content, dict, locale],
  );
  const [store] = useState(() => createNavigationStore());
  const [callouts] = useState(() => createCalloutRegistry());
  const quality = useQuality();
  const mode = useViewMode();
  // The server and hydration render 2D; the room mounts once the device and
  // the visitor's chosen mode are known.
  const immersive = mode === "3d" && quality?.render3D === true;

  // Scroll position decides the active hotspot.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-hotspot-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            store.set(Number(entry.target.getAttribute("data-hotspot-index")));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [hotspots, immersive, store]);

  const select = useCallback(
    (index: number) => {
      const id = hotspots[index]?.id;
      if (!id) return;
      document.getElementById(id)?.scrollIntoView({
        behavior: quality?.reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [hotspots, quality],
  );

  return (
    <div className="relative">
      {immersive && quality && (
        <div aria-hidden className="sticky top-0 h-svh -mb-[100svh]">
          <RoomCanvas
            hotspots={hotspots}
            store={store}
            quality={quality}
            onSelect={select}
            callouts={callouts}
            loadingLabel={dict.room.loading}
          />
          <Vignette hotspots={hotspots} store={store} />
          <CalloutLayer
            hotspots={hotspots}
            store={store}
            registry={callouts}
            onSelect={(id) => select(hotspots.findIndex((h) => h.id === id))}
          />
        </div>
      )}

      {hotspots.map((hotspot, index) => (
        <ContentPanel
          key={hotspot.id}
          id={hotspot.id}
          index={index}
          immersive={immersive}
          position={positionInSection(hotspots, index)}
          surface={hotspot.panelStyle}
          labels={{ more: dict.room.readMore, less: dict.room.showLess }}
        >
          {hotspot.panel}
        </ContentPanel>
      ))}

      <SectionNav
        hotspots={hotspots}
        store={store}
        onSelect={select}
        label={dict.room.sectionsLabel}
      />
    </div>
  );
}
