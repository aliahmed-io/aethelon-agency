"use client";

// Paper Signal style: warm paper, charcoal ink, signal orange, editorial scale, asymmetric proof-led composition.
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { IMG } from "../lib/site-assets";
import { projects } from "../../../shared/projects";

const services = [
  ["01", "Custom E-commerce", "Storefronts that make product, story, and checkout feel like one system.", ["Next.js storefronts", "Shopify & headless integrations", "Product, collection & account flows"]],
  ["02", "AI Commerce", "Useful AI in the places it can remove friction—not as a decorative chatbot.", ["Semantic product search", "Shopping assistants", "Recommendations & discovery"]],
  ["03", "3D & AR Experiences", "Make a product easier to understand by letting people see, shape, and place it.", ["Interactive 3D", "Product configurators", "WebGL product moments"]],
  ["04", "Conversion & Recovery", "A better storefront is only useful when it helps more people finish the journey.", ["Abandoned cart recovery", "Checkout optimization", "Upsells & cross-sells"]],
  ["05", "Performance & SEO", "The invisible work that makes a store feel fast, discoverable, and dependable.", ["Core Web Vitals", "Technical SEO", "Image and rendering optimization"]],
] as const;

function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return <div className="section-label"><span>{index || ""}</span><span>{children}</span><span className="label-line" /></div>;
}

function WorkCard({ project, featured = false }: { project: typeof projects[number]; featured?: boolean }) {
  return <Link prefetch={false} href={`/work/${project.slug}`} className={`work-card ${featured ? "featured" : ""}`}><div className="work-image"><Image src={project.image} alt={`${project.title} visual`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" quality={68} preload={featured} className="cover-image" /><span className="work-arrow"><ArrowUpRight /></span></div><div className="work-card-meta"><div><span className="project-number">{project.number}</span><h3>{project.title}</h3><p>{project.category}</p></div><div className="work-detail"><span>{project.stack}</span><span>{project.scope}</span></div></div></Link>;
}

function Hero() {
  return <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="signal-dot" /> Next-generation commerce systems</div><h1>Build a store<br />people <em>remember.</em></h1><p>Custom Next.js storefronts, useful AI, and immersive product experiences—built with the care of a studio and the overhead of one person.</p><div className="hero-actions"><Link className="button button-dark" href="/contact">Start a project <ArrowUpRight size={16} /></Link><a className="text-link" href="#work">See the work <ArrowDownRight size={16} /></a></div></div><div className="hero-visual"><Image src={IMG.hero} alt="Abstract product composition in warm paper and orange" fill preload quality={70} sizes="(max-width: 760px) 100vw, 50vw" className="cover-image" /><div className="hero-stamp">AE<br /><span>01—26</span></div><div className="hero-caption">Directly designed<br />and developed.</div></div></section>;
}

function TrustStrip() {
  return <div className="trust-strip">{["Custom-built", "Next.js", "AI-ready", "3D / AR", "Performance-first", "Direct communication"].map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>)}</div>;
}

function ServicesPreview() {
  const [active, setActive] = useState(0);
  return <section className="services-preview section-pad"><div className="section-intro"><SectionLabel index="02">What I build</SectionLabel><h2>Commerce is<br /><em>more</em> than a cart.</h2><p>The best storefronts do two jobs at once: they make a product desirable, then make buying it feel obvious.</p><Link href="/services" className="text-link">Explore all services <ArrowUpRight size={16} /></Link></div><div className="service-list">{services.map(([number, title, desc, bullets], index) => <div className={`service-row ${active === index ? "open" : ""}`} key={number}><button onClick={() => setActive(active === index ? -1 : index)}><span className="service-num">{number}</span><span className="service-title">{title}</span><span className="service-plus">{active === index ? "—" : "+"}</span></button>{active === index && <div className="service-detail"><p>{desc}</p><ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>}</div>)}</div></section>;
}

