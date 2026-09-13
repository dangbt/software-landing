"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "../layout";
import { Link } from "@/i18n/routing";
import { CheckIcon } from "../ui/check-icon";
import { site, pricingPlans, formatVND } from "@/lib/site";
import { useReveal } from "@/hooks/use-reveal";

export function HeroSection() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const sectionRef = useRef<HTMLElement>(null);

  const startingPrice = Math.min(...pricingPlans.map((p) => p.price));

  // Hero nằm ngay đầu trang nên chạy luôn, không chờ cuộn tới.
  useReveal(sectionRef, { immediate: true, stagger: 0.07 });

  const points = [t("point1"), t("point2"), t("point3"), t("point4")];

  const facts = [
    { label: t("deliveryTime"), value: t("deliveryValue") },
    { label: t("ownership"), value: t("ownershipValue") },
    { label: t("warranty"), value: t("warrantyValue") },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Nền với gradient blobs decorative */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/70 via-background to-background" />
        
        {/* Blob chính - góc trên trái - animation float */}
        <div 
          className="absolute -top-24 -left-32 w-[28rem] h-[28rem] rounded-full blur-3xl animate-blob-float"
          style={{ 
            background: 'linear-gradient(135deg, var(--logo-from) 0%, var(--logo-to) 100%)',
            opacity: 0.12
          }} 
        />
        
        {/* Blob phụ - góc phải - animation float delay */}
        <div 
          className="absolute top-40 -right-32 w-[26rem] h-[26rem] rounded-full blur-3xl animate-blob-float-reverse"
          style={{ 
            background: 'linear-gradient(135deg, var(--logo-to) 0%, var(--logo-from) 100%)',
            opacity: 0.1
          }} 
        />
        
        {/* Blob nhỏ - giữa trái - animation pulse */}
        <div 
          className="absolute top-1/2 -left-16 w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem] rounded-full blur-3xl animate-blob-pulse"
          style={{ 
            background: 'radial-gradient(circle, var(--logo-from) 0%, transparent 70%)',
            opacity: 0.08
          }} 
        />
        
        {/* Blob nhỏ - góc dưới phải - animation float */}
        <div 
          className="absolute bottom-20 right-1/4 w-[14rem] h-[14rem] md:w-[18rem] md:h-[18rem] rounded-full blur-3xl animate-blob-float"
          style={{ 
            background: 'radial-gradient(circle, var(--logo-to) 0%, transparent 70%)',
            opacity: 0.08,
            animationDelay: '2s'
          }} 
        />
        
        {/* Orb accent - trên cùng giữa - animation pulse subtle */}
        <div 
          className="absolute -top-10 left-1/3 w-[12rem] h-[12rem] md:w-[16rem] md:h-[16rem] rounded-full blur-2xl animate-blob-pulse"
          style={{ 
            background: 'linear-gradient(180deg, var(--logo-from) 0%, var(--logo-to) 100%)',
            opacity: 0.06,
            animationDelay: '1s'
          }} 
        />
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Cột nội dung */}
          <div>
            <span className="reveal inline-flex items-center gap-2 px-3.5 py-1.5 bg-card border border-border rounded-full shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-foreground">{t("badge")}</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.08] tracking-tight mb-6">
              <span className="reveal block">{t("title1")}</span>
              <span className="reveal block text-gradient-primary">{t("title2")}</span>
            </h1>

            <p className="reveal text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-xl">
              {t("description")}
            </p>

            <ul className="reveal grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-9">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-foreground">
                  <CheckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-[0.975rem] leading-snug">{point}</span>
                </li>
              ))}
            </ul>

            <div className="reveal flex flex-col sm:flex-row gap-3 mb-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 btn-brand px-7 py-4 rounded-xl font-semibold text-lg"
              >
                {t("cta")}
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center border-2 border-border hover:border-primary/40 hover:bg-accent text-foreground px-7 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                {t("exploreServices")}
              </a>
            </div>

            <p className="reveal text-sm text-secondary">{t("ctaNote")}</p>
          </div>

          {/* Cột hình minh hoạ: xem trước một website, không phải code */}
          <div className="reveal relative">
            <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-slate-900/10 overflow-hidden">
              {/* Thanh trình duyệt */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="flex items-center justify-center gap-1.5 bg-background border border-border rounded-md px-3 py-1 text-xs text-secondary font-mono">
                    <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {site.url.replace("https://", "")}
                  </div>
                </div>
              </div>

              {/* Khung website giả lập */}
              <div className="p-5 space-y-4 bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-primary" />
                    <div className="h-2.5 w-16 rounded bg-foreground/15" />
                  </div>
                  <div className="hidden sm:flex gap-3">
                    {[10, 8, 12, 9].map((w, i) => (
                      <div key={i} className="h-2 rounded bg-foreground/10" style={{ width: `${w * 4}px` }} />
                    ))}
                  </div>
                  <div className="h-6 w-16 rounded-md bg-gradient-primary opacity-90" />
                </div>

                <div className="rounded-xl bg-gradient-to-br from-primary-soft to-muted p-5 space-y-2.5">
                  <div className="h-3 w-3/4 rounded bg-foreground/25" />
                  <div className="h-3 w-1/2 rounded bg-foreground/20" />
                  <div className="h-2 w-full rounded bg-foreground/10 mt-3" />
                  <div className="h-2 w-5/6 rounded bg-foreground/10" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-7 w-24 rounded-lg bg-gradient-primary" />
                    <div className="h-7 w-20 rounded-lg border border-border" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-lg border border-border p-3 space-y-2">
                      <div className="w-6 h-6 rounded-md bg-primary/25" />
                      <div className="h-2 w-full rounded bg-foreground/15" />
                      <div className="h-2 w-2/3 rounded bg-foreground/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thẻ giá nổi */}
            <div className="absolute -bottom-5 -left-3 md:-left-6 bg-card border border-border rounded-xl shadow-xl px-5 py-3.5">
              <p className="text-xs text-secondary mb-0.5">{t("priceFrom")}</p>
              <p className="text-2xl font-bold text-foreground leading-none">
                {formatVND(startingPrice)}
              </p>
              <p className="text-xs text-secondary mt-1">{t("priceUnit")}</p>
            </div>

            <div className="absolute -top-4 -right-2 md:-right-5 bg-accent-brand text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
              {tCommon("getStarted")}
            </div>
          </div>
        </div>

        {/* Dải thông tin tin cậy */}
        <div className="reveal mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border border-border rounded-2xl bg-card overflow-hidden">
          {facts.map((fact) => (
            <div key={fact.label} className="px-6 py-6 text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">{fact.value}</p>
              <p className="text-sm text-secondary mt-1.5">{fact.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
