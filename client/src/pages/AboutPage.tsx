import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

function SectionLabel({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="section-label">
      <span>{index || ""}</span>
      <span>{children}</span>
      <span className="label-line" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="inner-page about-page">
      <div className="inner-hero">
        <SectionLabel index="01">About the practice</SectionLabel>
        <h1>
          Direct collaboration.<br />
          <em>Senior execution.</em>
        </h1>
        <p>
          I am a freelance full-stack developer specializing in custom ecommerce storefronts, web applications, and interactive digital experiences.
        </p>
      </div>

      <div className="about-story">
        <div>
          <span className="story-year">01 / The premise</span>
          <h2>
            Good commerce<br />
            makes complexity<br />
            <em>feel effortless.</em>
          </h2>
        </div>
        <div>
          <p>
            I work across design, frontend engineering, and backend infrastructure because the friction in most web builds happens at the seams between separate teams.
          </p>
          <p>
            When you hire an agency, you often pay for multiple account managers, project coordinators, and junior developers learning on your timeline.
          </p>
          <p>
            Working directly with a senior full-stack developer gives you a single point of accountability, faster feedback loops, and a cohesive system built with care.
          </p>
        </div>
      </div>

      <div className="studio-rhythm">
        <SectionLabel index="02">How projects run</SectionLabel>
        {[
          [
            "01",
            "Discovery & Scope",
            "We clarify the exact problem, outline system requirements, and define clear fixed deliverables.",
          ],
          [
            "02",
            "Design & Build",
            "I design the responsive interface and build the full-stack architecture with production-grade TypeScript.",
          ],
          [
            "03",
            "Launch & Handoff",
            "Thorough testing, performance optimization, deployment, and clean administrative handoff.",
          ],
        ].map(([n, t, d]) => (
          <div key={n}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>

      <div className="principles">
        <SectionLabel index="03">Core standards</SectionLabel>
        {[
          "Direct communication with the engineer",
          "Clean TypeScript & App Router architecture",
          "High-performance assets & fast load times",
          "Tactile, considered user interactions",
          "Honest project scope and transparent pricing",
        ].map((x, i) => (
          <div key={x}>
            <span>0{i + 1}</span>
            <strong>{x}</strong>
            <ArrowUpRight size={17} aria-hidden="true" />
          </div>
        ))}
      </div>
    </main>
  );
}
