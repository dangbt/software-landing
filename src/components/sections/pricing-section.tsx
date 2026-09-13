"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "../layout";
import { SectionHeading } from "../ui/section-heading";
import { CheckIcon } from "../ui/check-icon";
import { Link } from "@/i18n/routing";
import { useReveal } from "@/hooks/use-reveal";
import { pricingPlans, formatVND } from "@/lib/site";

export function PricingSection() {
  const t = useTranslations("pricing");
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} id="pricing" className="py-20 md:py-28">
      <Container>
        <SectionHeading label={t("label")} title={t("title")} description={t("description")} />

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {pricingPlans.map((plan) => {
            const features = t.raw(`${plan.id}.features`) as string[];

            return (
              <div
                key={plan.id}
                className={`reveal relative flex flex-col h-full ${
                  plan.featured
                    ? "card-gradient-border card-gradient-border-hover shadow-xl shadow-primary/10 lg:-mt-4"
                    : "rounded-2xl border border-border bg-card card-hover-subtle"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-gradient text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap z-10">
                    {t("popular")}
                  </span>
                )}

                <div className="p-7 pb-6 border-b border-border">
                  <h3 className="text-xl font-bold text-foreground">{t(`${plan.id}.name`)}</h3>
                  <p className="text-sm text-secondary mt-1.5 min-h-[2.5rem]">
                    {t(`${plan.id}.for`)}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold text-foreground tracking-tight">
                      {formatVND(plan.price)}
                    </span>
                  </div>
                  <p className="text-sm text-secondary mt-1">{t("perProject")}</p>

                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted border border-border rounded-lg px-3 py-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {t(`${plan.id}.delivery`)}
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <ul className="space-y-3 mb-7 flex-1">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-[0.95rem] text-foreground leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <div className="flex items-baseline justify-between text-sm border-t border-border pt-4 mb-5">
                      <span className="text-secondary">{t("renewalLabel")}</span>
                      <span className="font-semibold text-foreground">
                        {formatVND(plan.renewal)}
                        {t("renewalSuffix")}
                      </span>
                    </div>

                    <Link
                      href="/contact"
                      className={`block w-full text-center px-6 py-3.5 rounded-xl font-semibold transition-colors ${
                        plan.featured
                          ? "btn-brand"
                          : "border-2 border-border hover:border-primary/40 hover:bg-accent text-foreground"
                      }`}
                    >
                      {t("cta")}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ghi chú phí duy trì — điểm khách hàng lo nhất khi mua trọn gói */}
        <p className="reveal mt-8 text-center text-sm text-secondary max-w-3xl mx-auto leading-relaxed">
          {t("renewalNote")}
        </p>

        {/* Gói riêng */}
        <div className="reveal mt-12 rounded-2xl border border-border bg-muted p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-foreground mb-2">{t("customTitle")}</h3>
            <p className="text-secondary leading-relaxed">{t("customDesc")}</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-foreground text-background hover:opacity-90 px-6 py-3.5 rounded-xl font-semibold transition-opacity"
          >
            {t("customCta")}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
