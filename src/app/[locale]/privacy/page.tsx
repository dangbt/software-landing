import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout";
import { site } from "@/lib/site";
import { buildAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    alternates: buildAlternates(locale, "privacy"),
    // Trang pháp lý không cần lên tìm kiếm nhưng vẫn cho bot đi theo liên kết
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacy");

  const sections = [
    { key: "s1", type: "list" },
    { key: "s2", type: "list" },
    { key: "s3", type: "text" },
    { key: "s4", type: "text" },
    { key: "s5", type: "text" },
    { key: "s6", type: "list" },
  ] as const;

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-muted">
      <Container>
        <article className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-7 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            {t("title")}
          </h1>

          <p className="text-sm text-secondary mb-6">
            {t("lastUpdated")}:{" "}
            <time dateTime="2026-08-22">
              {new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date("2026-08-22"))}
            </time>
          </p>

          <p className="text-secondary leading-relaxed mb-10">{t("intro")}</p>

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.key}>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {t(`${section.key}Title`)}
                </h2>
                {section.type === "list" ? (
                  <ul className="list-disc pl-5 text-secondary space-y-2 leading-relaxed">
                    {(t.raw(`${section.key}Items`) as string[]).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-secondary leading-relaxed">{t(`${section.key}Text`)}</p>
                )}
              </section>
            ))}

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">{t("s7Title")}</h2>
              <p className="text-secondary leading-relaxed mb-2">{t("s7Text")}</p>
              <ul className="text-secondary space-y-1">
                <li>
                  Email:{" "}
                  <a href={`mailto:${site.contact.email}`} className="text-primary hover:underline">
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  {locale === "vi" ? "Điện thoại" : "Phone"}:{" "}
                  <a href={`tel:${site.contact.phoneTel}`} className="text-primary hover:underline">
                    {site.contact.phoneDisplay}
                  </a>
                </li>
                <li>{site.legalName}</li>
                <li>{site.contact.address}</li>
              </ul>
            </section>
          </div>
        </article>
      </Container>
    </section>
  );
}
