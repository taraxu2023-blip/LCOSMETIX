import type { ProductFeature } from "../data/products";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function ProductBenefits({ features }: { features: ProductFeature[] }) {
  return <section className="inner-container product-benefits-story" id="advantages" aria-labelledby="product-benefits-heading">
    <header className="product-benefits-heading">
      <p className="eyebrow">THE BOBII BALL ADVANTAGE</p>
      <h2 id="product-benefits-heading">Five advantages.<br /><span>One BOBII BALL.</span></h2>
    </header>
    <div className="product-benefits-list">{features.map((feature, index) => <article className="benefit-story" id={`advantage-${feature.id}`} key={feature.id}>
      <figure className={`benefit-media benefit-media--${feature.media.layout}`}>
        {feature.media.images.map((image) => <img key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />)}
      </figure>
      <div className="benefit-story-copy">
        <span className="benefit-story-index">{String(index + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}</span>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
        <ul>{feature.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        {feature.id === "freshness-protection" && <a className="text-link" href="#five-layer-structure">Explore the five-layer structure <ArrowUpRight size="1.1875rem" /></a>}
      </div>
    </article>)}</div>
  </section>;
}
