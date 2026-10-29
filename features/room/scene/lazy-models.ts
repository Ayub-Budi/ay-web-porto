import { lazy } from "react";

const load = () => import("./models");

// React.lazy keeps three.js out of the page bundle: these only resolve when
// rendered inside the canvas, which is itself loaded on demand.
export const Monitor = lazy(() => load().then((m) => ({ default: m.Monitor })));
export const PhotoFrame = lazy(() => load().then((m) => ({ default: m.PhotoFrame })));
export const Bookshelf = lazy(() => load().then((m) => ({ default: m.Bookshelf })));
export const RouteBoard = lazy(() => load().then((m) => ({ default: m.RouteBoard })));
export const Breadboard = lazy(() => load().then((m) => ({ default: m.Breadboard })));
export const DiplomaFrame = lazy(() => load().then((m) => ({ default: m.DiplomaFrame })));
export const Laptop = lazy(() => load().then((m) => ({ default: m.Laptop })));
export const Phone = lazy(() => load().then((m) => ({ default: m.Phone })));
