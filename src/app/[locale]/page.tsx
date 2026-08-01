import { setRequestLocale } from "next-intl/server";
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  WhyUsSection,
  CTASection,
} from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <CTASection />
    </>
  );
}
