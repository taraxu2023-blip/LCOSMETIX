"use client";

import { useEffect, useRef, useState } from "react";
import type { BobiiPatent } from "../data/patents";

export default function PatentGallery({ patents }: { patents: readonly BobiiPatent[] }) {
  const [active, setActive] = useState<BobiiPatent | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!active || !dialog.current) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      if (element.open) element.close();
    };
  }, [active]);

  return <>
    <ul className="patent-gallery" aria-label="BOBII BALL patent certificates">
      {patents.map((patent) => <li key={patent.number}>
        <button type="button" aria-haspopup="dialog" aria-label={`View certificate ${patent.number}`} onClick={() => setActive(patent)}>
          <img src={`/assets/patents/${patent.asset}-thumb.webp`} alt={`${patent.type} certificate ${patent.number}`} width="360" height="520" loading="lazy" />
          <span>{patent.type} <span aria-hidden="true">↗</span></span>
        </button>
      </li>)}
    </ul>
    <dialog ref={dialog} className="patent-dialog" aria-labelledby="patent-certificate-title" onClose={() => {
      if (!dialog.current?.open) setActive(null);
    }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {active && <div className="patent-dialog-content">
        <div className="patent-dialog-toolbar"><h3 id="patent-certificate-title" translate="no">{active.number}</h3><button type="button" aria-label="Close certificate" onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button></div>
        <img src={`/assets/patents/${active.asset}.webp`} alt={`${active.type} certificate ${active.number}`} />
      </div>}
    </dialog>
  </>;
}
