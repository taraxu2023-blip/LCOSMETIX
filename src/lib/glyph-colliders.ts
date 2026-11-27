export type CollisionRectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/** Trace the rendered ink, including letter gaps and counters, not the text box. */
export function getGlyphRectangles(
  element: HTMLElement,
  origin: DOMRect,
): CollisionRectangle[] {
  const bounds = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(bounds.width);
  canvas.height = Math.ceil(bounds.height);
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context || !canvas.width || !canvas.height) return [];

  context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  context.letterSpacing = style.letterSpacing;
  context.textBaseline = "alphabetic";
  const text = element.textContent ?? "";
  const metrics = context.measureText(text);
  const ascent = metrics.fontBoundingBoxAscent;
  const descent = metrics.fontBoundingBoxDescent;
  const baseline = (bounds.height - ascent - descent) / 2 + ascent;
  context.fillText(text, 0, baseline);

  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  const cell = parseFloat(style.fontSize) < 55 ? 3 : 4;
  const rectangles: CollisionRectangle[] = [];
  let previous = new Map<string, CollisionRectangle>();
  for (let y = 0; y < canvas.height; y += cell) {
    const current = new Map<string, CollisionRectangle>();
    let runStart = -1;
    for (let x = 0; x < canvas.width + cell; x += cell) {
      const px = Math.min(x + Math.floor(cell / 2), canvas.width - 1);
      const py = Math.min(y + Math.floor(cell / 2), canvas.height - 1);
      const filled = x < canvas.width && data[(py * canvas.width + px) * 4 + 3] > 110;
      if (filled && runStart < 0) runStart = x;
      if (!filled && runStart >= 0) {
        const runWidth = Math.min(x, canvas.width) - runStart;
        const key = `${runStart}:${runWidth}`;
        const existing = previous.get(key);
        const rowHeight = Math.min(cell, canvas.height - y);
        if (existing) {
          existing.height += rowHeight;
          current.set(key, existing);
        } else {
          const rectangle = {
            x: bounds.left - origin.left + runStart,
            y: bounds.top - origin.top + y,
            width: runWidth,
            height: rowHeight,
          };
          rectangles.push(rectangle);
          current.set(key, rectangle);
        }
        runStart = -1;
      }
    }
    previous = current;
  }
  return rectangles;
}
