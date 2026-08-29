"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div className="faq-item" key={item.question}>
          <button
            type="button"
            onClick={() => setOpen(open === index ? null : index)}
            aria-expanded={open === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span>{item.question}</span>
            <ChevronDown className={open === index ? "rotate" : ""} aria-hidden="true" />
          </button>
          {open === index && (
            <p id={`faq-answer-${index}`} className="faq-answer">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
