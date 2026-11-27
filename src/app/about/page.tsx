import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Footer from "../../components/Footer";
import CompanyStats from "../../components/CompanyStats";
import CompanyMap from "../../components/CompanyMap";
import { company } from "../../data/company";
import { aboutProfile } from "../../data/about-profile";
import { aboutMedia } from "../../data/about-media";
import { pageSeo } from "../../data/seo";
import { pageMetadata } from "../../lib/seo";
import { getPublishedProducts, productHref } from "../../data/products";
import "./about-content.css";

export const metadata = pageMetadata(pageSeo.about, "/about");

export default function About() {
  const product = getPublishedProducts()[0];
  return <>
    <a href="#about-content" className="skip-link">Skip to content</a>
    <main id="top" className="inner-page about-page">
      <section className="inner-container inner-intro" id="about-content">
        <p className="eyebrow">ABOUT L COSMETIX</p>
        <h1>{aboutProfile.headline.line1}<br /><span>{aboutProfile.headline.line2}</span></h1>
        <div className="inner-split about-lead">
          <figure className="about-reception"><img src={aboutMedia.reception.src} srcSet={aboutMedia.reception.srcSet} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 44vw, 456px" alt={aboutMedia.reception.alt} width={aboutMedia.reception.width} height={aboutMedia.reception.height} decoding="async" /></figure>
          <div className="about-lead-copy"><p>{aboutProfile.introduction}</p><p>{aboutProfile.positioning}</p>
            <p>Established in {company.founded}, our team works with beauty brands, importers, distributors and OEM manufacturers across {company.markets.join(", ").replace(/, ([^,]*)$/, " and $1")}.</p>
            <ul className="about-focus-areas" aria-label="Beauty categories">{aboutProfile.focusAreas.map((area) => <li key={area}>{area}</li>)}</ul>
            <a className="text-link" href="/#contact">Discuss your project <ArrowUpRight size={19} /></a>
          </div>
        </div>
        <CompanyStats />
        <nav className="about-section-nav" aria-label="On this About page">
          <a href="#mission">Mission & vision</a><a href="#story">Integrated capabilities</a><a href="#capabilities">Global presence</a><a href="#manufacturing">Single-dose development</a><a href="/oem-odm">OEM / ODM</a><a href="#locations">Contact locations</a>
        </nav>
      </section>

      <section className="inner-container about-mission" id="mission" aria-labelledby="about-mission-heading">
        <div className="about-mission-layout">
          <div className="about-mission-copy">
            <h2 id="about-mission-heading">{aboutProfile.mission.title}</h2>
            <p>{aboutProfile.mission.body}</p>
          </div>
          <figure className="about-leadership">
            <img src={aboutMedia.leadership.src} alt={aboutMedia.leadership.alt} width={aboutMedia.leadership.width} height={aboutMedia.leadership.height} loading="lazy" />
            <figcaption><span>{aboutProfile.leadership.role}</span><span>{aboutProfile.leadership.name}</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="inner-container about-content-section" id="story" aria-labelledby="about-story-heading">
        <p className="eyebrow">OUR INTEGRATED CAPABILITIES</p>
        <div className="inner-split">
          <h2 id="about-story-heading">From research.<br /><span>To finished beauty.</span></h2>
          <div>{aboutProfile.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
        <div className="about-integrated-grid">{aboutProfile.capabilities.map((capability) => <article key={capability.title}>
          <h3>{capability.title}</h3><p>{capability.description}</p>
        </article>)}</div>
      </section>

      <section className="inner-container about-content-section" id="capabilities" aria-labelledby="about-capabilities-heading">
        <p className="eyebrow">OUR GLOBAL PRESENCE</p>
        <div className="inner-split about-section-lead">
          <h2 id="about-capabilities-heading">Connected expertise.<br /><span>Clear responsibilities.</span></h2>
          <div><p>Our network connects research, ingredient development, sourcing, international business and manufacturing across the roles below.</p><p>Each project follows an agreed development and manufacturing route, with responsibilities defined for the participating team and facility.</p></div>
        </div>
        <div className="about-global-headquarters">
          <div><p className="about-location-tag">{aboutProfile.headquarters.location}</p><h3>{aboutProfile.headquarters.title}</h3><p>{aboutProfile.headquarters.description}</p></div>
          <ul>{aboutProfile.headquarters.functions.map((role) => <li key={role}>{role}</li>)}</ul>
        </div>
        <div className="about-network-grid">{aboutProfile.network.map((office) => <article key={office.location}><p className="about-location-tag">{office.location}</p><h3>{office.title}</h3><p>{office.description}</p></article>)}</div>
      </section>

      <section className="inner-container about-factory" id="manufacturing" aria-labelledby="about-manufacturing-heading">
        <div className="inner-split">
          <div><p className="eyebrow">SINGLE-DOSE DEVELOPMENT</p><h2 id="about-manufacturing-heading">One format.<br /><span>Developed together.</span></h2></div>
          <div><p>{aboutProfile.manufacturingIntro}</p><p>{aboutProfile.bobiiIntro}</p><div className="about-service-actions">{product && <a className="text-link" href={productHref(product)}>Explore BOBII BALL <ArrowUpRight size={19} /></a>}<a className="text-link" href="/oem-odm">Explore OEM / ODM services <ArrowUpRight size={19} /></a></div></div>
        </div>
      </section>

      <section className="inner-container about-content-section" id="approach" aria-labelledby="about-approach-heading">
        <p className="eyebrow">WORKING TOGETHER</p>
        <div className="inner-split">
          <h2 id="about-approach-heading">A clear brief.<br /><span>A considered process.</span></h2>
          <div><p>Our dedicated OEM / ODM page brings together formulation directions, customization options and the steps from your initial brief to production preparation.</p><a className="text-link" href="/oem-odm#approach">Explore the development process <ArrowUpRight size={19} /></a></div>
        </div>
      </section>

      <section className="inner-container about-markets">
        <p className="eyebrow">PARTNERSHIPS ACROSS MARKETS</p>
        <div className="inner-split"><h2>For beauty brands.<br /><span>Across borders.</span></h2><div><p>We work with customers in {company.markets.join(", ").replace(/, ([^,]*)$/, " and $1")}.</p><div className="market-tags">{company.customers.map((customer) => <span key={customer}>{customer}</span>)}</div><p>Explore the BOBII BALL format, or start a conversation about your own single-dose project.</p>{product && <a className="text-link" href={productHref(product)}>Explore {product.brand} <ArrowUpRight size={19} /></a>}</div></div>
      </section>
      <CompanyMap widthClass="inner-container" />
      <section className="inner-container inner-contact-callout"><h2>Let’s develop<br />what comes next.</h2><div><a className="pill dark-pill" href="/#contact">Get a Quote <ArrowUpRight size={19} /></a><address><a href={`mailto:${company.email}`}>{company.email}</a><span>{company.address}</span></address></div></section>
    </main>
    <Footer />
  </>;
}
