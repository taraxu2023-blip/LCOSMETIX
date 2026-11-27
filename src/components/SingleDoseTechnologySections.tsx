import type { Product } from "../data/products";
import { technologyPrinciples, technologyStructureCopy } from "../data/technology";

export default function SingleDoseTechnologySections({ product, showPrinciples = true }: { product: Pick<Product, "layers" | "media">; showPrinciples?: boolean }) {
  return <>
    <section className="inner-container layer-section technology-structure" id="five-layer-structure" aria-labelledby="technology-layers-heading">
      <div className="inner-split">
        <div><p className="eyebrow">{technologyStructureCopy.eyebrow}</p><h2 id="technology-layers-heading">{technologyStructureCopy.headline.line1}<br /><span>{technologyStructureCopy.headline.line2}</span></h2><p>{technologyStructureCopy.introduction}</p></div>
        <img src={product.media.structure} alt={technologyStructureCopy.imageAlt} width="1834" height="1601" loading="lazy" />
      </div>
      <ol className="layer-list">{product.layers.map((layer, index) => <li key={`${layer.material}-${index}`}><span>0{index + 1}</span><div><h3 translate={layer.material === "PE" || layer.material === "EVOH" ? "no" : undefined}>{layer.material}</h3><p>{layer.description}</p></div></li>)}</ol>
    </section>
    {showPrinciples && <section className="inner-container technology-section technology-principles-section" id="how-it-works" aria-labelledby="technology-principles-heading">
      <p className="eyebrow">SINGLE-DOSE TECHNOLOGY</p>
      <h2 id="technology-principles-heading">How it works.</h2>
      <ol className="technology-principles">{technologyPrinciples.map((principle, index) => <li key={principle.title}><span>0{index + 1}</span><h3>{principle.title}</h3><p>{principle.description}</p></li>)}</ol>
    </section>}
  </>;
}
