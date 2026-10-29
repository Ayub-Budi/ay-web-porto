import type { Token } from "./highlight-html";

export const SCREEN = { width: 1600, height: 888 } as const;

// VS Code Dark+ chrome.
const ui = {
  titleBar: "#3c3c3c",
  activityBar: "#333333",
  sideBar: "#252526",
  editor: "#1e1e1e",
  tabInactive: "#2d2d2d",
  selection: "#37373d",
  currentLine: "#282828",
  statusBar: "#007acc",
  text: "#cccccc",
  muted: "#858585",
  lineNumberActive: "#c6c6c6",
  cursor: "#aeafad",
} as const;

const MONO = "Consolas, 'Cascadia Code', Menlo, 'Courier New', monospace";
const SANS = "'Segoe UI', system-ui, sans-serif";

const TITLE_H = 36;
const ACTIVITY_W = 56;
const SIDEBAR_W = 280;
const TABS_H = 40;
const CRUMBS_H = 26;
const STATUS_H = 28;
const GUTTER_W = 64;
const MINIMAP_W = 90;
const LINE_H = 31;
const FONT_SIZE = 21;

const EDITOR_X = ACTIVITY_W + SIDEBAR_W;
const EDITOR_Y = TITLE_H + TABS_H + CRUMBS_H;

const files: { name: string; depth: number; folder?: "open" | "closed"; color?: string; active?: boolean }[] = [
  { name: "app", depth: 0, folder: "closed" },
  { name: "components", depth: 0, folder: "closed" },
  { name: "public", depth: 0, folder: "open" },
  { name: "profile.jpg", depth: 1, color: "#a074c4" },
  { name: "index.html", depth: 0, color: "#e44d26", active: true },
  { name: "script.js", depth: 0, color: "#f1e05a" },
  { name: "style.css", depth: 0, color: "#42a5f5" },
  { name: "README.md", depth: 0, color: "#519aba" },
];

function drawChrome(ctx: CanvasRenderingContext2D, title: string) {
  const { width, height } = SCREEN;
  ctx.textBaseline = "middle";

  // Title bar with menu and window title.
  ctx.fillStyle = ui.titleBar;
  ctx.fillRect(0, 0, width, TITLE_H);
  ctx.fillStyle = "#3e9fe0";
  ctx.fillRect(14, 10, 16, 16);
  ctx.font = `15px ${SANS}`;
  ctx.fillStyle = ui.text;
  let x = 46;
  for (const item of ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"]) {
    ctx.fillText(item, x, TITLE_H / 2);
    x += ctx.measureText(item).width + 18;
  }
  ctx.textAlign = "center";
  ctx.fillText(title, width / 2 + 120, TITLE_H / 2);
  ctx.textAlign = "left";

  // Activity bar: explorer active, the rest as plain glyph blocks.
  ctx.fillStyle = ui.activityBar;
  ctx.fillRect(0, TITLE_H, ACTIVITY_W, height - TITLE_H - STATUS_H);
  [0, 1, 2, 3, 4].forEach((i) => {
    const y = TITLE_H + 14 + i * 56;
    ctx.fillStyle = i === 0 ? "#ffffff" : "#858585";
    ctx.fillRect(16, y + 6, 24, 24);
    ctx.fillStyle = ui.activityBar;
    ctx.fillRect(21, y + 11, 14, 14);
  });
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, TITLE_H + 14, 3, 36);

  // Explorer.
  ctx.fillStyle = ui.sideBar;
  ctx.fillRect(ACTIVITY_W, TITLE_H, SIDEBAR_W, height - TITLE_H - STATUS_H);
  ctx.font = `13px ${SANS}`;
  ctx.fillStyle = "#bbbbbb";
  ctx.fillText("EXPLORER", ACTIVITY_W + 20, TITLE_H + 22);
  ctx.font = `bold 13px ${SANS}`;
  ctx.fillText("⌄ PORTFOLIO", ACTIVITY_W + 10, TITLE_H + 54);
  ctx.font = `15px ${SANS}`;
  files.forEach((file, i) => {
    const y = TITLE_H + 84 + i * 28;
    const indent = ACTIVITY_W + 22 + file.depth * 16;
    if (file.active) {
      ctx.fillStyle = ui.selection;
      ctx.fillRect(ACTIVITY_W, y - 14, SIDEBAR_W, 28);
    }
    if (file.folder) {
      ctx.fillStyle = ui.text;
      ctx.fillText(file.folder === "open" ? "⌄" : "›", indent, y);
    } else {
      ctx.fillStyle = file.color ?? ui.text;
      ctx.fillRect(indent + 2, y - 5, 10, 10);
    }
    ctx.fillStyle = ui.text;
    ctx.fillText(file.name, indent + 20, y);
  });

  // Tabs.
  ctx.fillStyle = ui.sideBar;
  ctx.fillRect(EDITOR_X, TITLE_H, width - EDITOR_X, TABS_H);
  const tabs = [
    { name: "index.html", color: "#e44d26", active: true },
    { name: "style.css", color: "#42a5f5", active: false },
  ];
  x = EDITOR_X;
  for (const tab of tabs) {
    const w = 170;
    ctx.fillStyle = tab.active ? ui.editor : ui.tabInactive;
    ctx.fillRect(x, TITLE_H, w, TABS_H);
    ctx.fillStyle = tab.color;
    ctx.fillRect(x + 14, TITLE_H + 15, 10, 10);
    ctx.fillStyle = tab.active ? "#ffffff" : "#969696";
    ctx.fillText(tab.name, x + 32, TITLE_H + TABS_H / 2);
    ctx.fillText("×", x + w - 24, TITLE_H + TABS_H / 2);
    x += w + 1;
  }

  // Breadcrumbs and editor background.
  ctx.fillStyle = ui.editor;
  ctx.fillRect(EDITOR_X, TITLE_H + TABS_H, width - EDITOR_X, height - TITLE_H - TABS_H - STATUS_H);
  ctx.font = `14px ${SANS}`;
  ctx.fillStyle = "#a9a9a9";
  ctx.fillText("index.html  ›  html  ›  body  ›  main", EDITOR_X + 18, TITLE_H + TABS_H + CRUMBS_H / 2);
}

