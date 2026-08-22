"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "../layout";
import { SectionHeading } from "../ui/section-heading";
import { useReveal } from "@/hooks/use-reveal";

export function ProcessSection() {
  const t = useTranslations("process");
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const steps = [1, 2, 3, 4, 5];

  return (
    <section ref={sectionRef} id="process" className="py-20 md:py-28 bg-muted">
      <Container>
        <SectionHeading label={t("label")} title={t("title")} description={t("description")} />

        <ol className="relative max-w-3xl mx-auto">
          {/* Đường nối dọc */}
          <span
            className="absolute left-[1.4375rem] top-4 bottom-8 w-px bg-border hidden sm:block"
            aria-hidden="true"
          />

          {steps.map((n) => (
            <li key={n} className="reveal relative flex gap-5 sm:gap-6 pb-9 last:pb-0">
              <div className="relative z-10 shrink-0 w-11 h-11 rounded-full bg-gradient-primary text-primary-foreground font-bold flex items-center justify-center ring-8 ring-muted">
                {n}
              </div>

              <div className="pt-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{t(`step${n}Title`)}</h3>
                  <span className="text-xs font-medium text-primary bg-primary-soft border border-primary/15 px-2.5 py-1 rounded-full">
                    {t(`step${n}Time`)}
                  </span>
                </div>
                <p className="text-secondary leading-relaxed">{t(`step${n}Desc`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
