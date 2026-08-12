'use client';

// Paper Signal style: editorial service architecture, warm paper, charcoal ink, signal orange, asymmetrical proof-led layouts.
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

const services = [
  ["01", "Custom E-commerce", "Storefronts that make product, story, and checkout feel like one system.", ["Next.js storefronts", "Shopify & headless integrations", "Product, collection & account flows", "Payments, inventory & analytics"], "Method / map the commerce model before the component model."],
  ["02", "AI Commerce", "Useful AI in the places it can remove friction—not as a decorative chatbot.", ["Semantic product search", "Shopping assistants", "Recommendations & discovery", "Content and workflow automation"], "Constraint / AI should shorten a decision, not add another interface."],
  ["03", "3D & AR Experiences", "Make a product easier to understand by letting people see, shape, and place it.", ["Interactive 3D", "Product configurators", "WebGL product moments", "AR-ready experience design"], "Deliverable / a lightweight product moment that earns its bandwidth."],
  ["04", "Conversion & Recovery", "A better storefront is only useful when it helps more people finish the journey.", ["Abandoned cart recovery", "Checkout optimization", "Upsells & cross-sells", "Analytics-led UX improvements"], "System note / build → launch → improve, with the handoff still open."],
  ["05", "Performance & SEO", "The invisible work that makes a store feel fast, discoverable, and dependable.", ["Core Web Vitals", "Technical SEO", "Image and rendering optimization", "Structured data and caching"], "Proof cue / performance is designed into the route, not audited at the end."],
  ["06", "Ongoing Development", "Build, launch, improve—without disappearing after the handoff.", ["Feature development", "Maintenance & bug fixes", "Growth experiments", "Analytics-driven improvements"], "Working style / direct access to the person making the next decision."],
] as const;

function SectionLabel({ children, index }: { children: ReactNode; index?: string }) {
  return <div className="section-label"><span>{index || ""}</span><span>{children}</span><span className="label-line" /></div>;
}

function CTA() {
  return <section className="closing-cta"><div className="eyebrow"><span className="signal-dot" /> The next useful thing</div><h2>Bring the hard part.<br /><em>I’ll bring the system.</em></h2><Link href="/contact" className="button button-paper">Start a project <ArrowUpRight size={16} /></Link></section>;
}

export default function ServicesPage() {
  return <main className="inner-page services-page"><div className="inner-hero"><SectionLabel index="02">Services</SectionLabel><h1>Commerce,<br /><em>properly made.</em></h1><p>From a sharper storefront to a smarter recovery loop, each service is designed to move a real business forward.</p></div><div className="service-architecture"><SectionLabel index="02—A">The system</SectionLabel><div><h2>One studio.<br /><em>Six useful levers.</em></h2><p>Choose the part of the commerce system that is slowing the business down. Then make it clearer, faster, or more useful.</p></div><div className="architecture-tags">{["Strategy", "UX direction", "Frontend systems", "Commerce integration", "AI workflows", "Growth loop"].map((x, i) => <span key={x}><b>0{i + 1}</b>{x}</span>)}</div></div><div className="long-services">{services.map(([number, title, desc, bullets, proof]) => <article key={number}><div className="service-num">{number}</div><div><h2>{title}</h2><p>{desc}</p><div className="service-proof">{proof}</div><ul>{bullets.slice(0, 4).map(b => <li key={b}><Check size={15} />{b}</li>)}</ul></div><ArrowUpRight className="article-arrow" /></article>)}</div><CTA /></main>;
}