function Demo() {
  const [color, setColor] = useState("orange");
  const [size, setSize] = useState("M");
  const [cartNotice, setCartNotice] = useState("");
  const colors: Record<string, string> = { orange: "#ff5a1f", stone: "#d8d1c4", ink: "#252525" };
  return <section className="demo-section"><div className="demo-copy"><SectionLabel index="03">A small proof of concept</SectionLabel><h2>The site should<br /><em>do the talking.</em></h2><p>Here’s a tiny commerce interaction: choose a finish, select a size, and add the object to your cart. No theatre. Just a useful product moment.</p><span className="demo-note"><span className="signal-dot" /> Selected experiment · interactive product card</span></div><div className="product-card"><div className="product-art" style={{ "--product": colors[color] } as React.CSSProperties}><div className="product-shape" /><span className="product-code">OBJ—001</span></div><div className="product-info"><div><span className="eyebrow">The everyday object</span><h3>Signal form / 01</h3></div><strong>$148</strong></div><div className="swatches"><span>Finish</span>{Object.keys(colors).map((value) => <button key={value} aria-label={value} className={color === value ? "selected" : ""} style={{ background: colors[value] }} onClick={() => setColor(value)} />)}</div><div className="sizes"><span>Size</span>{["S", "M", "L"].map((value) => <button key={value} className={size === value ? "selected" : ""} onClick={() => setSize(value)}>{value}</button>)}</div><button className="button button-orange" onClick={() => setCartNotice(`Signal form / 01 — ${size} added to cart`)}>Add to cart <ArrowUpRight size={16} /></button>{cartNotice && <p className="form-feedback" role="status">{cartNotice}</p>}</div></section>;
}

function FAQ() {
  const questions = ["How much does a custom store cost?", "Do you work with Shopify?", "Can you improve an existing store?", "What happens after launch?"];
  const answers = ["Projects are scoped around the problem, not a fixed template. Starting ranges are shared once the scope is clear, and pricing stays transparent from there.", "Yes. Shopify can be the commerce engine behind a custom Next.js storefront, or the existing theme can be improved in place.", "Yes. Performance, UX, recovery, and technical SEO work can be more valuable than starting over.", "Build → launch → improve. Ongoing development and optimization are available when there is a clear next problem to solve."];
  const [open, setOpen] = useState<number | null>(null);
  return <section className="faq section-pad"><div className="faq-heading"><SectionLabel index="05">Useful answers</SectionLabel><h2>Before we<br /><em>start.</em></h2></div><div className="faq-list">{questions.map((question, index) => <div className="faq-item" key={question}><button onClick={() => setOpen(open === index ? null : index)}><span>{question}</span>{open === index ? <ChevronDown className="rotate" /> : <ChevronDown />}</button>{open === index && <p>{answers[index]}</p>}</div>)}</div></section>;
}

function CTA() {
  return <section className="closing-cta"><div className="eyebrow"><span className="signal-dot" /> The next useful thing</div><h2>Bring the hard part.<br /><em>I’ll bring the system.</em></h2><Link href="/contact" className="button button-paper">Start a project <ArrowUpRight size={16} /></Link></section>;
}

export default function HomePage() {
  return <><Hero /><TrustStrip /><main><section className="work-section section-pad" id="work"><div className="section-intro row-intro"><SectionLabel index="01">Selected work</SectionLabel><div><h2>Ideas that<br /><em>ship.</em></h2><p>Self-initiated experiments and builds exploring what commerce can feel like when design and engineering start in the same room.</p></div><Link href="/work" className="text-link">View all work <ArrowUpRight size={16} /></Link></div><div className="work-grid"><WorkCard project={projects[0]} featured /><WorkCard project={projects[1]} /><WorkCard project={projects[2]} /></div></section><ServicesPreview /><section className="split-statement"><div className="split-image"><Image src={IMG.work3} alt="Abstract product form" fill sizes="(max-width: 760px) 100vw, 50vw" className="cover-image" /></div><div className="split-copy"><SectionLabel index="04">Why this studio</SectionLabel><h2>Big-agency<br /><em>thinking.</em><br />Small-studio<br /><em>economics.</em></h2><p>You work directly with the person shaping the strategy, designing the experience, and shipping the system. Fewer layers. Better context. A more sensible budget.</p><Link href="/about" className="text-link">How I work <ArrowUpRight size={16} /></Link></div></section><Demo /><FAQ /><CTA /></main></>;
}
