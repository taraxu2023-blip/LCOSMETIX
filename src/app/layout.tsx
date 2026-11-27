import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import "./globals.css";
import "./navigation.css";
import "./information.css";
import "./company-map.css";
import "./single-dose-menu.css";
import "./technology.css";
import "./site-responsive.css";
import "./home-responsive.css";
import { pageSeo } from "../data/seo";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata(pageSeo.home, "/");

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
