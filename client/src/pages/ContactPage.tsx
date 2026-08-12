'use client';

// Paper Signal style: editorial project intake, warm paper, charcoal ink, signal orange, direct and proof-led.
import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "../lib/mockBackend";

function SectionLabel({ children, index }: { children: ReactNode; index?: string }) {
  return <div className="section-label"><span>{index || ""}</span><span>{children}</span><span className="label-line" /></div>;
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  if (sent) return <main className="inner-page contact-page"><div className="success-state"><span className="signal-dot" /><h1>Good.<br /><em>Let’s make it useful.</em></h1><p>Your project note is captured in this demo flow. In a live build, this is where it would move into a direct email or CRM workflow.</p><Link href="/" className="button button-dark">Back home <ArrowUpRight size={16} /></Link></div></main>;

  return <main className="inner-page contact-page"><div className="inner-hero"><SectionLabel index="06">Start a project</SectionLabel><h1>Have a project<br /><em>in mind?</em></h1><p>Tell me what you’re building, what isn’t working, or what you’d like to improve. I’ll reply with a clear next step.</p></div><div className="contact-brief"><span>Good fit for</span><strong>Brands with a real product, a real constraint, and a desire to make the next release more useful.</strong><span>Not a good fit for</span><strong>Projects looking for a cheap reskin with no room for thought.</strong></div><form className="project-form" onSubmit={async (e) => { e.preventDefault(); setSending(true); const form = e.currentTarget; const data = new FormData(form); try { await submitContact({ name: data.get("name")?.toString() || "", email: data.get("email")?.toString() || "", company: data.get("company")?.toString(), website: data.get("website")?.toString(), focus: data.get("focus")?.toString() || "", budget: data.get("budget")?.toString(), timeline: data.get("timeline")?.toString(), description: data.get("description")?.toString() || "" }); setSent(true); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not send your note."); } finally { setSending(false); } }}><div className="form-grid"><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@brand.com" /></label><label>Company / brand<input name="company" placeholder="Brand name" /></label><label>Website<input name="website" placeholder="https://" /></label></div><label>What do you need?<select name="focus" defaultValue=""><option value="" disabled>Select a focus</option><option>New e-commerce store</option><option>Existing store improvement</option><option>AI integration</option><option>3D / AR</option><option>Cart recovery</option><option>Performance / SEO</option><option>Custom web application</option></select></label><div className="form-grid"><label>Budget range<select name="budget" defaultValue=""><option value="" disabled>Choose a range</option><option>Under $5k</option><option>$5k—$10k</option><option>$10k—$20k</option><option>$20k+</option><option>Not sure yet</option></select></label><label>Timeline<select name="timeline" defaultValue=""><option value="" disabled>Choose a timeline</option><option>ASAP</option><option>1—2 months</option><option>3—6 months</option><option>Flexible</option></select></label></div><label>Project description<textarea name="description" required placeholder="What are you trying to make happen?" rows={6} /></label><button className="button button-dark" type="submit" disabled={sending}>{sending ? "Saving demo submission…" : "Send project note"} {!sending && <ArrowUpRight size={16} />}</button></form><div className="prefer-email"><span>Prefer email?</span><a href="mailto:hello@commercestudio.dev">hello@commercestudio.dev <ArrowUpRight size={14} /></a></div></main>;
}
