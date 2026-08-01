"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "../layout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhyUsSection() {
  const t = useTranslations("whyUs");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      titleKey: "qualityTitle",
      descKey: "qualityDesc",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      titleKey: "timeTitle",
      descKey: "timeDesc",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      titleKey: "supportTitle",
      descKey: "supportDesc",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      titleKey: "costTitle",
      descKey: "costDesc",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        });
      }

      // Features stagger animation
      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll(".feature-item");
        gsap.from(items, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
          },
        });

        // Icon pulse on scroll
        items.forEach((item) => {
          const icon = item.querySelector(".feature-icon");
          gsap.to(icon, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              toggleActions: "play reverse play reverse",
            },
          });
        });
      }

      // Testimonial slide in
      if (testimonialRef.current) {
        gsap.from(testimonialRef.current, {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="py-24 md:py-32 bg-muted relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Features */}
          <div>
            <div ref={headerRef} className="mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground text-sm font-medium rounded-full mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {t("label")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
                {t("title")}
              </h2>
              <p className="text-lg text-secondary leading-relaxed">
                {t("description")}
              </p>
            </div>

            <div ref={featuresRef} className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.titleKey}
                  className="feature-item group"
                >
                  <div className="flex gap-4">
                    <div className="feature-icon w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center flex-shrink-0 text-primary shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-secondary text-sm leading-relaxed">
                        {t(feature.descKey)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Testimonial card */}
          <div ref={testimonialRef}>
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border relative">
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="mb-8">
                <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed italic">
                  &ldquo;{t("testimonialText")}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {t("testimonialAuthor")?.charAt(0) || "K"}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t("testimonialAuthor")}</p>
                  <p className="text-secondary text-sm">{t("testimonialRole")}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-secondary">
                  {t("testimonialRating")}
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {[
                { text: "ISO 27001", icon: "🔒" },
                { text: "AWS Partner", icon: "☁️" },
                { text: "24/7 Support", icon: "🛡️" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm"
                >
                  <span>{badge.icon}</span>
                  <span className="text-sm font-medium text-foreground">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
