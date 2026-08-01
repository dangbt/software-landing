"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "../layout";
import { Link } from "@/i18n/routing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceIcons = {
  web: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  mobile: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  cloud: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  consulting: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

const gradients = {
  blue: "from-blue-500 to-cyan-500",
  purple: "from-purple-500 to-pink-500",
  cyan: "from-cyan-500 to-teal-500",
  orange: "from-orange-500 to-amber-500",
};

export function ServicesSection() {
  const t = useTranslations("services");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: serviceIcons.web,
      titleKey: "webDev",
      descKey: "webDevDesc",
      tags: ["React", "Next.js", "Node.js", "TypeScript"],
      gradient: "blue" as const,
    },
    {
      icon: serviceIcons.mobile,
      titleKey: "mobileDev",
      descKey: "mobileDevDesc",
      tags: ["React Native", "iOS", "Android", "Flutter"],
      gradient: "purple" as const,
    },
    {
      icon: serviceIcons.cloud,
      titleKey: "cloudDevOps",
      descKey: "cloudDevOpsDesc",
      tags: ["AWS", "Docker", "CI/CD", "Kubernetes"],
      gradient: "cyan" as const,
    },
    {
      icon: serviceIcons.consulting,
      titleKey: "consulting",
      descKey: "consultingDesc",
      tags: ["Strategy", "MVP", "Prototype", "UX/UI"],
      gradient: "orange" as const,
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card");
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        // Hover effect setup
        cards.forEach((card) => {
          const icon = card.querySelector(".icon-wrapper");
          const arrow = card.querySelector(".card-arrow");

          card.addEventListener("mouseenter", () => {
            gsap.to(icon, { scale: 1.1, duration: 0.3, ease: "power2.out" });
            gsap.to(arrow, { x: 5, opacity: 1, duration: 0.3 });
            gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
            gsap.to(arrow, { x: 0, opacity: 0.5, duration: 0.3 });
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-32 bg-muted relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <Container>
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground text-sm font-medium rounded-full mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            {t("label")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Service cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => {
            const gradient = gradients[service.gradient];
            return (
              <div
                key={service.titleKey}
                className="service-card group bg-card rounded-3xl p-8 md:p-10 border border-border shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className={`icon-wrapper w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center mb-6 shadow-lg`}
                  >
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                      {t(service.titleKey)}
                      <svg
                        className="card-arrow w-5 h-5 opacity-50 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </h3>
                    <p className="text-secondary leading-relaxed mb-6">
                      {t(service.descKey)}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-lg group-hover:bg-accent transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-secondary mb-6 text-lg">{t("bottomNote")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:shadow-lg"
          >
            {t("bottomCta")}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
