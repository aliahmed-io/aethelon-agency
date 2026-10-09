import React from "react";
import LegalDocumentLayout, { LegalSection } from "../components/legal/LegalDocumentLayout";

const PRIVACY_SECTIONS: readonly LegalSection[] = [
  {
    id: "controller",
    title: "Data Controller & Contact Information",
    kicker: "Identity",
    content: (
      <>
        <p>
          Aethelon ("we", "us", "our") operates as an independent commerce engineering studio specializing in
          headless Next.js storefronts, 3D/AR product visualizations, and bespoke e-commerce systems.
        </p>
        <p>
          This Privacy Policy sets out how Aethelon collects, processes, and protects any personal information
          you provide when visiting our website (aethelon.com) or engaging our studio for engineering services.
        </p>
        <p>
          For any data protection inquiries, requests to exercise statutory rights, or compliance communications,
          our designated privacy contact is reachable at:
        </p>
        <div className="legal-highlight-box">
          <strong>Aethelon Studio Legal &amp; Compliance</strong>
          <br />
          Email: <a href="mailto:legal@aethelon.com" className="legal-inline-link">legal@aethelon.com</a>
          <br />
          General Inquiries: <a href="mailto:hello@aethelon.com" className="legal-inline-link">hello@aethelon.com</a>
        </div>
      </>
    ),
  },
  {
    id: "principles",
    title: "Principles of Data Processing",
    kicker: "Governance",
    content: (
      <>
        <p>
          Our technical architecture and corporate governance adhere strictly to the General Data Protection
          Regulation (EU Regulation 2016/679 - GDPR), the UK GDPR, and international data privacy benchmarks:
        </p>
        <ul className="legal-list">
          <li>
            <strong>Lawfulness, Fairness, and Transparency:</strong> We process data only where an explicit,
            documented legal basis exists.
          </li>
          <li>
            <strong>Purpose Limitation:</strong> Personal data is collected solely for explicit, legitimate commercial
            and technical purposes and not further processed in a manner incompatible with those aims.
          </li>
          <li>
            <strong>Data Minimization:</strong> We do not collect extraneous tracking profiles, invasive behavioral
            metrics, or unnecessary personal identifiers.
          </li>
          <li>
            <strong>Zero Data Monetization:</strong> We never sell, rent, monetize, or broker client or visitor data
            to third-party advertisers or data brokers under any circumstances.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-collected",
    title: "Information We Collect",
    kicker: "Categories",
    content: (
      <>
        <p>Depending on your interaction with Aethelon, we collect the following categories of information:</p>
        
        <h3 className="legal-subheading">A. Information You Voluntarily Provide</h3>
        <ul className="legal-list">
          <li>
            <strong>Project Discovery &amp; Contact Inquiries:</strong> When submitting an inquiry via our contact flow,
            we collect your name, business email address, company or brand name, current storefront URL, estimated budget range,
            target delivery timeframe, and project description.
          </li>
          <li>
            <strong>Technical Dispatch Subscriptions:</strong> When subscribing to our engineering insights, we collect your
            verified email address and record an audit timestamp of your opt-in consent.
          </li>
          <li>
            <strong>Contractual &amp; Commercial Records:</strong> For active client engagements, we process legal entity names,
            billing addresses, authorized signatory details, and milestone invoicing histories.
          </li>
        </ul>

        <h3 className="legal-subheading">B. Automatically Collected Technical Telemetry</h3>
        <ul className="legal-list">
          <li>
            <strong>HTTP Protocol Data:</strong> When requesting pages, our edge servers receive standard network logs
            including IP address (anonymized at edge ingest), browser agent string, operating system version, referring URL,
            and request timestamp.
          </li>
          <li>
            <strong>Core Web Vitals &amp; Performance Telemetry:</strong> Aggregated, non-personally identifiable metrics
            (LCP, CLS, INP) captured exclusively to maintain sub-100ms delivery standards across global CDN edge nodes.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing (GDPR Art. 6)",
    kicker: "Compliance",
    content: (
      <>
        <p>We process your personal information only when authorized under applicable statutory frameworks:</p>
        <ul className="legal-list">
          <li>
            <strong>Performance of a Contract (Art. 6(1)(b)):</strong> Necessary to draft, execute, and deliver
            our fixed-scope milestone engineering agreements and coordinate staging releases.
          </li>
          <li>
            <strong>Explicit Consent (Art. 6(1)(a)):</strong> Applicable when you opt into engineering newsletters,
            request specific technical documentation, or grant non-essential functional preferences.
          </li>
          <li>
            <strong>Legitimate Interests (Art. 6(1)(f)):</strong> Protecting our digital infrastructure against
            denial-of-service (DDoS) attacks, unauthorized intrusion, spam injection, and maintaining cryptographic audit integrity.
          </li>
          <li>
            <strong>Legal Obligation (Art. 6(1)(c)):</strong> Compliance with statutory financial, accounting, and tax
            retention requirements for commercial contracts.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Service Providers & Subprocessors",
    kicker: "Architecture",
    content: (
      <>
        <p>
          To maintain high availability and security, we partner exclusively with verified technical infrastructure
          providers bound by strict Data Processing Agreements (DPAs) and Standard Contractual Clauses (SCCs):
        </p>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Purpose</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Vercel Inc.</strong></td>
                <td>Global Edge Hosting, Next.js App Router Compute &amp; CDN Delivery</td>
                <td>Global Edge / EU Regions</td>
              </tr>
              <tr>
                <td><strong>Cloudflare Inc.</strong></td>
                <td>DNS, DDoS Mitigation, Edge TLS Cryptography &amp; WAF Protection</td>
                <td>Global Anycast Network</td>
              </tr>
              <tr>
                <td><strong>Resend Inc.</strong></td>
                <td>Transactional Notification &amp; Contact Delivery Infrastructure</td>
                <td>United States / EU DPA</td>
              </tr>
              <tr>
                <td><strong>GitHub Inc.</strong></td>
                <td>Private Client Git Code Repositories &amp; Version Control Transfer</td>
                <td>United States / EU SCCs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data Retention & Storage",
    kicker: "Lifecycle",
    content: (
      <>
        <p>
          We retain personal data only for as long as necessary to fulfill the purposes for which it was collected,
          including satisfying legal, regulatory, accounting, or reporting obligations:
        </p>
        <ul className="legal-list">
          <li>
            <strong>Prospective Inquiries:</strong> Unconverted project inquiries are retained for up to 18 months
            to reference prior architectural scopes, after which they are systematically purged.
          </li>
          <li>
            <strong>Client Contract Records:</strong> Written agreements, milestone approvals, and invoices are
            retained for 7 years in accordance with international commercial and tax compliance standards.
          </li>
          <li>
            <strong>Newsletter Subscriptions:</strong> Retained until unsubscribed. Every communication includes an
            instant, automated one-click unsubscribe mechanism.
          </li>
          <li>
            <strong>Edge Server Logs:</strong> Automatically truncated, anonymized, and rotated every 30 days.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "rights",
    title: "Your Statutory Rights",
    kicker: "Empowerment",
    content: (
      <>
        <p>Under the GDPR and equivalent data protection legislation, you hold the following non-negotiable rights:</p>
        <ul className="legal-list">
          <li><strong>Right of Access:</strong> Request a full copy of the personal data we hold concerning you.</li>
          <li><strong>Right to Rectification:</strong> Request correction of inaccurate, incomplete, or outdated information.</li>
          <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal information where no overriding legal or contractual retention obligation exists.</li>
          <li><strong>Right to Restrict Processing:</strong> Limit how we process your personal data under disputed circumstances.</li>
          <li><strong>Right to Data Portability:</strong> Receive your provided data in a structured, commonly used, and machine-readable format.</li>
          <li><strong>Right to Object:</strong> Object at any time to the processing of your data based on legitimate interests.</li>
          <li><strong>Right to Withdraw Consent:</strong> Withdraw previously granted consent at any time without affecting the lawfulness of prior processing.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at <a href="mailto:legal@aethelon.com" className="legal-inline-link">legal@aethelon.com</a>.
          We respond to all verified requests within 30 days with zero fee assessment.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security & Safeguards",
    kicker: "Hardening",
    content: (
      <>
        <p>
          As an engineering studio, security is built into our default development practices:
        </p>
        <ul className="legal-list">
          <li><strong>End-to-End Encryption:</strong> All public traffic is forced over TLS 1.3 with strict HSTS enforcement.</li>
          <li><strong>Zero Client-Side Secrets:</strong> API keys, webhook signing secrets, and tokens never touch browser bundles; all external communication is proxied via rate-limited edge endpoints.</li>
          <li><strong>Access Governance:</strong> Studio repositories and cloud infrastructure enforce mandatory hardware MFA, zero-trust network access, and least-privilege role boundaries.</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentLayout
      kicker="Studio Compliance & Data Hygiene"
      title="Privacy Policy"
      deck="How Aethelon protects your personal information, upholds strict data minimization, and delivers transparent, privacy-first commerce engineering."
      effectiveDate="12 October 2026"
      version="1.4"
      sections={PRIVACY_SECTIONS}
    />
  );
}
