import {
  ArrowDownRight,
  ArrowUpRight,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import CapsulePlayground from "../components/CapsulePlayground";
import ColorCollection from "../components/ColorCollection";
import ProjectForm from "../components/ProjectForm";
import ScrollVideo from "../components/ScrollVideo";
import { getPublishedProducts } from "../data/products";
import { homepageMedia } from "../data/media";
import LatestNews from "../components/LatestNews";
import Footer from "../components/Footer";
import "./latest-news.css";

export default function Home() {
  const product = getPublishedProducts()[0];
  return (
    <>
      <a href="#capsules" className="skip-link">
        Skip to content
      </a>
      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-main">
            <h1 id="hero-heading">
              <span className="hero-title-layout">
                <span className="hero-message">
                  <span>Innovative</span>
                  <span>single-Dose</span>
                  <span>Beauty Technology</span>
                </span>
                <span className="hero-brand">BOBII BALL.</span>
              </span>
            </h1>
            <div className="hero-intro">
              <p>
                We combine scientific research, proprietary technology, and
                integrated OEM/ODM solutions to help international beauty brands
                create distinctive, market-ready products.
              </p>
              <a href="#capsules">
                Meet BOBII BALL <ArrowDownRight size="1.1875rem" />
              </a>
            </div>
          </div>
          <CapsulePlayground />
          <div className="hero-bottom">
            <span>FORMULA. FORMAT. POSSIBILITY.</span>
            <a href="#contact">
              FOR BEAUTY BRANDS, WITH L COSMETIX <ArrowUpRight size="0.9375rem" />
            </a>
          </div>
        </section>

        <section
          className="intro-section content-width"
          id="capsules"
          aria-labelledby="capsule-heading"
        >
          <div className="section-heading">
            <p className="eyebrow">MEET BOBII BALL</p>
            <h2 id="capsule-heading">
              A little capsule.
              <br />
              <span>A whole new perspective.</span>
            </h2>
          </div>
          {product && <ColorCollection product={product} />}
        </section>

        <section
          className="technology-section content-width"
          id="technology"
          aria-labelledby="technology-heading"
        >
          <div className="technology-copy">
            <p className="eyebrow">THINKING INSIDE THE CAPSULE</p>
            <h2 id="technology-heading">
              More than
              <br />
              meets the eye.
            </h2>
            <p>
              A five-layer shell, built around your formula. BOBII BALL brings
              materials, design and single-dose filling into one development
              project.
            </p>
            <div className="tech-detail">
              <Plus size="1.0625rem" />
              <span>Five-layer shell</span>
              <span>PE / EVOH / PE + bonding layers</span>
            </div>
            <div className="tech-detail">
              <Plus size="1.0625rem" />
              <span>Formula compatibility</span>
              <span>Evaluated for your project</span>
            </div>
            <a href="/single-dose-technology#formula-compatibility" className="text-link">
              Explore Single-Dose Technology <ArrowUpRight size="1.375rem" />
            </a>
          </div>
          <div className="technical-image technical-video">
            <ScrollVideo
              src={homepageMedia.capsuleStructure.src}
              poster={homepageMedia.capsuleStructure.poster}
              width={homepageMedia.capsuleStructure.width}
              height={homepageMedia.capsuleStructure.height}
              label={homepageMedia.capsuleStructure.title}
            />
            <span>BOBII BALL® / CAPSULE STRUCTURE</span>
          </div>
        </section>

        {product && <section className="applications-section content-width" id="applications" aria-labelledby="applications-heading">
          <p className="eyebrow">ONE FORMAT. MANY POSSIBILITIES.</p>
          <h2 id="applications-heading">Your formula.<br />A new way to experience it.</h2>
          <div className="application-grid">{product.applications.map((application) => <article key={application.name}><h3>{application.name}</h3><p>{application.description}</p></article>)}</div>
          <a href="/oem-odm#applications" className="text-link">Explore applications <ArrowUpRight size="1.1875rem" /></a>
          <p className="fine-print">Formula compatibility and performance are evaluated for each project.</p>
        </section>}
        <LatestNews />

        <section
          className="contact-section content-width"
          id="contact"
          aria-label="Discuss your capsule project"
        >
          <ProjectForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
