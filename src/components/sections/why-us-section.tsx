"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "../layout";
import { SectionHeading } from "../ui/section-heading";
import { useReveal } from "@/hooks/use-reveal";

const paths: Record<string, string> = {
  ownership: "M9 12l2 2 4-4m5.6-4A12 12 0 0112 2.9 12 12 0 013.4 6 12 12 0 003 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2-.4-3z",
  noNulled: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  transparent: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.6L19 9.4V19a2 2 0 01-2 2z",
  selfEdit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.4-9.4a2 2 0 112.8 2.8L11.5 15.5 7 17l1.5-4.5 9.1-9.1z",
  speed: "M13 10V3L4 14h7v7l9-11h-7z",
  support: "M18 10c0 3.9-3.6 7-8 7a9 9 0 01-4-.9L3 17l1.3-3.1A6.5 6.5 0 013 10c0-3.9 3.6-7 8-7s7 3.1 7 7z",
  guarantee: "M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8c1.1 0 2.1.4 2.6 1M12 8V7m0 1v8m0 0v1m0-1c-1.1 0-2.1-.4-2.6-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

export function WhyUsSection() {
  const t = useTranslations("whyUs");
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, { stagger: 0.06 });

  const reasons = [
    "ownership",
    "noNulled",
    "transparent",
    "selfEdit",
    "speed",
    "support",
    "guarantee",
  ];

  return (
    <section ref={sectionRef} id="why-us" className="py-20 md:py-28 bg-muted">
      <Container>
        <SectionHeading label={t("label")} title={t("title")} description={t("description")} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((key, i) => (
            <div
              key={key}
              className={`reveal rounded-2xl border border-border p-7 ${
                // Ô đầu tiên nhấn mạnh: đây là điểm đau lớn nhất của khách VN
                i === 0 ? "bg-gradient-primary text-primary-foreground border-transparent sm:col-span-2" : "bg-card"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                  i === 0 ? "bg-primary-foreground/15 text-primary-foreground" : "bg-primary-soft text-primary"
                }`}
              >
                <svg className="w-5.5 h-5.5" width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={paths[key]} />
                </svg>
              </div>
              <h3 className={`text-lg font-bold mb-2 ${i === 0 ? "text-primary-foreground" : "text-foreground"}`}>
                {t(`${key}Title`)}
              </h3>
              <p className={`leading-relaxed ${i === 0 ? "text-primary-foreground/85" : "text-secondary"}`}>
                {t(`${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
