"use client";

import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { type Product, productHref } from "../data/products";

export default function ColorCollection({ product, headingLevel = 3 }: { product: Product; headingLevel?: 2 | 3 }) {
  const [selected, setSelected] = useState(0);
  const color = product.colors[selected];
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="color-collection">
      <div className="color-feature">
        <span className="product-name">{product.brand}</span>
        <img
          src={color.src}
          alt={`${color.label} ${product.brand} cosmetic container concept`}
          width="320"
          height="455"
        />
        <span className="color-name" aria-live="polite">
          {color.label} <span>{String(selected + 1).padStart(2, "0")} / {String(product.colors.length).padStart(2, "0")}</span>
        </span>
      </div>
      <div className="color-copy">
        <p className="eyebrow">A FORM YOUR BRAND CAN OWN</p>
        <Heading>
          Small format.
          <br />
          Full of personality.
        </Heading>
        <p>
          A distinctive capsule for your next skincare idea. Explore colors,
          textures and a format made to stand out.
        </p>
        <div
          className="color-selector"
          role="group"
          aria-label="Capsule colors"
        >
          {product.colors.map((option, index) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
              aria-label={`View ${option.label} capsule`}
              style={{ "--swatch": option.swatch } as React.CSSProperties}
            >
              <span />
            </button>
          ))}
        </div>
        <p className="fine-print">
          Color concepts shown. Final options agreed per project.
        </p>
        <a className="text-link" href={productHref(product)}>
          Explore {product.brand} <ArrowUpRight size={21} />
        </a>
      </div>
    </div>
  );
}
