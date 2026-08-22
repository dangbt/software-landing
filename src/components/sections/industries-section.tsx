"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "../layout";
import { SectionHeading } from "../ui/section-heading";
import { useReveal } from "@/hooks/use-reveal";
import { site } from "@/lib/site";

/** Icon theo thứ tự của mảng `industries.items` trong file ngôn ngữ. */
const industryIcons = [
  "M4 8h16l-1.2 11a2 2 0 01-2 1.8H7.2a2 2 0 01-2-1.8L4 8zm4 0V6a4 4 0 118 0v2",
  "M12 3c2.5 3 4 5.2 4 7.5a4 4 0 11-8 0C8 8.2 9.5 6 12 3zM5 20h14",
  "M12 4v16m8-8H4M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z",
  "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9z",
  "M3 21h18M6 21V8l6-4 6 4v13M10 21v-5h4v5",
  "M12 4L2 9l10 5 10-5-10-5zM4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5",
  "M6 3h12l2 5-3 1v12H7V9L4 8l2-5zm3 0a3 3 0 006 0",
  "M3 20h18M5 20V9l5-3v14M14 20V4l5 3v13M8 12h.01M8 16h.01M17 12h.01M17 16h.01",
];

export function IndustriesSection() {
  const t = useTranslations("industries");
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, { stagger: 0.05 });

  const items = t.raw("items") as string[];

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <Container>
        <SectionHeading label={t("label")} title={t("title")} description={t("description")} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={item}
              className="reveal group flex flex-col items-center text-center gap-3 rounded-2xl border border-border bg-card p-6 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d={industryIcons[i % industryIcons.length]}
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground leading-snug">{item}</span>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 text-center">
          <a
            href={site.contact.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4"
          >
            {t("cta")}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
