// Minimal HTML highlighter using VS Code's Dark+ colors. Enough for the
// handwritten snippet on the monitor, not a general-purpose parser.

export const darkPlus = {
  text: "#d4d4d4",
  punctuation: "#808080",
  tag: "#569cd6",
  attribute: "#9cdcfe",
  value: "#ce9178",
  comment: "#6a9955",
} as const;

export interface Token {
  text: string;
  color: string;
}

const MARKUP = /<!--[\s\S]*?-->|<![^>]*>|<\/?[a-zA-Z][^>]*>|[^<]+/g;
const TAG = /^(<\/?|<!)([a-zA-Z][\w-]*)([\s\S]*?)(\/?>)$/;
const ATTRIBUTES = /(\s+)|("[^"]*")|(=)|([^\s="]+)/g;

function tagTokens(markup: string): Token[] {
  const match = TAG.exec(markup);
  if (!match) return [{ text: markup, color: darkPlus.text }];
  const [, open, name, attributes, close] = match;
  const tokens: Token[] = [
    { text: open, color: darkPlus.punctuation },
    { text: name, color: darkPlus.tag },
  ];
  for (const [part, space, value, equals] of attributes.matchAll(ATTRIBUTES)) {
    const color = space
      ? darkPlus.text
      : value
        ? darkPlus.value
        : equals
          ? darkPlus.text
          : darkPlus.attribute;
    tokens.push({ text: part, color });
  }
  tokens.push({ text: close, color: darkPlus.punctuation });
  return tokens;
}

export function highlightHtml(source: string): Token[] {
  const tokens: Token[] = [];
  for (const [part] of source.matchAll(MARKUP)) {
    if (part.startsWith("<!--")) tokens.push({ text: part, color: darkPlus.comment });
    else if (part.startsWith("<")) tokens.push(...tagTokens(part));
    else tokens.push({ text: part, color: darkPlus.text });
  }
  return tokens;
}

// Splits tokens on newlines so each line can be drawn on its own row.
export function toLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]];
  for (const token of tokens) {
    token.text.split("\n").forEach((piece, i) => {
      if (i > 0) lines.push([]);
      if (piece) lines[lines.length - 1].push({ text: piece, color: token.color });
    });
  }
  return lines;
}
