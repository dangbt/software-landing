"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "../layout";
import { SectionHeading } from "../ui/section-heading";
import { useReveal } from "@/hooks/use-reveal";
import { site } from "@/lib/site";

const icons = {
  wordpress: "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 9h16M8 6h.01M11 6h.01",
  landing: "M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm3 4h10M7 12h6m-6 4h4",
  theme: "M12 3l1.9 4.6L19 9l-4 3.6.9 5.4-3.9-2.3L8.1 18l.9-5.4L5 9l5.1-1.4L12 3z",
  hosting: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  domain: "M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18 15 15 0 010-18z",
  maintenance: "M10.3 4.3a4 4 0 015.4 5.4l6 6a2 2 0 01-2.8 2.8l-6-6a4 4 0 01-5.4-5.4l2.6 2.6 2-2-2.6-2.6z",
};

export function ServicesSection() {
  const t = useTranslations("services");
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const services = [
    { key: "wordpress", path: icons.wordpress, primary: true },
    { key: "landing", path: icons.landing, primary: true },
    { key: "theme", path: icons.theme, primary: true },
    { key: "hosting", path: icons.hosting, primary: false },
    { key: "domain", path: icons.domain, primary: false },
    { key: "maintenance", path: icons.maintenance, primary: false },
  ] as const;

  return (
    <section ref={sectionRef} id="services" className="py-20 md:py-28 bg-muted">
      <Container>
        <SectionHeading label={t("label")} title={t("title")} description={t("description")} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service) => (
            <article
              key={service.key}
              className="reveal group relative bg-card rounded-2xl p-7 border border-border hover:border-transparent transition-all duration-300 flex flex-col overflow-hidden before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-logo-from/0 before:to-logo-to/0 hover:before:from-logo-from/50 hover:before:to-logo-to/50 before:transition-all before:duration-300 before:-z-10 before:opacity-0 hover:before:opacity-100 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Gradient border overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-logo-from/0 to-logo-to/0 group-hover:from-logo-from/10 group-hover:to-logo-to/10 transition-all duration-300 -z-10" />

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 relative ${
                  service.primary
                    ? "bg-gradient-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-gradient-to-br from-logo-from/10 to-logo-to/10 text-primary group-hover:from-logo-from/100 group-hover:to-logo-to/100 group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/25"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d={service.path}
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2.5">
                {t(`${service.key}Title`)}
              </h3>
              <p className="text-secondary leading-relaxed mb-6 flex-1">
                {t(`${service.key}Desc`)}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {t.raw(`${service.key}Tags`).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-muted border border-border text-muted-foreground text-xs font-medium rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-14 text-center">
          <p className="text-secondary mb-5 text-lg max-w-2xl mx-auto">{t("bottomNote")}</p>
          <a
            href={site.contact.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-brand px-7 py-3.5 rounded-xl font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.9 9.9 0 01-4.03-.84L3 21l1.4-3.72A7.6 7.6 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {t("bottomCta")}
          </a>
        </div>
      </Container>
    </section>
  );
}
