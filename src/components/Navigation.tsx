"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, List, X } from "@phosphor-icons/react";
import { catalogueDownload, siteNavigation } from "../lib/navigation";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current;
    const originalOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      if (element.open) element.close();
    };
  }, [open]);

  function closeMenu() {
    dialog.current?.close();
    setOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <a href="/#top" className="wordmark" aria-label="L COSMETIX home">
          <img
            src="/assets/lcosmetix-logo.webp"
            width="256"
            height="34"
            alt="L COSMETIX"
          />
        </a>
        <nav className="header-navigation" aria-label="Primary navigation">
          {siteNavigation.map(({ label, href }) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <a href="/#contact" className="pill contact-pill">
            Get a Quote <ArrowUpRight size={17} />
          </a>
          <button
            type="button"
            className="pill menu-pill"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="navigation-panel"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            menu. <List size={22} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="mega-menu"
        id="navigation-panel"
        aria-labelledby="navigation-title"
        onClose={(event) => {
          // A queued close event must not dismiss a newly reopened dialog.
          if (!event.currentTarget.open) setOpen(false);
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom) closeMenu();
        }}
      >
        <div className="mega-menu-header">
          <p id="navigation-title" className="mega-menu-label">
            L COSMETIX <span>/ EXPLORE</span>
          </p>
          <button type="button" className="mega-menu-close" aria-label="Close menu" onClick={closeMenu}>
            <X size={21} weight="light" />
          </button>
        </div>
        <div className="mega-menu-body">
          <div className="mega-menu-feature">
            <span className="mega-feature-label">THE BOBII BALL FORMAT</span>
            <img src="/assets/capsule-lilac.webp" alt="Glossy lilac BOBII BALL single-dose capsule" width="320" height="455" />
            <div className="mega-feature-caption">
              <p>Small format.<br />New possibilities.</p>
              <span>DESIGNED AROUND YOUR FORMULA</span>
            </div>
          </div>
          <nav className="mega-menu-links" aria-label="Main navigation">
            {siteNavigation.map(({ label, href, description }, index) => (
              <a key={href} href={href} onClick={closeMenu}>
                <span className="mega-menu-number">0{index + 1}</span>
                <span className="mega-menu-link-copy">
                  <span className="mega-menu-link-title">{label}</span>
                  <span className="mega-menu-link-description">{description}</span>
                </span>
                <ArrowUpRight size={25} weight="light" />
              </a>
            ))}
          </nav>
        </div>
        <div className="mega-menu-footer">
          <a
            className="mega-menu-download"
            href={catalogueDownload.href}
            download={catalogueDownload.filename}
          >
            <ArrowDown size={17} /> Product catalogue <span>PDF / ENGLISH</span>
          </a>
          <a href="/#contact" className="mega-menu-contact" onClick={closeMenu}>
            Let’s talk about your project <ArrowUpRight size={18} />
          </a>
        </div>
      </dialog>
    </>
  );
}
