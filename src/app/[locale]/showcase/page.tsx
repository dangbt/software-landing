import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout";
import { Reveal } from "@/components/ui";
import { ProjectGrid } from "@/components/showcase";
import { projects } from "@/data/projects";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/routing";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("showcaseTitle"),
    description: t("showcaseDescription"),
    alternates: buildAlternates(locale, "/showcase"),
  };
}

export default async function ShowcasePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("showcase");

  return (
    <Reveal>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="reveal inline-block px-4 py-1.5 bg-primary-soft text-primary text-sm font-semibold rounded-full mb-6">
              {t("label")}
            </span>
            <h1 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("title")}
            </h1>
            <p className="reveal text-lg md:text-xl text-secondary max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-20">
        <Container>
          <ProjectGrid projects={projects} />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="reveal max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-secondary text-lg mb-8 max-w-xl mx-auto">
              {t("ctaDescription")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 btn-brand px-7 py-3.5 rounded-xl font-semibold"
              >
                {t("ctaButton")}
                <svg
                  className="w-5 h-5"
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
              </Link>
              <a
                href={site.contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 border-border hover:border-primary/35 hover:bg-accent transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.9 9.9 0 01-4.03-.84L3 21l1.4-3.72A7.6 7.6 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Chat Zalo
              </a>
            </div>
          </div>
        </Container>
      </section>
    </Reveal>
  );
}
