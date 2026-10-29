import { portraitStop } from "../scene/camera-math";
import type { HotspotFactory } from "../domain/hotspot";
import { Breadboard } from "../scene/lazy-models";
import IotPanel from "../panels/IotPanel";

const IOT_TECH = ["C/C++", "Arduino", "ESP32"];

export const iotHotspot: HotspotFactory = ({ dict }) => ({
  id: "iot",
  label: dict.sections.iot,
  camera: { position: [-0.15, 1.28, -1.1], lookAt: [-0.8, 0.8, -1.87], portrait: portraitStop([-0.55, 0.79, -1.98], [0.3, 0.7, 1], 0.75) },
  model: <Breadboard />,
  panel: <IotPanel dict={dict.iot} techStack={IOT_TECH} />,
});
