import { CanvasTexture, SRGBColorSpace } from "three";

// An offscreen 2D canvas and the texture that shows it in the scene.
export class CanvasSurface {
  readonly texture: CanvasTexture;
  private readonly ctx: CanvasRenderingContext2D | null;

  constructor(width: number, height: number) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext("2d");
    this.texture = new CanvasTexture(canvas);
    this.texture.colorSpace = SRGBColorSpace;
  }

  setAnisotropy(value: number) {
    this.texture.anisotropy = value;
  }

  paint(draw: (ctx: CanvasRenderingContext2D) => void) {
    if (!this.ctx) return;
    draw(this.ctx);
    this.texture.needsUpdate = true;
  }

  dispose() {
    this.texture.dispose();
  }
}
