"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Container } from "./container";
import { Logo } from "../ui/logo";
import { ThemeToggle } from "../theme";
import { site } from "@/lib/site";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Khoá cuộn nền khi menu điện thoại đang mở
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleLocale = () => {
    router.replace(pathname, { locale: locale === "vi" ? "en" : "vi" });
  };

  const navLinks: { href: string; label: string; isPage?: boolean }[] = [
    { href: "#services", label: t("services") },
    { href: "#pricing", label: t("pricing") },
    { href: "#process", label: t("process") },
    { href: "#faq", label: t("faq") },
    { href: "/showcase", label: t("showcase"), isPage: true },
  ];

  /** Anchor chỉ hoạt động ở trang chủ; ở trang khác thì quay về trang chủ trước. */
  const isHome = pathname === "/";

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setIsMenuOpen(false);
    if (!isHome) return;
    const target = document.querySelector(hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", hash);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-xl shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 relative z-10">
            <Logo size="md" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3.5 py-2 text-foreground/70 hover:text-foreground font-medium transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={isHome ? link.href : `/${locale}/${link.href}`}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="relative px-3.5 py-2 text-foreground/70 hover:text-foreground font-medium transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-1.5">
            <ThemeToggle />

            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
              title={locale === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span className="uppercase">{locale === "vi" ? "EN" : "VI"}</span>
            </button>

            {/* Số điện thoại hiển thị ngay trên header — khách dịch vụ hay gọi thẳng */}
            <a
              href={`tel:${site.contact.phoneTel}`}
              className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-foreground hover:bg-accent transition-colors"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {site.contact.phoneDisplay}
            </a>

            <Link
              href="/contact"
              className="ml-1 inline-flex items-center gap-2 btn-brand px-5 py-2.5 rounded-lg font-semibold text-sm"
            >
              {t("cta")}
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-10 p-2 -mr-2"
              aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 bg-foreground transition-transform duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-foreground transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-foreground transition-transform duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Menu điện thoại */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4 pointer-events-none"
          }`}
        >
          <nav className="p-4 space-y-1">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={isHome ? link.href : `/${locale}/${link.href}`}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent font-medium transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
            <hr className="my-3 border-border" />
            <button
              onClick={() => {
                toggleLocale();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-accent font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span>{locale === "vi" ? "English" : "Tiếng Việt"}</span>
            </button>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center btn-brand px-4 py-3 rounded-lg font-semibold mt-2"
            >
              {t("cta")}
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
