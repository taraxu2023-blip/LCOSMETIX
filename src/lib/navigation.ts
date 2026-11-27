// One navigation model for the header, mega menu and footer.
import { getPublishedProducts, productHref } from "../data/products";

export const singleDoseTechnologyHref = "/single-dose-technology";

export const singleDoseMenu = {
  label: "Product Innovations",
  href: singleDoseTechnologyHref,
  description: "Materials, principles and compatibility for your next single-dose project.",
  links: [
    { label: "Five-Layer Structure", href: `${singleDoseTechnologyHref}#five-layer-structure`, description: "Explore PE, bonding layers and the EVOH barrier." },
    { label: "How It Works", href: `${singleDoseTechnologyHref}#how-it-works`, description: "See how the container and material structure work together." },
    { label: "Formula Compatibility", href: `${singleDoseTechnologyHref}#formula-compatibility`, description: "Discuss formula types and project-specific evaluation." },
    { label: "Patents", href: `${singleDoseTechnologyHref}#patents`, description: "Ask about patent documentation for your project." },
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
  { label: "OEM/ODM Technology", href: "/oem-odm", description: "Explore formulation concepts, development and manufacturing." },
  { label: "About Us", href: "/about", description: "Meet our company, capabilities and partner network." },
] as const;

export const catalogueDownload = {
  href: "/assets/bobii-ball-catalogue-en.pdf",
  filename: "BOBII-BALL-Catalogue-EN.pdf",
} as const;
