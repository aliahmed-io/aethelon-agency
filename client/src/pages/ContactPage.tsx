import type { ReactNode } from "react";
import ContactForm from "../components/islands/ContactForm";

function SectionLabel({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="section-label">
      <span>{index || ""}</span>
      <span>{children}</span>
      <span className="label-line" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="inner-page contact-page">
      <div className="inner-hero">
        <SectionLabel index="06">Start a project</SectionLabel>
        <h1>
          Have a project<br />
          <em>in mind?</em>
        </h1>
        <p>
          Tell me what you’re building, what isn’t working, or what you’d like to improve. I’ll reply with a clear next
          step.
        </p>
      </div>
      <div className="contact-brief">
        <span>Good fit for</span>
        <strong>
          Brands with a real product, a real constraint, and a desire to make the next release more useful.
        </strong>
        <span>Not a good fit for</span>
        <strong>Projects looking for a cheap reskin with no room for thought.</strong>
      </div>

      <ContactForm />

      <div className="prefer-email">
        <span>Every project note is stored securely and reviewed directly.</span>
      </div>
    </main>
  );
}
