import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { company } from "../data/company";
import { siteNavigation } from "../lib/navigation";

export default function Footer() {
  return <footer className="site-footer content-width">
    <a href="/#top" className="footer-logo" aria-label="Back to L COSMETIX home"><img src="/assets/lcosmetix-logo.webp" alt={company.displayName} width="240" height="31" /></a>
    <p>Single-dose containers. OEM/ODM possibilities.</p>
    <nav aria-label="Footer">{siteNavigation.map(({ label, href }) => <a href={href} key={href}>{label}</a>)}</nav>
    <address className="footer-contact"><a href={`mailto:${company.email}`}>{company.email}</a><span>{company.address}</span></address>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {company.legalName}</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></div>
  </footer>;
}
