import { BOARD, stopFraction } from "../scene/board-layout";

export interface RouteBoardStop {
  date: string;
  name: string;
  title: string;
  detail: string;
}

export interface RouteBoardData {
  title: string;
  span: string;
  hint: string;
  stops: RouteBoardStop[];
}

const colors = {
  board: "#13233a",
  track: "#2c3f5c",
  divider: "#24344d",
  ink: "#e9eef5",
  fog: "#8a9bb3",
  sodium: "#f2902b",
};

const PAD = 90;
const LINE_Y = 470;

// Largest size up to `max` at which `text` fits in `width`.
function fitFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  weight: string,
  max: number,
  width: number,
  family: string,
) {
  let size = max;
  do {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= width) break;
    size -= 2;
  } while (size > 28);
}

// Draws the transit-map board. `active` is the stop being read, or -1 for
// the overview (whole line lit, with a hint to start scrolling).
export function drawRouteBoard(
  ctx: CanvasRenderingContext2D,
  data: RouteBoardData,
  active: number,
  family: string,
) {
  const { width, height } = BOARD.canvas;
  const count = data.stops.length;
  const lit = active < 0 ? count - 1 : active;
  const xs = data.stops.map((_, i) => stopFraction(i, count) * width);

  ctx.fillStyle = colors.board;
  ctx.fillRect(0, 0, width, height);
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = colors.ink;
  fitFont(ctx, data.title, "800", 104, width - PAD * 2, family);
  ctx.fillText(data.title, PAD, 160);
  ctx.fillStyle = colors.fog;
  ctx.font = `400 36px ${family}`;
  ctx.fillText(data.span, PAD + 4, 222);

  // Track, then the lit part of it.
  ctx.lineCap = "round";
  ctx.lineWidth = 16;
  ctx.strokeStyle = colors.track;
  ctx.beginPath();
  ctx.moveTo(xs[0], LINE_Y);
  ctx.lineTo(xs[count - 1], LINE_Y);
  ctx.stroke();
  ctx.strokeStyle = colors.sodium;
  ctx.beginPath();
  ctx.moveTo(xs[0], LINE_Y);
  ctx.lineTo(xs[lit], LINE_Y);
  ctx.stroke();

  ctx.textAlign = "center";
  data.stops.forEach((stop, i) => {
    const x = xs[i];
    if (i === active) {
      ctx.fillStyle = "rgba(242, 144, 43, 0.25)";
      ctx.beginPath();
      ctx.arc(x, LINE_Y, 50, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(x, LINE_Y, 28, 0, Math.PI * 2);
    if (i <= lit) {
      ctx.fillStyle = colors.sodium;
      ctx.fill();
    } else {
      ctx.fillStyle = colors.board;
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = colors.track;
      ctx.stroke();
    }

    ctx.fillStyle = colors.fog;
    ctx.font = `400 32px ${family}`;
    ctx.fillText(stop.date, x, LINE_Y + 92);
    ctx.fillStyle = i === active ? colors.ink : colors.fog;
    ctx.font = `700 38px ${family}`;
    ctx.fillText(stop.name, x, LINE_Y + 138);
  });
  ctx.textAlign = "left";

  ctx.fillStyle = colors.divider;
  ctx.fillRect(PAD, 700, width - PAD * 2, 3);

  const current = data.stops[active];
  if (current) {
    ctx.fillStyle = colors.ink;
    fitFont(ctx, current.title, "800", 60, width - PAD * 2, family);
    ctx.fillText(current.title, PAD, 800);
    ctx.fillStyle = colors.sodium;
    ctx.font = `400 38px ${family}`;
    ctx.fillText(current.detail, PAD, 866);
  } else {
    ctx.fillStyle = colors.fog;
    ctx.font = `400 42px ${family}`;
    ctx.fillText(data.hint, PAD, 820);
  }
}
