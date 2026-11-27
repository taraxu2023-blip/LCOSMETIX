"use client";

import type { CSSProperties, PointerEvent } from "react";

const columns = 4;
const rows = 6;
const fragments = Array.from({ length: columns * rows }, (_, index) => {
  const row = Math.floor(index / columns);
  const column = index % columns;
  return {
    index,
    clip: `inset(${row / rows * 100}% ${(columns - column - 1) / columns * 100}% ${(rows - row - 1) / rows * 100}% ${column / columns * 100}%)`,
    x: (column - (columns - 1) / 2) * 5.8,
    y: (row - (rows - 1) / 2) * 3.4,
    rotate: (column - 1.5) * 1.2 + (row - 2.5) * 0.35,
  };
});

/** Decorative split-and-reassemble treatment using the supplied transparent product image. */
export default function CapsuleMenuVisual({ src, index = 0 }: { src: string; index?: number }) {
  return <span className="capsule-menu-visual" aria-hidden="true">
    <img className="capsule-menu-whole" src={src} alt="" width="320" height="463" draggable={false} />
    {fragments.map((fragment) => <img
      key={fragment.index}
      className="capsule-menu-fragment"
      src={src}
      alt=""
      width="320"
      height="463"
      draggable={false}
      style={{
        clipPath: fragment.clip,
        "--fragment-x": `${fragment.x}px`,
        "--fragment-y": `${fragment.y}px`,
        "--fragment-rotate": `${fragment.rotate * (index % 2 === 0 ? 1 : -1)}deg`,
        "--fragment-delay": `${(fragment.index + index * 3) % (columns * rows) * 5}ms`,
      } as CSSProperties}
    />)}
  </span>;
}

/** Mouse-only CSS-variable updates keep pointer feedback outside React rendering. */
export function capsulePointerMove(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const link = event.currentTarget;
  const bounds = link.getBoundingClientRect();
  if (bounds.width === 0 || bounds.height === 0) return;
  const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
  const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
  link.style.setProperty("--capsule-pointer-x", `${(x * 3.5).toFixed(2)}px`);
  link.style.setProperty("--capsule-pointer-y", `${(y * 3).toFixed(2)}px`);
  link.style.setProperty("--capsule-pointer-rotate", `${(x * 4).toFixed(2)}deg`);
}

export function capsulePointerLeave(event: PointerEvent<HTMLAnchorElement>) {
  const style = event.currentTarget.style;
  style.removeProperty("--capsule-pointer-x");
  style.removeProperty("--capsule-pointer-y");
  style.removeProperty("--capsule-pointer-rotate");
}
