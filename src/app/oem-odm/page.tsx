import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Footer from "../../components/Footer";
import ProjectForm from "../../components/ProjectForm";
import ProjectSpecifications from "../../components/ProjectSpecifications";
import { oemOdmServices, projectApproach } from "../../data/company-profile";
import { getProductById, productHref } from "../../data/products";
import { getPublishedConceptCollections } from "../../data/concepts";
import { pageSeo } from "../../data/seo";
import { catalogueDownload } from "../../lib/navigation";
import { pageMetadata } from "../../lib/seo";
import "./oem-odm.css";

export const metadata = pageMetadata(pageSeo.oemOdm, "/oem-odm");

export default function OemOdm() {
  const product = getProductById("bobii-ball");
  const collections = product ? getPublishedConceptCollections(product.id) : [];
  const conceptCount = collections.reduce((total, collection) => total + collection.productNames.length, 0);

  return <>
    <a href="#oem-content" className="skip-link">Skip to content</a>
    <main id="top" className="inner-page oem-page">
      <section className="inner-container inner-intro" id="oem-content">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>OEM / ODM</span></nav>
        <p className="eyebrow">OEM / ODM SOLUTIONS</p>
        <h1>OEM / ODM.<br /><span>From idea to product.</span></h1>
        <div className="inner-split oem-intro-copy">
          <p className="large-copy">Your formula.<br />A development route of its own.</p>
          <div>
            <p>Connect product strategy, formulation development, single-dose packaging and manufacturing coordination around your brand’s brief.</p>
            <p>Explore our formulation concepts or bring your own idea. Together, we define the product scope, technical evaluation and production route for your target market.</p>
            <div className="oem-hero-actions"><a className="pill dark-pill" href="#inquiry">Start your project <ArrowUpRight size={19} /></a><a className="text-link" href={catalogueDownload.href} download={catalogueDownload.filename}>English catalogue <ArrowUpRight size={18} /></a></div>
          </div>
        </div>
        <nav className="oem-section-nav" aria-label="OEM / ODM topics and formulation concepts">
          {product && <a href={`${productHref(product)}#product-concepts`}>Formulation concepts</a>}<a href="#applications">Applications</a><a href="#services">Services</a><a href="#approach">Project steps</a>{product && <a href="#project-specifications">Project specifications</a>}<a href="#inquiry">Start your project</a>
        </nav>
      </section>

      {product && <>
        <section className="inner-container applications-section" id="applications" aria-labelledby="oem-applications-heading">
          <p className="eyebrow">FORMULA DIRECTIONS</p>
          <h2 id="oem-applications-heading">A format for your next idea.</h2>
          <div className="application-grid">{product.applications.map((application) => <article key={application.name}><h3>{application.name}</h3><p>{application.description}</p></article>)}</div>
          <p className="fine-print">Formula compatibility and performance are evaluated for each project.</p>
        </section>
        <section className="inner-container oem-section" id="product-concepts" aria-labelledby="oem-concepts-heading">
          <p className="eyebrow">FORMULATION DEVELOPMENT</p>
          <div className="inner-split">
            <h2 id="oem-concepts-heading">Formulation concepts.<br /><span>Explore with BOBII BALL.</span></h2>
            <div><p>Explore {collections.length} formulation collections and {conceptCount} development concepts on the BOBII BALL technology page. Each concept is a starting point for project-specific formulation and packaging development.</p><a className="text-link" href={`${productHref(product)}#product-concepts`}>Explore {collections.length} formulation collections <ArrowUpRight size={19} /></a></div>
          </div>
        </section>
      </>}

      <section className="inner-container oem-section" id="services" aria-labelledby="oem-services-heading">
        <p className="eyebrow">OUR DEVELOPMENT SCOPE</p>
        <div className="inner-split oem-section-lead"><h2 id="oem-services-heading">Built around<br /><span>your project.</span></h2><div><p>Our Guangzhou development and production capabilities work with an independent manufacturing partner network. The participating team, facility and responsibilities are defined for your project.</p><p>Select the support your brief needs, from an initial formulation direction to sampling, packaging and manufacturing coordination.</p></div></div>
        <div className="oem-services-grid">{oemOdmServices.map((service, index) => <article key={service.title}><span className="eyebrow">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p></article>)}</div>
      </section>

      <section className="inner-container oem-section" id="approach" aria-labelledby="oem-approach-heading">
        <p className="eyebrow">WORKING TOGETHER</p>
        <div className="inner-split">
          <div><h2 id="oem-approach-heading">A clear brief.<br /><span>A considered process.</span></h2><p className="oem-approach-intro">Start with samples, customization or brand-specific development. Timing, order quantities and testing requirements are confirmed for the selected product and project scope.</p><a className="text-link" href="#inquiry">Tell us about your idea <ArrowUpRight size={19} /></a></div>
          <ol className="oem-process-list">{projectApproach.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
        </div>
      </section>

      {product && <ProjectSpecifications product={product} />}
      <section id="inquiry" className="contact-section inner-container"><ProjectForm productId={product?.id} /></section>
    </main>
    <Footer />
  </>;
}
