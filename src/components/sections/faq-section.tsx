"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "../layout";
import { SectionHeading } from "../ui/section-heading";
import { useReveal } from "@/hooks/use-reveal";

const QUESTION_COUNT = 8;

export function FaqSection() {
  const t = useTranslations("faq");
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, { stagger: 0.05 });

  return (
    <section ref={sectionRef} id="faq" className="py-20 md:py-28">
      <Container>
        <SectionHeading label={t("label")} title={t("title")} description={t("description")} />

        <div className="max-w-3xl mx-auto space-y-3">
          {Array.from({ length: QUESTION_COUNT }, (_, i) => i + 1).map((n) => (
            // <details> hoạt động không cần JavaScript và Google đọc được nội dung
            <details
              key={n}
              className="reveal group rounded-xl border border-border bg-card overflow-hidden [&[open]]:border-primary/35"
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none px-6 py-5 font-semibold text-foreground hover:bg-accent/50 transition-colors">
                <span>{t(`q${n}`)}</span>
                <svg
                  className="w-5 h-5 shrink-0 mt-0.5 text-primary transition-transform duration-200 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="px-6 pb-5 -mt-1 text-secondary leading-relaxed">{t(`a${n}`)}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
