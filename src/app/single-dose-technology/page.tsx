import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Footer from "../../components/Footer";
import ProjectForm from "../../components/ProjectForm";
import BobiiDevelopment from "../../components/BobiiDevelopment";
import { productInnovationsCopy } from "../../data/innovations";
import { getProductById, productHref } from "../../data/products";
import { pageSeo } from "../../data/seo";
import { technologyCompatibilityCopy, technologyPatentCopy, technologyPrinciples } from "../../data/technology";
import { pageMetadata } from "../../lib/seo";
import "./single-dose-technology.css";
import "../concepts.css";
import "../development.css";

export const metadata = pageMetadata(pageSeo.productInnovations, "/single-dose-technology");

export default function SingleDoseTechnology() {
  const product = getProductById("bobii-ball");
  if (!product) notFound();

  return <>
    <a href="#technology-content" className="skip-link">Skip to content</a>
    <main id="top" className="inner-page single-dose-page">
      <section className="inner-container inner-intro" id="technology-content">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>{productInnovationsCopy.title}</span></nav>
        <p className="eyebrow" id="single-dose-technology">{productInnovationsCopy.eyebrow}</p>
        <h1>{productInnovationsCopy.headline.line1}<br /><span>{productInnovationsCopy.headline.line2}</span></h1>
        <p className="product-summary">{productInnovationsCopy.introduction}</p>
        <div className="single-dose-actions"><a className="pill dark-pill" href="#inquiry">Request Samples <ArrowUpRight size={19} /></a><a className="text-link" href={productHref(product)}>Explore BOBII BALL <ArrowUpRight size={18} /></a></div>
        <nav className="single-dose-section-nav" aria-label="Single-dose technology topics">
          <a href="#product-concepts">Product concepts</a><a href="#development-services">Development support</a><a href="#development-process">Project steps</a>
          <a href="#five-layer-structure">Five-Layer Structure</a><a href="#how-it-works">How It Works</a><a href="#formula-compatibility">Formula Compatibility</a><a href="#patents">Patents</a><a href="#inquiry">Request Samples</a>
        </nav>
      </section>

      <BobiiDevelopment productId={product.id} />

      <section className="inner-container layer-section" id="five-layer-structure" aria-labelledby="technology-layers-heading">
        <div className="inner-split"><div><p className="eyebrow">FIVE LAYERS / ONE STRUCTURE</p><h2 id="technology-layers-heading">Protection.<br /><span>Layer by layer.</span></h2><p>The shell combines polyethylene, bonding layers and an EVOH barrier. Final material grades and wall thicknesses are confirmed during project development.</p></div><img src={product.media.structure} alt="BOBII BALL five-layer shell exploded view" width="1834" height="1601" loading="lazy" /></div>
        <ol className="layer-list">{product.layers.map((layer, index) => <li key={`${layer.material}-${index}`}><span>0{index + 1}</span><div><h3>{layer.material}</h3><p>{layer.description}</p></div></li>)}</ol>
      </section>

      <section className="inner-container technology-section" id="how-it-works" aria-labelledby="technology-principles-heading">
        <p className="eyebrow">SINGLE-DOSE TECHNOLOGY</p>
        <h2 id="technology-principles-heading">How it works.</h2>
        <ol className="technology-principles">{technologyPrinciples.map((principle, index) => <li key={principle.title}><span>0{index + 1}</span><h3>{principle.title}</h3><p>{principle.description}</p></li>)}</ol>
      </section>

      <section className="inner-container technology-section" id="formula-compatibility" aria-labelledby="technology-compatibility-heading">
        <p className="eyebrow">YOUR FORMULA / OUR DEVELOPMENT PROCESS</p>
        <h2 id="technology-compatibility-heading">Formula compatibility.</h2>
        <p className="technology-section-intro">{technologyCompatibilityCopy.introduction}</p>
        <div className="application-grid">{product.applications.map((application) => <article key={application.name}><h3>{application.name}</h3><p>{application.description}</p></article>)}</div>
        <p className="fine-print">{technologyCompatibilityCopy.note}</p>
        <a className="text-link" href="#inquiry">Discuss your formula <ArrowUpRight size={18} /></a>
      </section>

      <section className="inner-container technology-section technology-patents" id="patents" aria-labelledby="technology-patents-heading">
        <div className="inner-split"><div><p className="eyebrow">TECHNOLOGY DOCUMENTATION</p><h2 id="technology-patents-heading">Patents.</h2></div><div><p>{technologyPatentCopy.introduction}</p><a className="text-link" href="#inquiry">{technologyPatentCopy.action} <ArrowUpRight size={18} /></a></div></div>
      </section>

      <section className="inner-container single-dose-project-links" aria-label="Explore products and development services">
        <p>Continue with a product concept or discuss the development support your project needs.</p>
        <div><a className="text-link" href={`${productHref(product)}#product-concepts`}>BOBII BALL formulation concepts <ArrowUpRight size={18} /></a><a className="text-link" href="/oem-odm">OEM / ODM services <ArrowUpRight size={18} /></a></div>
      </section>

      <section id="inquiry" className="contact-section inner-container" aria-labelledby="technology-samples-heading">
        <div className="single-dose-samples-intro"><p className="eyebrow">START WITH YOUR PROJECT</p><h2 id="technology-samples-heading">Request Samples.</h2><p>Tell us about your formula, target market and intended format. Sampling availability and the evaluation required are confirmed for your project.</p></div>
        <ProjectForm productId={product.id} />
      </section>
    </main>
    <Footer />
  </>;
}
