import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  HeroSection,
  ServicesSection,
  PricingSection,
  WhyUsSection,
  IndustriesSection,
  ProcessSection,
  FaqSection,
  CTASection,
} from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { buildAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: buildAlternates(locale),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale} />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <WhyUsSection />
      <IndustriesSection />
      <ProcessSection />
      <FaqSection />
      <CTASection />
    </>
  );
}
