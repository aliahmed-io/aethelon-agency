import React from "react";
import LegalDocumentLayout, { LegalSection } from "../components/legal/LegalDocumentLayout";

const COOKIE_SECTIONS: readonly LegalSection[] = [
  {
    id: "overview",
    title: "Cookie Philosophy & Scope",
    kicker: "Overview",
    content: (
      <>
        <p>
          This Cookie Policy explains how Aethelon ("we", "us", "our") utilizes cookies, local storage,
          and equivalent web storage mechanisms on our website (aethelon.com).
        </p>
        <p>
          In alignment with our engineering ethos, we maintain a <strong>privacy-first, zero-surveillance baseline</strong>:
          we do not deploy third-party advertising tracking pixels (such as Meta/Facebook Pixel, TikTok trackers,
          or programmatic behavioral ad networks). Any storage mechanism used on our site exists strictly to deliver
          high-performance rendering, maintain accessibility preferences, and ensure infrastructure stability.
        </p>
      </>
    ),
  },
  {
    id: "what-are-cookies",
    title: "What Are Cookies & Web Storage?",
    kicker: "Mechanics",
    content: (
      <>
        <p>
          A cookie is a small data file transferred to your browser when visiting a website. It allows the site to recognize
          your device, remember display preferences across pages, and facilitate secure cryptographic handshakes.
        </p>
        <p>
          We also utilize modern browser <strong>HTML5 LocalStorage</strong> and <strong>SessionStorage</strong>, which store
          key-value pairs locally on your device without transmitting data in HTTP request headers on every network roundtrip,
          drastically reducing latency and battery consumption.
        </p>
      </>
    ),
  },
  {
    id: "cookie-categories",
    title: "Categories of Storage We Deploy",
    kicker: "Taxonomy",
    content: (
      <>
        <h3 className="legal-subheading">1. Strictly Necessary / Essential Storage</h3>
        <p>
          These mechanisms are technically indispensable for the website to function securely and reliably.
          Under the ePrivacy Directive and GDPR, strictly necessary cookies are exempt from requiring advance user consent:
        </p>
        <ul className="legal-list">
          <li><strong>Theme &amp; Visual Preferences:</strong> Storing your selection between light and dark modes to prevent visual flash on page navigation.</li>
          <li><strong>Security Tokens &amp; Rate Limiting:</strong> Protecting contact form submissions against bot abuse and denial-of-service spam.</li>
          <li><strong>Navigation Transition State:</strong> Synchronizing route interceptors so smooth page transitions complete without blocking browser history.</li>
        </ul>

        <h3 className="legal-subheading">2. Performance &amp; Diagnostic Telemetry</h3>
        <p>
          We capture anonymous real-user monitoring (RUM) signals—specifically Core Web Vitals (Largest Contentful Paint,
          Cumulative Layout Shift, Interaction to Next Paint). These measurements contain <strong>no personal identifiers</strong>,
          are not linked to user accounts, and serve solely to verify that our edge nodes maintain sub-100ms global benchmarks.
        </p>

        <h3 className="legal-subheading">3. Marketing &amp; Third-Party Ad Cookies</h3>
        <p>
          <strong>We do not use marketing or cross-site tracking cookies.</strong> You will never be retargeted across the web
          or profiled by advertising brokers as a consequence of visiting Aethelon.
        </p>
      </>
    ),
  },
  {
    id: "cookie-table",
    title: "Complete Storage Inventory",
    kicker: "Audit",
    content: (
      <>
        <p>Below is an itemized breakdown of cookies and local storage keys utilized across aethelon.com:</p>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Key / Name</th>
                <th>Type</th>
                <th>Purpose</th>
                <th>Duration</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>aethelon-theme</code></td>
                <td>LocalStorage</td>
                <td>Stores active visual mode preference (light / dark) to eliminate unstyled flash.</td>
                <td>Persistent (1 Year)</td>
                <td>Functional / Essential</td>
              </tr>
              <tr>
                <td><code>data-route-loading</code></td>
                <td>Session DOM State</td>
                <td>Maintains Ink Veil route transition locking state during App Router navigation.</td>
                <td>Session Only</td>
                <td>Essential</td>
              </tr>
              <tr>
                <td><code>__cf_bm</code></td>
                <td>HTTP Cookie</td>
                <td>Cloudflare Bot Management token used to distinguish humans from automated attack scripts.</td>
                <td>30 Minutes</td>
                <td>Security / Essential</td>
              </tr>
              <tr>
                <td><code>cf_clearance</code></td>
                <td>HTTP Cookie</td>
                <td>Stores clearance proof following successful completion of a security challenge.</td>
                <td>Up to 1 Year</td>
                <td>Security / Essential</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "management",
    title: "How to Manage & Disable Cookies",
    kicker: "Control",
    content: (
      <>
        <p>
          You have the absolute right to decide whether to accept or reject cookies. You can configure or reset your browser
          settings to reject cookies or prompt you prior to acceptance.
        </p>
        <p>
          Consult the official documentation for your specific browser:
        </p>
        <ul className="legal-list">
          <li><strong>Apple Safari:</strong> Settings &gt; Safari &gt; Advanced &gt; Block All Cookies</li>
          <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Third-party cookies</li>
          <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection</li>
          <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions &gt; Manage and delete cookies</li>
        </ul>
        <p>
          <em>Note:</em> Disabling essential local storage may result in theme preferences defaulting to your operating system's
          system-level preference on each browser refresh.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Questions Regarding Web Hygiene",
    kicker: "Inquiries",
    content: (
      <>
        <p>
          If you have questions regarding our technical telemetry, cookie implementation, or privacy posture,
          contact our engineering team directly at:
        </p>
        <div className="legal-highlight-box">
          <strong>Aethelon Architecture &amp; Data Hygiene</strong>
          <br />
          Email: <a href="mailto:legal@aethelon.com" className="legal-inline-link">legal@aethelon.com</a>
        </div>
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalDocumentLayout
      kicker="Telemetry & Digital Hygiene"
      title="Cookie Policy"
      deck="How Aethelon utilizes essential storage, rejects invasive third-party ad pixels, and ensures transparent digital hygiene across our storefront architecture."
      effectiveDate="12 October 2026"
      version="1.2"
      sections={COOKIE_SECTIONS}
    />
  );
}
