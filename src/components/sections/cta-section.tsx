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

export function CTASection() {
  const t = useTranslations("cta");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Content animation
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        });
      }

      // Magnetic button effect
      if (buttonRef.current) {
        const button = buttonRef.current;
        
        const handleMouseMove = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(button, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          button.removeEventListener("mousemove", handleMouseMove);
          button.removeEventListener("mouseleave", handleMouseLeave);
        };
      }

      // Orbit animation
      if (orbitRef.current) {
        const orbs = orbitRef.current.querySelectorAll(".orbit-orb");
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            rotation: 360,
            duration: 20 + i * 5,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center",
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-slate-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient mesh */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        
        {/* Orbiting elements */}
        <div ref={orbitRef} className="absolute inset-0">
          <div className="orbit-orb absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full">
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="orbit-orb absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <Container>
        <div ref={contentRef} className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t("badge")}
          </span>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            {t("title")}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              ref={buttonRef}
              href="/contact"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-colors overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("primaryCta")}
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
            <a
              href={`mailto:${t("email")}`}
              className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-colors hover:bg-white/5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t("emailCta")}
            </a>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{t("email")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{t("phone")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t("response")}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
