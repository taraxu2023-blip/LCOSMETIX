import { ArrowUpRight, Plus } from "@phosphor-icons/react/dist/ssr";
import { getPublishedConceptCollections } from "../data/concepts";

const developmentLabels = {
  concept: "Development concept",
  sampling: "Sampling available",
  validated: "Development validated",
} as const;

export default function ConceptLibrary({ productId }: { productId: string }) {
  const collections = getPublishedConceptCollections(productId);
  if (collections.length === 0) return null;
  const productCount = collections.reduce((count, collection) => count + collection.productNames.length, 0);

  return <section id="product-concepts" className="inner-container concept-library" aria-labelledby="concept-library-heading">
    <div className="inner-split concept-library-intro">
      <div>
        <p className="eyebrow">PRODUCT INNOVATIONS</p>
        <h2 id="concept-library-heading">A starting point.<br /><span>Made to develop.</span></h2>
      </div>
      <div>
        <p>{collections.length} collections. {productCount} product concepts. Explore formulation directions across skincare, facial oils, cleansing, hybrid makeup and sun care.</p>
        <p>Each concept is a starting point for brand-specific development. Formula compatibility, ingredients, claims, samples and manufacturing readiness are confirmed for your project.</p>
      </div>
    </div>
    <p className="concept-illustration-note">Illustrative container colors. Final formulation and packaging specifications are agreed per project.</p>
    <div className="concept-collection-grid">
      {collections.map((collection, index) => <article className="concept-collection-card" id={`concept-${collection.id}`} key={collection.id}>
        <div className="concept-card-top">
          <span className="concept-card-index">{String(index + 1).padStart(2, "0")}</span>
          <img src={collection.illustration.src} alt={collection.illustration.alt} width={collection.illustration.width} height={collection.illustration.height} loading="lazy" />
        </div>
        <p className="concept-card-category">{collection.category}</p>
        <h3>{collection.name}</h3>
        <span className="concept-development-stage">{developmentLabels[collection.developmentStage]}</span>
        <p className="concept-card-summary">{collection.summary}</p>
        <details className="concept-card-details">
          <summary>Explore {collection.productNames.length} {collection.productNames.length === 1 ? "product concept" : "product concepts"}<Plus size={16} aria-hidden="true" /></summary>
          <div>
            <h4>Concept lineup</h4>
            <ul>{collection.productNames.map((name) => <li key={name}>{name}</li>)}</ul>
            <h4>Formulation directions</h4>
            <p>{collection.formulationThemes.join(" · ")}</p>
          </div>
        </details>
      </article>)}
    </div>
    <div className="concept-library-footer">
      <p>Choose a collection in the inquiry form and tell us your target market, preferred format and estimated volume.</p>
      <a className="text-link" href="#inquiry">Discuss a product concept <ArrowUpRight size={19} /></a>
    </div>
  </section>;
}