function drawStatusBar(ctx: CanvasRenderingContext2D, line: number, column: number) {
  const { width, height } = SCREEN;
  const y = height - STATUS_H / 2;
  ctx.fillStyle = ui.statusBar;
  ctx.fillRect(0, height - STATUS_H, width, STATUS_H);
  ctx.font = `14px ${SANS}`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("⑂ main", 14, y);
  ctx.fillText("⊗ 0  ⚠ 0", 110, y);
  ctx.textAlign = "right";
  ctx.fillText(`Ln ${line}, Col ${column}    Spaces: 2    UTF-8    CRLF    HTML`, width - 16, y);
  ctx.textAlign = "left";
}

// Line and column reached after typing `visible` characters (newlines count as one).
function locateCursor(lines: Token[][], visible: number) {
  let remaining = visible;
  for (let row = 0; row < lines.length; row++) {
    const length = lines[row].reduce((sum, token) => sum + token.text.length, 0);
    if (remaining <= length || row === lines.length - 1) {
      return { line: row, column: Math.min(remaining, length) };
    }
    remaining -= length + 1;
  }
  return { line: 0, column: 0 };
}

// Draws the editor with the first `visible` characters of the code typed in.
export function drawVsCode(
  ctx: CanvasRenderingContext2D,
  lines: Token[][],
  visible: number,
  title: string,
) {
  drawChrome(ctx, title);

  ctx.font = `${FONT_SIZE}px ${MONO}`;
  const charWidth = ctx.measureText("M").width;
  const codeX = EDITOR_X + GUTTER_W + 16;
  const cursor = locateCursor(lines, visible);
  const cursorY = EDITOR_Y + 14 + cursor.line * LINE_H;

  ctx.fillStyle = ui.currentLine;
  ctx.fillRect(EDITOR_X + GUTTER_W, cursorY, SCREEN.width - EDITOR_X - GUTTER_W - MINIMAP_W, LINE_H);

  let remaining = visible;
  lines.slice(0, cursor.line + 1).forEach((line, row) => {
    const y = EDITOR_Y + 14 + row * LINE_H + LINE_H / 2;
    let x = codeX;
    for (const token of line) {
      if (remaining <= 0) break;
      const text = token.text.slice(0, remaining);
      ctx.fillStyle = token.color;
      ctx.fillText(text, x, y);
      x += text.length * charWidth;
      remaining -= text.length;
    }
    remaining -= 1; // the newline
  });

  ctx.textAlign = "right";
  for (let row = 0; row <= cursor.line; row++) {
    ctx.fillStyle = row === cursor.line ? ui.lineNumberActive : ui.muted;
    ctx.fillText(String(row + 1), EDITOR_X + GUTTER_W, EDITOR_Y + 14 + row * LINE_H + LINE_H / 2);
  }
  ctx.textAlign = "left";

  ctx.fillStyle = ui.cursor;
  ctx.fillRect(codeX + cursor.column * charWidth, cursorY + 4, 2, LINE_H - 8);

  // Minimap: one thin bar per token.
  const mapX = SCREEN.width - MINIMAP_W + 10;
  lines.slice(0, cursor.line + 1).forEach((line, row) => {
    let x = mapX;
    for (const token of line) {
      const w = token.text.length * 1.4;
      if (token.text.trim()) {
        ctx.fillStyle = token.color;
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x, EDITOR_Y + 14 + row * 5, w, 3);
      }
      x += w;
    }
  });
  ctx.globalAlpha = 1;

  drawStatusBar(ctx, cursor.line + 1, cursor.column + 1);
}
