// One navigation model for the header, mega menu and footer.
import { getPublishedProducts, productHref } from "../data/products";

export const singleDoseTechnologyHref = "/single-dose-technology";
export const productConceptsHref = `${singleDoseTechnologyHref}#product-concepts`;

export const singleDoseMenu = {
  label: "Product Innovations",
  href: singleDoseTechnologyHref,
  description: "Explore formulation collections, product concepts and single-dose development.",
  links: [
    { label: "Five-Layer Structure", href: "/products/bobii-ball-single-dose-container#five-layer-structure", description: "Explore PE, bonding layers and the EVOH barrier." },
    { label: "Formula Compatibility", href: `${singleDoseTechnologyHref}#formula-compatibility`, description: "Discuss formula types and project-specific evaluation." },
    { label: "Patents", href: "/products/bobii-ball-single-dose-container#patents", description: "View BOBII BALL patent certificates and documentation." },
  ],
  samplesHref: `${singleDoseTechnologyHref}#inquiry`,
} as const;

type NavigationItem = {
  label: string;
  href: string;
  description: string;
};

export const siteNavigation: readonly NavigationItem[] = [
  { label: "BOBII BALL Technology", href: getPublishedProducts()[0] ? productHref(getPublishedProducts()[0]) : "/#capsules", description: "Explore the BOBII BALL format, colors and formulation concepts." },
  { label: singleDoseMenu.label, href: singleDoseMenu.href, description: singleDoseMenu.description },
  { label: "OEM / ODM Solutions", href: "/oem-odm", description: "Explore formulation concepts, development and manufacturing." },
  { label: "About Us", href: "/about", description: "Meet our company, capabilities and partner network." },
] as const;
