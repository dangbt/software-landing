import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header, Footer } from "@/components/layout";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "TechSoft - Phát triển phần mềm chuyên nghiệp",
  description:
    "TechSoft cung cấp dịch vụ phát triển phần mềm, website, ứng dụng di động, cloud và DevOps. Đội ngũ chuyên nghiệp, chi phí hợp lý, chất lượng đảm bảo.",
  keywords: [
    "phát triển phần mềm",
    "thiết kế website",
    "ứng dụng di động",
    "chuyển đổi số",
    "outsourcing việt nam",
  ],
  authors: [{ name: "TechSoft" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "TechSoft - Phát triển phần mềm chuyên nghiệp",
    description:
      "Biến ý tưởng thành sản phẩm thực. Dịch vụ phát triển phần mềm chất lượng cao với chi phí hợp lý.",
    url: "https://techsoft.dev",
    siteName: "TechSoft",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSoft - Phát triển phần mềm chuyên nghiệp",
    description:
      "Biến ý tưởng thành sản phẩm thực. Dịch vụ phát triển phần mềm chất lượng cao với chi phí hợp lý.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
