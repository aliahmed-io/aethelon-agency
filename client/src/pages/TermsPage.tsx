import React from "react";
import LegalDocumentLayout, { LegalSection } from "../components/legal/LegalDocumentLayout";

const TERMS_SECTIONS: readonly LegalSection[] = [
  {
    id: "scope",
    title: "Scope & Applicability",
    kicker: "Framework",
    content: (
      <>
        <p>
          These General Terms and Conditions ("Terms") govern all proposals, statements of work, milestone delivery agreements,
          and engineering services provided by Aethelon ("Studio", "we", "us") to any commissioning client ("Client", "you").
        </p>
        <p>
          By signing a project proposal, paying an initial milestone deposit, or authorizing Aethelon in writing to commence
          work, the Client formally accepts these Terms. These Terms supersede any conflicting client procurement conditions
          unless explicitly counter-signed by an authorized representative of Aethelon.
        </p>
        <div className="legal-highlight-box">
          <strong>Order of Precedence:</strong> In the event of any ambiguity or conflict between documents, the following
          hierarchy of legal authority applies:
          <ol className="legal-ordered-list">
            <li>The specific written Project Proposal / Statement of Work (SOW);</li>
            <li>Any mutually executed Service Level Agreement (SLA);</li>
            <li>These General Terms and Conditions.</li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: "commercial-model",
    title: "Engagement Model & 4-Stage Risk-Free Milestone Plan",
    kicker: "Delivery",
    content: (
      <>
        <p>
          Aethelon operates on <strong>fixed-price, milestone-based agreements</strong> with fast, predictable turnarounds
          (typically <strong>10 to 14 days</strong> for custom Next.js storefronts and flagship 3D &amp; AI commerce builds,
          available either as a headless frontend connected to your existing Shopify/WooCommerce backend or as a 100% custom
          full-stack platform).
        </p>
        <p>Unless customized in an approved Statement of Work, standard builds follow our codified 4-stage milestone schedule:</p>
        <ul className="legal-list">
          <li>
            <strong>Milestone 1 — Kick-off &amp; Scope Deposit (20% — $400 on a $2,000 build):</strong> Reserves your 10-day
            engineering sprint and covers architecture setup, design system tokens, and catalog integration planning.
          </li>
          <li>
            <strong>Milestone 2 — Interactive Design Approval (30%):</strong> Payable only after you review and approve the
            interactive design preview on a live staging link (typically Day 4).
          </li>
          <li>
            <strong>Milestone 3 — Working Staging Storefront (30%):</strong> Payable only after you test the full working
            staging site with your products, checkout flow, cart recovery, and 3D/AI features on a live URL (typically Day 8).
          </li>
          <li>
            <strong>Milestone 4 — Production Launch &amp; Git Handoff (20%):</strong> Payable at launch upon cross-device QA,
            Core Web Vitals verification, DNS cutover, and full transfer of private Git repositories and administrative ownership
            (typically Day 10–14).
          </li>
        </ul>
        <p>
          Invoices are payable upon milestone approval. Work on subsequent milestones proceeds upon sign-off and settlement of the
          preceding milestone.
        </p>
      </>
    ),
  },
  {
    id: "ownership",
    title: "Intellectual Property & 100% Code Ownership",
    kicker: "Guarantee",
    content: (
      <>
        <p>
          <strong>You own your storefront 100%.</strong> Upon full settlement of all milestones in the project agreement,
          Aethelon assigns and transfers to the Client complete, unencumbered intellectual property ownership of:
        </p>
        <ul className="legal-list">
          <li>The entire private Git repository containing custom Next.js frontend/backend code, React components, and styling systems;</li>
          <li>All bespoke UI/UX designs, Figma artifacts, and vector brand assets created specifically for the project;</li>
          <li>Custom 3D geometries, glTF/GLB models, shaders, and AR asset configurations commissioned under the agreement.</li>
        </ul>
        <div className="legal-highlight-box">
          <strong>Zero Agency Lock-In:</strong> Aethelon imposes zero ongoing licensing fees, zero proprietary runtime lock-in,
          and zero penalties for transferring repository hosting, CI/CD pipelines, or deployment infrastructure to your in-house
          engineers or external partners.
        </div>
        <p>
          <em>Pre-existing Tooling:</em> Standard open-source libraries (e.g. Next.js, React, Tailwind CSS, Three.js) and Aethelon's
          general starter boilerplates remain governed by their respective open-source licenses, granted to the Client on an
          irrevocable, perpetual, royalty-free basis.
        </p>
      </>
    ),
  },
  {
    id: "client-obligations",
    title: "Client Responsibilities & Prerequisites",
    kicker: "Collaboration",
    content: (
      <>
        <p>Fast 10–14 day delivery relies on responsive collaboration. The Client agrees to:</p>
        <ul className="legal-list">
          <li>
            <strong>Asset &amp; Access Provision:</strong> Provide required branding assets, product photography, catalog data,
            and necessary API access (such as Shopify Storefront API tokens, WooCommerce keys, or Stripe credentials) at kickoff.
          </li>
          <li>
            <strong>Feedback Turnaround:</strong> Review live staging milestones and provide consolidated design or functional
            feedback within three (3) business days of presentation to keep the 10–14 day launch timeline on track.
          </li>
          <li>
            <strong>Third-Party Accounts:</strong> Maintain active subscriptions for chosen third-party platforms (such as Shopify,
            WooCommerce, domain registrars, or cloud hosting).
          </li>
        </ul>
        <p>
          The Client warrants that all copy, imagery, 3D references, and trademark materials provided to Aethelon are owned
          by the Client or properly licensed, and agrees to indemnify Aethelon against third-party copyright claims arising
          from client-provided materials.
        </p>
      </>
    ),
  },
  {
    id: "revisions",
    title: "Revisions & Modular Add-Ons",
    kicker: "Modifications",
    content: (
      <>
        <p>
          Every standard build includes <strong>complimentary revision rounds at both the Design Preview and Staging milestones</strong>
          to ensure pixel-perfect alignment with your brand before you approve the milestone.
        </p>
        <p>
          Optional modular add-ons (such as Extra 3D Product Models at $400, Standalone AI Shopping Assistant at $500, Smart AI
          Search at $400, or Extra Custom Landing Pages at $200) or out-of-scope custom features can be added at any time via a
          fixed-price written approval.
        </p>
      </>
    ),
  },
  {
    id: "warranty",
    title: "2 Months Free Support & Optional Care Plan",
    kicker: "Assurance",
    content: (
      <>
        <p>
          Every custom storefront includes <strong>two (2) months of complimentary post-launch support, updates, and bug-fix warranty</strong>
          commencing on the official production launch date.
        </p>
        <p>
          During this 60-day window, Aethelon will rectify any software defects, functional regressions, or layout issues
          and assist with minor content adjustments at zero additional charge.
        </p>
        <p>
          Following the initial 2-month free support period, clients may optionally enroll in our <strong>$200/month Care Plan</strong>
          covering ongoing updates, speed monitoring, security patches, and priority engineering support—cancel anytime with zero lock-in.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    kicker: "Boundaries",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, Aethelon's total aggregate liability arising out of or related to
          any engagement—whether in contract, tort, or otherwise—shall be strictly limited to the total fees actually paid by the
          Client to Aethelon under the applicable Statement of Work in the twelve (12) months preceding the claim.
        </p>
        <p>
          In no event shall Aethelon be liable for indirect, incidental, special, consequential, or punitive damages, including
          loss of profits, loss of data, business interruption, or damages arising from external platform outages (such as Shopify
          infrastructure downtime, payment gateway API outages, or third-party cloud service disruptions).
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality & Non-Disclosure",
    kicker: "Protection",
    content: (
      <>
        <p>
          Both parties agree to treat all non-public technical, commercial, financial, and strategic information disclosed during
          the engagement as strictly confidential. Confidential information shall not be disclosed to any third party without
          prior written authorization, except as required by law.
        </p>
        <p>
          Unless explicitly restricted via a custom Non-Disclosure Agreement (NDA), Aethelon retains the right to display the
          completed project in our portfolio, design archives, and case study documentation as evidence of professional craftsmanship.
        </p>
      </>
    ),
  },
  {
    id: "disputes",
    title: "Governing Law & Dispute Resolution",
    kicker: "Jurisdiction",
    content: (
      <>
        <p>
          These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in
          accordance with international commercial principles and applicable statutory laws.
        </p>
        <p>
          In the event of a disagreement, both parties commit to an initial 30-day period of amicable consultation.
          If unresolved, disputes shall be submitted to binding commercial arbitration conducted in English, with proceedings
          conducted virtually to facilitate efficient remote resolution.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocumentLayout
      kicker="Commercial Standards & Client Agreement"
      title="Terms & Conditions"
      deck="Our commercial framework: 20% ($400) deposit to start, 4-stage milestone delivery in 10–14 days, 100% client code ownership, and 2 months of free post-launch support."
      effectiveDate="12 October 2026"
      version="2.2"
      sections={TERMS_SECTIONS}
    />
  );
}
