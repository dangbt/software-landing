"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "../layout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const countersAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const children = headerRef.current.children;
        gsap.from(children, {
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

      // Bento grid animation
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".bento-item");
        items.forEach((item, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          gsap.from(item, {
            x: 50 * direction,
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          });
        });

        // Counter animations - fixed approach
        const counters = gridRef.current.querySelectorAll(".counter");
        counters.forEach((counter) => {
          const endValue = parseInt(counter.getAttribute("data-value") || "0");
          const suffix = counter.getAttribute("data-suffix") || "";

          ScrollTrigger.create({
            trigger: counter,
            start: "top 85%",
            once: true,
            onEnter: () => {
              if (countersAnimated.current) return;
              const obj = { value: 0 };
              gsap.to(obj, {
                value: endValue,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  counter.textContent = Math.round(obj.value) + suffix;
                },
              });
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <Container>
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {t("label")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                {t("title")}
              </h2>
            </div>
            <div>
              <p className="text-lg md:text-xl text-secondary leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-4 md:gap-6">
          {/* Large card - Stats */}
          <div className="bento-item md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  {t("experienceTitle")}
                </h3>
                <p className="text-slate-300 text-lg">
                  {t("experienceDesc")}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p
                    className="counter text-4xl md:text-5xl font-bold text-white"
                    data-value="50"
                    data-suffix="+"
                  >
                    50+
                  </p>
                  <p className="text-slate-400 mt-2">{t("statProjects")}</p>
                </div>
                <div>
                  <p
                    className="counter text-4xl md:text-5xl font-bold text-white"
                    data-value="98"
                    data-suffix="%"
                  >
                    98%
                  </p>
                  <p className="text-slate-400 mt-2">{t("statOnTime")}</p>
                </div>
                <div>
                  <p
                    className="counter text-4xl md:text-5xl font-bold text-white"
                    data-value="40"
                    data-suffix="%"
                  >
                    40%
                  </p>
                  <p className="text-slate-400 mt-2">{t("statSavings")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Small card - Approach */}
          <div className="bento-item bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{t("approachTitle")}</h3>
            </div>
            <p className="text-white/80">{t("approachDesc")}</p>
          </div>

          {/* Tech stack card */}
          <div className="bento-item bg-muted rounded-3xl p-8 flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="w-12 h-12 bg-card rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{t("techTitle")}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "AWS", "TypeScript"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-card text-foreground text-sm font-medium rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team card */}
          <div className="bento-item bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{t("teamTitle")}</h3>
            </div>
            <p className="text-white/80">{t("teamDesc")}</p>
          </div>

          {/* Process card - Wide */}
          <div className="bento-item md:col-span-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 text-white flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{t("processTitle")}</h3>
            </div>
            <p className="text-white/90">{t("processDesc")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
