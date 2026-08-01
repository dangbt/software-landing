"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/layout";
import { FadeIn } from "@/components/animations";
import { PageDecoration } from "@/components/svg-3d";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <section className="py-20 min-h-screen relative overflow-hidden">
      {/* Many floating icons across entire page */}
      <PageDecoration count={12} opacity={0.05} />

      <Container className="relative z-10">
        <FadeIn>
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{t("title")}</h1>

            <p className="text-secondary leading-relaxed mb-6">{t("lastUpdated")}: {new Date().toLocaleDateString()}</p>
            <p className="text-secondary leading-relaxed mb-8">{t("intro")}</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
                <ul className="list-disc list-inside text-secondary space-y-2">
                  <li>Contact information: name, email, phone number, address</li>
                  <li>Company/organization information (if applicable)</li>
                  <li>Message content and project requests</li>
                  <li>Technical data: IP address, browser type, device used</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Information</h2>
                <ul className="list-disc list-inside text-secondary space-y-2">
                  <li>Contact and consult about services</li>
                  <li>Provide quotes and solutions for projects</li>
                  <li>Provide technical support</li>
                  <li>Improve website and services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Information Security</h2>
                <p className="text-secondary leading-relaxed">We implement appropriate security measures to protect your personal information from unauthorized access, modification, disclosure, or destruction.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Your Rights</h2>
                <ul className="list-disc list-inside text-secondary space-y-2">
                  <li>Request access to your personal information</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of personal information</li>
                  <li>Opt out of marketing emails</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Contact</h2>
                <p className="text-secondary">Email: <a href="mailto:hello@techsoft.dev" className="text-primary hover:underline">hello@techsoft.dev</a></p>
                <p className="text-secondary">Phone: <a href="tel:+84123456789" className="text-primary hover:underline">+84 123 456 789</a></p>
              </section>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
