import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout";
import { ContactForm } from "@/components/contact";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("contact");

  return (
    <section className="py-16 md:py-24 min-h-screen bg-muted">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {t("badge")}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-secondary max-w-xl mx-auto">
              {t("description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Methods - Left */}
            <div className="lg:col-span-2 space-y-4">
              <a
                href="mailto:hello@techsoft.dev"
                className="block bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">{t("emailLabel")}</p>
                    <p className="font-semibold text-foreground">{t("emailValue")}</p>
                    <p className="text-xs text-secondary mt-0.5">{t("emailNote")}</p>
                  </div>
                </div>
              </a>

              <a
                href="tel:+84123456789"
                className="block bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">{t("phoneLabel")}</p>
                    <p className="font-semibold text-foreground">{t("phoneValue")}</p>
                    <p className="text-xs text-secondary mt-0.5">{t("phoneNote")}</p>
                  </div>
                </div>
              </a>

              <div className="bg-card rounded-xl p-5 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">{t("address")}</p>
                    <p className="font-medium text-foreground">{t("addressValue")}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl p-5 text-white">
                <p className="font-medium mb-3">{t("trustTitle")}</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t("trust1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t("trust2")}
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t("trust3")}
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form - Right */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
