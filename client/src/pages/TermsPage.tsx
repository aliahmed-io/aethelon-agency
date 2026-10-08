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
    title: "Engagement Model & 3-Stage Milestone Plan",
    kicker: "Delivery",
    content: (
      <>
        <p>
          Aethelon operates exclusively on <strong>fixed-scope, milestone-based agreements</strong> with guaranteed turnarounds
          (typically 2 to 4 weeks for bespoke storefronts and interactive 3D configurators).
        </p>
        <p>Unless customized in an approved Statement of Work, standard builds follow our codified 3-stage milestone schedule:</p>
        <ul className="legal-list">
          <li>
            <strong>Milestone 1 — Architecture &amp; Kick-off Deposit (40%):</strong> Covers technical blueprinting,
            design tokens, component architecture, and project reservation. Payable prior to sprint commencement.
          </li>
          <li>
            <strong>Milestone 2 — Interactive Staging Approval (30%):</strong> Delivered as a functional, interactive
            Next.js staging deployment connected to your product catalog with 3D/AR previews and cart flows.
          </li>
          <li>
            <strong>Milestone 3 — Production QA &amp; Launch (30%):</strong> Full cross-device QA, edge performance optimization,
            DNS propagation, live deployment, and complete transfer of private Git repositories and administrative ownership.
          </li>
        </ul>
        <p>
          Invoices are payable upon receipt. Work on subsequent milestones proceeds upon formal sign-off and settlement of the
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
          <strong>You own your storefront.</strong> Upon full settlement of all milestones in the project agreement,
          Aethelon assigns and transfers to the Client complete, unencumbered intellectual property ownership of:
        </p>
        <ul className="legal-list">
          <li>The entire private Git repository containing custom Next.js frontend code, React components, and styling systems;</li>
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
        <p>Timely delivery relies on active client partnership. The Client agrees to:</p>
        <ul className="legal-list">
          <li>
            <strong>Asset &amp; Access Provision:</strong> Provide required branding assets, photography, catalog data,
            and necessary API access (such as Shopify Storefront API tokens or headless CMS credentials) prior to sprint kickoff.
          </li>
          <li>
            <strong>Feedback Turnaround:</strong> Review staging milestones and provide consolidated technical or design
            feedback within five (5) business days of presentation.
          </li>
          <li>
            <strong>Third-Party Accounts:</strong> Maintain active subscriptions for third-party hosting, platform fees (Shopify Plus),
            domain registrars, and external API services.
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
    title: "Revisions & Scope Boundaries",
    kicker: "Modifications",
    content: (
      <>
        <p>
          Every standard build includes <strong>five (5) complimentary revision rounds</strong> during the design and staging phases
          to ensure pixel-perfect delivery to brand standards.
        </p>
        <p>
          Requests for architectural alterations, new page templates, third-party integration shifts, or features outside the
          written Statement of Work are treated as Change Orders. Aethelon will submit a fixed-cost and timeline impact assessment
          for written client approval before executing any out-of-scope work.
        </p>
      </>
    ),
  },
  {
    id: "warranty",
    title: "Warranty & Post-Launch Maintenance",
    kicker: "Assurance",
    content: (
      <>
        <p>
          Every custom storefront includes <strong>two (2) months of complimentary maintenance and bug-fix warranty</strong> commencing
          on the official production launch date.
        </p>
        <p>
          During the warranty window, Aethelon will rectify any software defects, functional regressions, or layout anomalies
          reported by the Client that deviate from the agreed specifications at zero additional charge.
        </p>
        <p>
          Following the warranty period, ongoing support, continuous conversion optimization, and new feature velocity are
          available via our dedicated monthly Retainer Packages (10h/mo or 20h/mo).
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
          In the event of a disagreement, both parties commit to an initial 30-day period of amicable executive consultation.
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
      kicker="Commercial Standards &amp; Client Agreement"
      title="Terms &amp; Conditions"
      deck="Our standard commercial framework: fixed-scope milestone delivery, 100% client code ownership, guaranteed timelines, and transparent studio practices."
      effectiveDate="12 October 2026"
      version="2.1"
      sections={TERMS_SECTIONS}
    />
  );
}
