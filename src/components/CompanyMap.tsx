"use client";

import { useId, useState, type CSSProperties } from "react";
import { ArrowUpRight, GlobeHemisphereEast } from "@phosphor-icons/react";
import { company } from "../data/company";
import { companyLocations, projectLocation } from "../data/locations";

const positions = companyLocations.map((location) => ({ ...location, ...projectLocation(location.longitude, location.latitude) }));
const singapore = positions.find((location) => location.id === "singapore")!;

export default function CompanyMap({ widthClass = "content-width" }: { widthClass?: string }) {
  const [selected, setSelected] = useState<string>("singapore");
  const instanceId = useId().replace(/:/g, "");
  const headingId = `${instanceId}-heading`;
  const gradientId = `${instanceId}-route`;
  const active = positions.find((location) => location.id === selected)!;
  const mapQuery = active.address ? `${active.address} ${active.postalCode || ""}`.trim() : active.country;

  return <section className={`company-map-section ${widthClass}`} id="locations" aria-labelledby={headingId}>
    <div className="company-map-heading">
      <div><p className="eyebrow">BUSINESS CONTACT LOCATIONS</p><h2 id={headingId}>Find your contact.<br /><span>Start a conversation.</span></h2></div>
      <p>Connect with our team across regions.<br />Development and manufacturing capabilities are outlined separately above.</p>
    </div>
    <div className="company-map-layout">
      <div className="location-selector" role="group" aria-label="Business contact locations">
        {positions.map((location, index) => <button key={location.id} type="button" aria-pressed={selected === location.id} aria-controls={`${instanceId}-details`} onClick={() => setSelected(location.id)}>
          <span className="location-index">0{index + 1}</span><span className="location-selector-copy"><strong>{location.city}</strong><span>{location.country === location.city ? location.countryCode : location.country}</span></span><ArrowUpRight size="1.0625rem" weight="light" />
        </button>)}
        <a className="location-email" href={`mailto:${company.email}`}>{company.email}<ArrowUpRight size="0.875rem" /></a>
      </div>
      <div className="location-display">
        <div className="location-map-meta"><span><GlobeHemisphereEast size="0.9375rem" weight="light" /> CONNECTED ACROSS BORDERS</span><span>{String(positions.length).padStart(2, "0")} CONTACT LOCATIONS</span></div>
        <div className="company-map-canvas">
          <svg className="company-world" viewBox="0 0 1000 520" aria-hidden="true" focusable="false">
            <defs><linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#86cbd4" stopOpacity="0.15" /><stop offset="0.55" stopColor="#4098ac" stopOpacity="0.8" /><stop offset="1" stopColor="#87d8df" stopOpacity="0.25" /></linearGradient></defs>
            <g className="map-graticule" fill="none" stroke="#789bab" strokeWidth="0.6" opacity="0.13">
              {[160, 320, 480, 640, 800, 960].map((x) => <path key={`v${x}`} d={`M${x} 5V515`} />)}
              {[65, 165, 265, 365, 465].map((y) => <path key={`h${y}`} d={`M5 ${y}H995`} />)}
            </g>
            <image href="/assets/company-world-dots.svg" width="1000" height="520" />
            <g className="map-radar" transform={`translate(${singapore.x} ${singapore.y})`} fill="none" stroke="#7fbcc9" strokeWidth="0.7"><circle r="68" opacity="0.2" /><circle r="140" opacity="0.12" /><circle r="225" opacity="0.08" /><path className="map-radar-sweep" d="M0 0L-110 -195" opacity="0.2" /></g>
            <g fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.7">
              {positions.filter((location) => location.id !== "singapore").map((location) => <path key={location.id} className={`map-connection ${selected === location.id ? "is-active" : ""}`} d={`M${singapore.x} ${singapore.y} Q${(singapore.x + location.x) / 2} ${Math.min(singapore.y, location.y) - 130} ${location.x} ${location.y}`} />)}
            </g>
            {positions.map((location, index) => <g key={location.id} className={`map-node ${selected === location.id ? "is-active" : ""}`} style={{ "--node-delay": `${index * -1.1}s` } as CSSProperties}>
              <path className={location.id === "south-korea" ? "map-label-connector-desktop" : undefined} d={`M${location.x} ${location.y} L${location.labelX} ${location.labelY}`} fill="none" stroke="#83afba" strokeWidth="1" opacity="0.65" />
              {location.id === "south-korea" && <path className="map-label-connector-mobile" d={`M${location.x} ${location.y} L850 -31.2`} fill="none" stroke="#83afba" strokeWidth="1" opacity="0.65" />}
              <circle className="map-node-aura" cx={location.x} cy={location.y} r="27" fill="#50bacb" opacity="0.07" />
              <circle className="map-node-pulse" cx={location.x} cy={location.y} r="8" fill="none" stroke="#49a2b5" strokeWidth="1" />
              <circle cx={location.x} cy={location.y} r="5.5" fill="#fff" stroke="#3c96aa" strokeWidth="1.5" />
              <circle cx={location.x} cy={location.y} r="2.4" fill="#3c96aa" />
            </g>)}
          </svg>
          {positions.map((location) => <button key={location.id} type="button" data-location={location.id} className={`map-city-label ${selected === location.id ? "is-active" : ""}`} style={{ "--label-x": `${location.labelX / 10}%`, "--label-y": `${location.labelY / 5.2}%` } as CSSProperties} aria-label={`Show ${location.city}${location.address ? " address" : ""} on map`} aria-pressed={selected === location.id} onClick={() => setSelected(location.id)}><span />{location.city}</button>)}
        </div>
        <div className="location-map-bottom"><span><i /> {active.city.toUpperCase()} SELECTED</span><span>{active.scope === "country" ? "Country-level location" : "City-level location"}</span></div>
        <div className="location-detail" id={`${instanceId}-details`} aria-live="polite" aria-atomic="true">
          <div className="location-detail-title"><span>{active.countryCode}</span><div><h3>{active.city}</h3><p>{active.country}</p></div></div>
          <address>{active.address ? <>{active.address}{active.postalCode && <span>Postal code: {active.postalCode}</span>}</> : <a href={`mailto:${company.email}`}>Email our team for South Korea enquiries.</a>}</address>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noopener noreferrer">{active.scope === "country" ? "View country on Google Maps" : "View on Google Maps"}<ArrowUpRight size="1.0625rem" /></a>
        </div>
      </div>
    </div>
  </section>;
}
