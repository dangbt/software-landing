import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout";
import { ContactForm } from "@/components/contact";
import { CheckIcon } from "@/components/ui";
import { site } from "@/lib/site";
import { buildAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    alternates: buildAlternates(locale, "contact"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  const channels = [
    {
      href: site.contact.zalo,
      external: true,
      label: t("phoneLabel"),
      value: site.contact.phoneDisplay,
      note: t("phoneNote"),
      highlight: true,
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.9 9.9 0 01-4.03-.84L3 21l1.4-3.72A7.6 7.6 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    },
    {
      href: `mailto:${site.contact.email}`,
      external: false,
      label: t("emailLabel"),
      value: site.contact.email,
      note: t("emailNote"),
      highlight: false,
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
  ];

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-muted">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-soft text-primary border border-primary/15 text-sm font-medium rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {t("badge")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            {/* Kênh liên hệ */}
            <div className="lg:col-span-2 space-y-4">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`block rounded-xl p-5 border transition-colors group ${
                    channel.highlight
                      ? "bg-gradient-primary border-transparent text-primary-foreground"
                      : "bg-card border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        channel.highlight
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-primary-soft text-primary group-hover:bg-gradient-primary group-hover:text-primary-foreground"
                      }`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.6}
                          d={channel.icon}
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm ${channel.highlight ? "text-primary-foreground/75" : "text-secondary"}`}>
                        {channel.label}
                      </p>
                      <p
                        className={`font-semibold break-all ${
                          channel.highlight ? "text-primary-foreground" : "text-foreground"
                        }`}
                      >
                        {channel.value}
                      </p>
                      <p className={`text-xs mt-0.5 ${channel.highlight ? "text-primary-foreground/70" : "text-secondary"}`}>
                        {channel.note}
                      </p>
                    </div>
                  </div>
                </a>
              ))}

              <div className="bg-card rounded-xl p-5 border border-border space-y-4">
                <div>
                  <p className="text-sm text-secondary mb-1">{t("address")}</p>
                  <p className="text-foreground leading-relaxed">{site.contact.address}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">{t("hoursLabel")}</p>
                  <p className="text-foreground">{site.contact.workingHours}</p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-5 border border-border">
                <h2 className="font-semibold text-foreground mb-3">{t("trustTitle")}</h2>
                <ul className="space-y-2.5">
                  {[t("trust1"), t("trust2"), t("trust3")].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-secondary">
                      <CheckIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
