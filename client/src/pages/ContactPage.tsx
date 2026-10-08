import type { ReactNode } from "react";
import { Mail, Clock, ShieldCheck, MessageSquare } from "lucide-react";
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

const onboardingSteps = [
  {
    step: "01",
    title: "20-Min Friendly Chat or Email",
    detail:
      "No pressure—tell me about your store and whether you want to keep your Shopify/WooCommerce backend (headless) or launch a 100% custom website.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Fixed Proposal in 24 Hours",
    detail:
      "You get an exact feature breakdown, transparent $2,000–$4,000 fixed package price, and a day-by-day 10-day roadmap within 24 hours.",
    icon: Clock,
  },
  {
    step: "03",
    title: "$400 Deposit to Start",
    detail:
      "Start with just 20%. You only pay each next step after you see and approve the work on a live link. Zero risk.",
    icon: ShieldCheck,
  },
];

export default function ContactPage() {
  return (
    <main className="inner-page contact-page">
      <div className="inner-hero">
        <SectionLabel index="06">Start Your Store</SectionLabel>
        <h1>
          Ready to launch<br />
          <em>in 10 days?</em>
        </h1>
        <p>
          Send a quick note below or email me directly. I’ll reply within 24 hours with a live demo walkthrough and a clear $2,000–$4,000 fixed proposal for your store.
        </p>
      </div>

      {/* WELCOMING 3-STEP ONBOARDING BOX */}
      <div className="contact-welcoming-steps">
        {onboardingSteps.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.step} className="contact-step-card">
              <div className="contact-step-top">
                <span className="contact-step-num">{s.step}</span>
                <Icon size={16} className="contact-step-icon" aria-hidden="true" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.detail}</p>
            </div>
          );
        })}
      </div>

      {/* DIRECT EMAIL CALLOUT BAR */}
      <div className="contact-direct-email-bar">
        <div className="direct-email-left">
          <Mail size={18} className="direct-email-icon" aria-hidden="true" />
          <div>
            <span className="direct-email-label">Prefer direct email or want to book a 20-min Zoom?</span>
            <a href="mailto:ali@aethelonlabs.com" className="direct-email-link">
              ali@aethelonlabs.com
            </a>
          </div>
        </div>
        <span className="direct-email-badge">Replies within 24 hours</span>
      </div>

      <ContactForm />

      <div className="prefer-email">
        <span>
          Direct collaboration with the engineer · $400 deposit to start · Email{" "}
          <a href="mailto:ali@aethelonlabs.com" className="underline font-semibold">
            ali@aethelonlabs.com
          </a>{" "}
          anytime.
        </span>
      </div>
    </main>
  );
}
