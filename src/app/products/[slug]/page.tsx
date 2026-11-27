import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getPublishedProducts, getProductBySlug, productHref } from "../../../data/products";
import { catalogueDownload, productConceptsHref, singleDoseMenu } from "../../../lib/navigation";
import { pageMetadata } from "../../../lib/seo";
import ColorCollection from "../../../components/ColorCollection";
import ProjectForm from "../../../components/ProjectForm";
import ProjectSpecifications from "../../../components/ProjectSpecifications";
import Footer from "../../../components/Footer";
import BobiiDevelopment from "../../../components/BobiiDevelopment";
import SingleDoseTechnologySections from "../../../components/SingleDoseTechnologySections";
import "../../development.css";

export const dynamicParams = false;
export function generateStaticParams() { return getPublishedProducts().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();
  return pageMetadata(product.seo, productHref(product));
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();
  const related = getPublishedProducts().filter((item) => item.id !== product.id);
  const productFeatures = product.features.filter((feature) => feature.scope !== "technology");
  return <>
    <a href="#product-content" className="skip-link">Skip to content</a>
    <main id="top" className="inner-page product-detail">
      <section className="inner-container inner-intro" id="product-content">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>{product.category}</span></nav>
        <p className="eyebrow">{product.category.toUpperCase()}</p>
        <h1>{product.brand}.<br /><span>One dose. More possibility.</span></h1>
        <p className="product-summary">{product.summary}</p>
        <div className="product-actions"><a className="pill dark-pill" href="#inquiry">Get a Quote <ArrowUpRight size={19} /></a><a className="text-link" id="product-concepts" href={productConceptsHref}>Explore formulation concepts <ArrowUpRight size={18} /></a><a className="text-link" href={catalogueDownload.href} download={catalogueDownload.filename}>Download English catalogue <ArrowUpRight size={18} /></a></div>
        <ColorCollection product={product} headingLevel={2} />
      </section>
      <section className="inner-container product-benefits" aria-label="Product features">{productFeatures.map((feature, i) => <article key={feature.title}><span className="eyebrow">0{i + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</section>
      {product.id === "bobii-ball" && <section className="inner-container product-technology-reference" id="single-dose-technology" aria-labelledby="product-technology-reference-heading">
        <div className="inner-split"><div><p className="eyebrow">MATERIALS & FORMULA TECHNOLOGY</p><h2 id="product-technology-reference-heading">Single-Dose Technology.</h2></div><div><p>Explore the material structure, operating principles, formula evaluation and patent documentation behind the single-dose format.</p><nav aria-label="Explore Single-Dose Technology">{singleDoseMenu.links.map((topic) => {
          const anchor = topic.href.split("#")[1];
          const onThisPage = anchor === "five-layer-structure" || anchor === "how-it-works";
          return <a className="text-link" key={topic.href} id={onThisPage ? undefined : anchor} href={onThisPage ? `#${anchor}` : topic.href}>{topic.label} <ArrowUpRight size={17} /></a>;
        })}</nav></div></div>
      </section>}
      {product.id === "bobii-ball" && <SingleDoseTechnologySections product={product} />}
      {product.id === "bobii-ball" && <BobiiDevelopment productId={product.id} showConcepts={false} />}
      <ProjectSpecifications product={product} />
      {related.length > 0 && <section className="inner-container"><h2>Related products</h2><div className="application-grid">{related.map((item) => <a className="text-link" key={item.id} href={productHref(item)}>{item.name}<ArrowUpRight size={18} /></a>)}</div></section>}
      <section id="inquiry" className="contact-section inner-container"><ProjectForm productId={product.id} /></section>
    </main>
    <Footer />
  </>;
}
