import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Footer from "../../components/Footer";
import ProjectForm from "../../components/ProjectForm";
import ConceptLibrary from "../../components/ConceptLibrary";
import { productInnovationsCopy } from "../../data/innovations";
import { getProductById, productHref } from "../../data/products";
import { pageSeo } from "../../data/seo";
import { technologyCompatibilityCopy } from "../../data/technology";
import { pageMetadata } from "../../lib/seo";
import "./single-dose-technology.css";
import "../concepts.css";

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
        <div className="single-dose-actions"><a className="pill dark-pill" href="#inquiry">Request Samples <ArrowUpRight size="1.1875rem" /></a><a className="text-link" href={productHref(product)}>Explore BOBII BALL <ArrowUpRight size="1.125rem" /></a></div>
        <nav className="single-dose-section-nav" aria-label="Single-dose technology topics">
          <a href="#product-concepts">Product concepts</a><a href="/oem-odm#services">Development support</a><a href="/oem-odm#approach">Project steps</a>
          <a href={`${productHref(product)}#five-layer-structure`}>Five-Layer Structure</a><a href="#formula-compatibility">Formula Compatibility</a><a href={`${productHref(product)}#patents`}>Patents</a><a href="#inquiry">Request Samples</a>
        </nav>
      </section>

      <ConceptLibrary productId={product.id} />

      <section className="inner-container technology-section" id="formula-compatibility" aria-labelledby="technology-compatibility-heading">
        <p className="eyebrow">YOUR FORMULA / OUR DEVELOPMENT PROCESS</p>
        <h2 id="technology-compatibility-heading">Formula compatibility.</h2>
        <p className="technology-section-intro">{technologyCompatibilityCopy.introduction}</p>
        <div className="application-grid">{product.applications.map((application) => <article key={application.name}><h3>{application.name}</h3><p>{application.description}</p></article>)}</div>
        <p className="fine-print">{technologyCompatibilityCopy.note}</p>
        <a className="text-link" href="#inquiry">Discuss your formula <ArrowUpRight size="1.125rem" /></a>
      </section>

      <section className="inner-container single-dose-project-links" aria-label="Explore products and development services">
        <p>Continue with a product concept or discuss the development support your project needs.</p>
        <div><a className="text-link" href={productHref(product)}>Explore BOBII BALL <ArrowUpRight size="1.125rem" /></a><a className="text-link" href="/oem-odm">OEM / ODM services <ArrowUpRight size="1.125rem" /></a></div>
      </section>

      <section id="inquiry" className="contact-section inner-container" aria-labelledby="technology-samples-heading">
        <div className="single-dose-samples-intro"><p className="eyebrow">START WITH YOUR PROJECT</p><h2 id="technology-samples-heading">Request Samples.</h2><p>Tell us about your formula, target market and intended format. Sampling availability and the evaluation required are confirmed for your project.</p></div>
        <ProjectForm productId={product.id} />
      </section>
    </main>
    <Footer />
  </>;
}
