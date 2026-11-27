import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { bobiiPatents } from "../data/patents";
import PatentGallery from "./PatentGallery";

export default function BobiiPatents() {
  return <section className="inner-container bobii-patents" id="patents" aria-labelledby="bobii-patents-heading">
    <p className="eyebrow">BOBII BALL / PATENTS</p>
    <h2 id="bobii-patents-heading">Innovation.<br /><span>Protected by patents.</span></h2>
    <div className="bobii-patents-layout">
      <PatentGallery patents={bobiiPatents} />
      <div className="bobii-patents-summary">
        <p className="eyebrow">PATENT NUMBERS</p>
        <ul className="patent-number-list">{bobiiPatents.map((patent) => <li key={patent.number} translate="no">{patent.number}</li>)}</ul>
        <p className="patent-progress">Further applications in progress.</p>
        <img className="patent-product-image" src="/assets/about-capsule-collection.webp" alt="BOBII BALL single-dose capsules in a collection jar" width="1400" height="1050" loading="lazy" />
        <a className="text-link" href="#inquiry">Discuss patent documentation <ArrowUpRight size="1.125rem" /></a>
      </div>
    </div>
  </section>;
}
