import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import ConceptLibrary from "./ConceptLibrary";
import { oemOdmServices, projectApproach } from "../data/company-profile";

export default function BobiiDevelopment({ productId }: { productId: string }) {
  return <>
    <ConceptLibrary productId={productId} />

    <section className="inner-container development-section" id="development-services" aria-labelledby="development-services-heading">
      <p className="eyebrow">OUR DEVELOPMENT SCOPE</p>
      <div className="inner-split development-section-lead">
        <h2 id="development-services-heading">Built around<br /><span>your project.</span></h2>
        <div>
          <p>Our Guangzhou development and production capabilities work with an independent manufacturing partner network. The participating team, facility and responsibilities are defined for your project.</p>
          <p>Select the support your brief needs, from an initial formulation direction to sampling, packaging and manufacturing coordination.</p>
        </div>
      </div>
      <div className="development-services-grid">
        {oemOdmServices.map((service, index) => <article key={service.title}>
          <span className="eyebrow">0{index + 1}</span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </article>)}
      </div>
    </section>

    <section className="inner-container development-section" id="development-process" aria-labelledby="development-process-heading">
      <p className="eyebrow">WORKING TOGETHER</p>
      <div className="inner-split">
        <div>
          <h2 id="development-process-heading">A clear brief.<br /><span>A considered process.</span></h2>
          <p className="development-approach-intro">Start with samples, customization or brand-specific development. Timing, order quantities and testing requirements are confirmed for the selected product and project scope.</p>
          <a className="text-link" href="#inquiry">Tell us about your idea <ArrowUpRight size={19} /></a>
        </div>
        <ol className="development-process-list">
          {projectApproach.map((step, index) => <li key={step.title}>
            <span>0{index + 1}</span>
            <div><h3>{step.title}</h3><p>{step.description}</p></div>
          </li>)}
        </ol>
      </div>
    </section>
  </>;
}
