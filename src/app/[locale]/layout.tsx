import type { Metadata } from "next";
import { Be_Vietnam_Pro, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header, Footer } from "@/components/layout";
import { MobileContactBar } from "@/components/ui";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

// Geist không có bộ ký tự tiếng Việt. Be Vietnam Pro được thiết kế riêng cho
// dấu tiếng Việt nên chữ có dấu không bị vỡ hay lệch chân.
const sans = Be_Vietnam_Pro({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("homeTitle"),
      // Trang con chỉ cần đặt title ngắn, phần thương hiệu tự nối vào
      template: `%s | ${site.name}`,
    },
    description: t("homeDescription"),
    keywords: t.raw("keywords") as string[],
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.legalName,
    // Icon lấy tự động từ src/app/icon.png và apple-icon.png (quy ước App Router),
    // khai báo thêm ở đây sẽ sinh ra thẻ <link> trùng lặp.
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: absoluteUrl(locale),
      siteName: site.name,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      // Chưa có ảnh OG nên dùng thẻ tóm tắt nhỏ.
      // Khi có /og.png (1200x630), đổi thành "summary_large_image" và khai báo images.
      card: "summary",
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { telephone: true, address: true, email: true },
  };
}

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
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var d = document.documentElement;
                // Đánh dấu JS chạy được — chỉ khi đó CSS mới ẩn .reveal để animate.
                // Không có dòng này thì người tắt JS sẽ thấy trang trắng.
                d.classList.add('js');
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    d.classList.add('dark');
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
          <MobileContactBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
