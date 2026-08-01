"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Container } from "./container";
import { Logo } from "../ui/logo";
import { ThemeToggle } from "../theme";
import gsap from "gsap";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animation
    if (navRef.current) {
      gsap.from(navRef.current.children, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }

    // Scroll detection
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === "vi" ? "en" : "vi";
    router.replace(pathname, { locale: newLocale });
  };

  // Handle anchor link clicks
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "/#services", label: t("services"), isAnchor: true },
    { href: "/#about", label: t("about"), isAnchor: true },
    { href: "/#why-us", label: t("whyUs"), isAnchor: true },
    { href: "/contact", label: t("contact"), isAnchor: false },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative z-10">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="relative px-4 py-2 text-foreground/70 hover:text-foreground font-medium transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-foreground/70 hover:text-foreground font-medium transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              )
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
              title={locale === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="uppercase">{locale === "vi" ? "EN" : "VI"}</span>
            </button>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all hover:shadow-lg"
            >
              {t("cta")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-10 p-2 -mr-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 bg-foreground transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-foreground transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-foreground transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="block px-4 py-3 rounded-xl text-foreground hover:bg-accent font-medium transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-foreground hover:bg-accent font-medium transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            <hr className="my-3 border-border" />
            <button
              onClick={() => {
                toggleLocale();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-accent font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>{locale === "vi" ? "English" : "Tiếng Việt"}</span>
            </button>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-primary text-white px-4 py-3 rounded-xl font-medium mt-2"
            >
              {t("cta")}
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
