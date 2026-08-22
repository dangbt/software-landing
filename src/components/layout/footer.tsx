"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Logo } from "../ui/logo";
import { site } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: `/${locale}/#services`, label: t("services") },
    { href: `/${locale}/#pricing`, label: t("pricing") },
    { href: `/${locale}/#process`, label: t("process") },
    { href: `/${locale}/#faq`, label: t("faq") },
  ];

  const serviceLinks = [
    tServices("wordpressTitle"),
    tServices("landingTitle"),
    tServices("themeTitle"),
    tServices("hostingTitle"),
    tServices("domainTitle"),
    tServices("maintenanceTitle"),
  ];

  return (
    <footer className="bg-surface-invert text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Doanh nghiệp */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center mb-4">
              {/* Footer luôn nền tối kể cả ở chế độ sáng nên dùng bản logo chữ trắng cố định */}
              <Logo size="md" onDark />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-md">
              {t("description")}
            </p>

            {/* Thông tin pháp nhân — yếu tố tin cậy quan trọng nhất với khách Việt Nam */}
            <div className="text-sm text-slate-400 space-y-1 mb-5">
              <p className="text-slate-300 font-medium">{site.legalName}</p>
              <p>
                {t("businessLicense")}: {site.taxId}
              </p>
              <p>
                {t("established")}: {site.established}
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href={site.contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Zalo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.9 9.9 0 01-4.03-.84L3 21l1.4-3.72A7.6 7.6 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </a>
              {site.contact.facebook && (
                <a
                  href={site.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Dịch vụ */}
          <div>
            <h3 className="font-semibold mb-4">{t("servicesTitle")}</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a href={`/${locale}/#services`} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="font-semibold mb-4">{t("contact")}</h3>
            <ul className="space-y-2.5 text-sm text-slate-400 mb-6">
              <li>
                <a
                  href={`tel:${site.contact.phoneTel}`}
                  className="hover:text-white transition-colors font-medium text-slate-300"
                >
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>{site.contact.address}</li>
              <li>{site.contact.workingHours}</li>
            </ul>

            <h3 className="font-semibold mb-3">{t("quickLinks")}</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {currentYear} {site.name}. {t("copyright")}
          </p>
          <Link href="/privacy" className="text-slate-500 text-sm hover:text-white transition-colors">
            {t("privacyPolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
