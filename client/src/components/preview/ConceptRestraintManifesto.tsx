"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ConceptRestraintManifesto() {
  return (
    <div className="concept-restraint-section">
      <div className="restraint-container">
        {/* Editorial Lead Header */}
        <div className="restraint-header">
          <div className="restraint-eyebrow">
            <span className="signal-dot" /> 02 · The Philosophy of Restraint
          </div>
          <h2 className="restraint-headline">
            The best stores don’t shout.<br />
            <em>They create calm.</em>
          </h2>
          <p className="restraint-lead">
            Modern e-commerce has become overcrowded with aggressive pop-ups, artificial countdown urgency, and visual clutter designed to rush customers into transactions.
          </p>
          <p className="restraint-lead">
            We take the opposite approach. We design with the discipline of an architectural monograph. We believe discerning clients are moved by quiet confidence: unhurried whitespace, exquisite typography, and interfaces that respect their intelligence.
          </p>
        </div>

        {/* Dual Editorial Visual Diptych */}
        <div className="restraint-diptych-grid">
          <div className="diptych-card">
            <div className="diptych-image-wrap">
              <Image
                src="/images/oakwell/editorial/dining.jpg"
                alt="Oakwell architectural dining table in morning light"
                fill
                unoptimized
                className="cover-image diptych-img"
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
            <div className="diptych-caption">
              <span className="diptych-num">01</span>
              <div>
                <h4>Material Permanence</h4>
                <p>Designing digital spaces with the same weight, texture, and lasting value as the physical pieces they represent.</p>
              </div>
            </div>
          </div>

          <div className="diptych-card">
            <div className="diptych-image-wrap">
              <Image
                src="/images/velorum/gallery/gallery_table_macro_1768638724571.png"
                alt="Macro craftsmanship detail of watch assembly"
                fill
                unoptimized
                className="cover-image diptych-img"
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
            <div className="diptych-caption">
              <span className="diptych-num">02</span>
              <div>
                <h4>Digital Serenity</h4>
                <p>Zero layout shifts, fluid gesture pacing, and unhurried interactions that allow genuine desire to take root.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Footnote */}
        <div className="restraint-footer">
          <p className="restraint-note">
            Aethelon builds bespoke commerce platforms for independent founders, luxury ateliers, and category-defining brands.
          </p>
          <Link href="/about" className="text-link restraint-link">
            Read our studio philosophy <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
