import type { Product } from "../data/products";

export default function ProjectSpecifications({ product }: { product: Pick<Product, "specifications"> }) {
  const specifications = product.specifications;
  const rows = [
    ["Capacity", specifications.capacityMl === null ? "Confirm for your project" : `${specifications.capacityMl} ml`],
    ["Dimensions", specifications.dimensionsMm || "Confirm for your project"],
    ["Minimum order", specifications.moq === null ? "Request a quotation" : `${specifications.moq}`],
    ["Lead time", specifications.leadTimeDays === null ? "Confirm with our team" : `${specifications.leadTimeDays} days`],
  ];
  return <section className="inner-container product-specifications" id="project-specifications" aria-labelledby="project-specifications-heading">
    <p className="eyebrow">PROJECT SPECIFICATIONS</p>
    <div className="inner-split">
      <h2 id="project-specifications-heading">Defined together.<br /><span>Made for your formula.</span></h2>
      <dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
  </section>;
}
