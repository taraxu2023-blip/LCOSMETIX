import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { oemCapabilityRoles, oemCollaboration, oemMedia, oemQualityChecks } from "../data/oem-solutions";

function ProductionPhoto({ photo }: { photo: typeof oemMedia[keyof typeof oemMedia] }) {
  return <figure className="oem-production-photo">
    <img src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 760px) calc(100vw - 40px), 46vw" width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" />
    <figcaption>{photo.caption}</figcaption>
  </figure>;
}

export default function OemCapabilities() {
  return <>
    <section className="inner-container oem-section" id="collaboration" aria-labelledby="oem-collaboration-heading">
      <p className="eyebrow">TWO WAYS TO WORK TOGETHER</p>
      <div className="inner-split oem-section-lead"><h2 id="oem-collaboration-heading">Your starting point.<br /><span>A route of its own.</span></h2><div><p>Bring an established formula or an idea for something new. We define the development scope around your brand, target market and project stage.</p></div></div>
      <div className="oem-collaboration-grid">{oemCollaboration.map((route) => <article key={route.name}>
        <p className="eyebrow">{route.name}</p><h3>{route.title}</h3><p>{route.description}</p>
        <ul>{route.scope.map((item) => <li key={item}>{item}</li>)}</ul>
        <a className="text-link" href="#inquiry">Discuss your {route.name} project <ArrowUpRight size="1.125rem" /></a>
      </article>)}</div>
    </section>

    <section className="inner-container oem-section" id="manufacturing" aria-labelledby="oem-manufacturing-heading">
      <p className="eyebrow">MANUFACTURING / SINGLE-DOSE EXPERTISE</p>
      <div className="inner-split oem-section-lead"><h2 id="oem-manufacturing-heading">Beyond the concept.<br /><span>Into production.</span></h2><div><p>BOBII BALL development connects packaging design, formulation innovation and automated filling. The container, formula and production process are developed as one connected system.</p><p>Our directly operated Guangzhou capabilities work with independent manufacturing partners in Nanjing and Singapore to define the right production route for each project.</p></div></div>
      <div className="oem-factory-images"><ProductionPhoto photo={oemMedia.factory} /><ProductionPhoto photo={oemMedia.production} /></div>
      <div className="oem-capability-roles">{oemCapabilityRoles.map((role) => <article key={role.title}><p className="eyebrow">{role.location}</p><h3>{role.title}</h3><p>{role.description}</p></article>)}</div>
    </section>

    <section className="inner-container oem-section" id="quality" aria-labelledby="oem-quality-heading">
      <div className="inner-split oem-quality-layout">
        <div><p className="eyebrow">PROJECT EVALUATION / QUALITY COORDINATION</p><h2 id="oem-quality-heading">Agreed standards.<br /><span>At every stage.</span></h2><ProductionPhoto photo={oemMedia.team} /></div>
        <div><p className="oem-quality-intro">From sample review to manufacturing preparation, we define the checks and responsibilities your product needs.</p><ol className="oem-quality-checks">{oemQualityChecks.map((check, index) => <li key={check.title}><span className="eyebrow">0{index + 1}</span><div><h3>{check.title}</h3><p>{check.description}</p></div></li>)}</ol><a className="text-link" href="#inquiry">Discuss your project requirements <ArrowUpRight size="1.125rem" /></a></div>
      </div>
    </section>
  </>;
}
