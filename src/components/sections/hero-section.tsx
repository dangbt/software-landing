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

export function HeroSection() {
  const t = useTranslations("hero");

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(
        [badgeRef.current, title1Ref.current, title2Ref.current, descRef.current, ctaRef.current],
        {
          opacity: 0,
          y: 40,
        }
      );
      gsap.set(codeBlockRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
      });

      // Timeline for sequential animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(title1Ref.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .to(title2Ref.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(
          codeBlockRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.3"
        );

      // Stats counter animation
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll(".stat-number");
        statNumbers.forEach((stat, i) => {
          const endValue = parseInt(stat.getAttribute("data-value") || "0");
          const suffix = stat.getAttribute("data-suffix") || "";
          const obj = { value: 0 };

          gsap.to(obj, {
            value: endValue,
            duration: 2,
            delay: 1.2 + i * 0.1,
            ease: "power2.out",
            onUpdate: () => {
              stat.textContent = Math.round(obj.value) + suffix;
            },
          });
        });
      }

      // Floating grid animation
      if (gridRef.current) {
        const lines = gridRef.current.querySelectorAll(".grid-line");
        gsap.set(lines, { scaleX: 0, transformOrigin: "left" });
        gsap.to(lines, {
          scaleX: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        });
      }

      // Parallax effect on scroll
      gsap.to(codeBlockRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden"
    >
      {/* Background grid */}
      <div ref={gridRef} className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted via-background to-muted" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="grid-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            style={{ top: `${12 + i * 12}%` }}
          />
        ))}
        {/* Gradient orbs */}
        <div className="absolute top-20 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            {/* Badge */}
            <div ref={badgeRef} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-primary">
                  {t("badge")}
                </span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
              <span ref={title1Ref} className="block">
                {t("title1")}
              </span>
              <span
                ref={title2Ref}
                className="block bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent"
              >
                {t("title2")}
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {t("description")}
            </p>

            {/* CTA */}
            <div ref={ctaRef}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <Link
                  href="/contact"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("cta")}
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
                  </span>
                </Link>
                <Link
                  href="#services"
                  className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-border hover:border-primary/50 text-foreground px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:bg-accent"
                >
                  {t("exploreServices")}
                </Link>
              </div>
              <p className="text-sm text-secondary">{t("ctaNote")}</p>
            </div>
          </div>

          {/* Code block */}
          <div ref={codeBlockRef} className="relative max-w-3xl mx-auto">
            <div className="bg-slate-900 rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden border border-slate-800">
              {/* Window controls */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-700/50 rounded-lg px-4 py-1.5 text-xs text-slate-400 max-w-xs mx-auto text-center font-mono">
                    techsoft.dev/demo
                  </div>
                </div>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <div className="flex gap-4">
                  <div className="text-slate-600 select-none text-right w-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <div key={n} className="leading-6">
                        {n}
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="leading-6">
                      <span className="text-pink-400">import</span>{" "}
                      <span className="text-slate-300">{"{ TechSoft }"}</span>{" "}
                      <span className="text-pink-400">from</span>{" "}
                      <span className="text-emerald-400">
                        &apos;@techsoft/core&apos;
                      </span>
                    </div>
                    <div className="leading-6 text-slate-500">
                      {"// Xây dựng sản phẩm số của bạn"}
                    </div>
                    <div className="leading-6">
                      <span className="text-pink-400">const</span>{" "}
                      <span className="text-blue-400">project</span>{" "}
                      <span className="text-slate-400">=</span>{" "}
                      <span className="text-yellow-400">TechSoft</span>
                      <span className="text-slate-300">.create({"{"})</span>
                    </div>
                    <div className="leading-6 pl-4">
                      <span className="text-blue-300">name</span>
                      <span className="text-slate-400">:</span>{" "}
                      <span className="text-emerald-400">
                        &apos;Dự án của bạn&apos;
                      </span>
                      <span className="text-slate-400">,</span>
                    </div>
                    <div className="leading-6 pl-4">
                      <span className="text-blue-300">tech</span>
                      <span className="text-slate-400">:</span>{" "}
                      <span className="text-slate-300">[</span>
                      <span className="text-emerald-400">&apos;React&apos;</span>
                      <span className="text-slate-400">,</span>{" "}
                      <span className="text-emerald-400">
                        &apos;Node.js&apos;
                      </span>
                      <span className="text-slate-400">,</span>{" "}
                      <span className="text-emerald-400">&apos;AWS&apos;</span>
                      <span className="text-slate-300">]</span>
                      <span className="text-slate-400">,</span>
                    </div>
                    <div className="leading-6 pl-4">
                      <span className="text-blue-300">quality</span>
                      <span className="text-slate-400">:</span>{" "}
                      <span className="text-orange-400">100</span>
                      <span className="text-slate-400">,</span>{" "}
                      <span className="text-slate-500">
                        {"// 💯 Cam kết chất lượng"}
                      </span>
                    </div>
                    <div className="leading-6">
                      <span className="text-slate-300">{"})"}</span>
                    </div>
                    <div className="leading-6">
                      <span className="text-blue-400">project</span>
                      <span className="text-slate-300">.</span>
                      <span className="text-yellow-400">deploy</span>
                      <span className="text-slate-300">()</span>{" "}
                      <span className="text-slate-500">{"// 🚀 Ship it!"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-green-500/30 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Production Ready
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center p-4 md:p-6 rounded-2xl bg-card/50 backdrop-blur border border-border">
              <p
                className="stat-number text-3xl md:text-5xl font-bold text-foreground"
                data-value="50"
                data-suffix="+"
              >
                50+
              </p>
              <p className="text-sm md:text-base text-secondary mt-2">
                {t("projectsCompleted")}
              </p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-2xl bg-card/50 backdrop-blur border border-border">
              <p
                className="stat-number text-3xl md:text-5xl font-bold text-foreground"
                data-value="30"
                data-suffix="+"
              >
                30+
              </p>
              <p className="text-sm md:text-base text-secondary mt-2">
                {t("trustedClients")}
              </p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-2xl bg-card/50 backdrop-blur border border-border">
              <p
                className="stat-number text-3xl md:text-5xl font-bold text-foreground"
                data-value="5"
                data-suffix="+"
              >
                5+
              </p>
              <p className="text-sm md:text-base text-secondary mt-2">
                {t("yearsExperience")}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
