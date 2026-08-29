"use client";

import { useState } from "react";

interface ServiceItem {
  number: string;
  title: string;
  desc: string;
  bullets: readonly string[];
}

export default function ServicesAccordion({ services }: { services: readonly (readonly [string, string, string, readonly string[]])[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="service-list">
      {services.map(([number, title, desc, bullets], index) => (
        <div className={`service-row ${active === index ? "open" : ""}`} key={number}>
          <button
            type="button"
            onClick={() => setActive(active === index ? -1 : index)}
            aria-expanded={active === index}
            aria-controls={`service-detail-${number}`}
          >
            <span className="service-num">{number}</span>
            <span className="service-title">{title}</span>
            <span className="service-plus" aria-hidden="true">{active === index ? "—" : "+"}</span>
          </button>
          {active === index && (
            <div id={`service-detail-${number}`} className="service-detail">
              <p>{desc}</p>
              <ul>
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
