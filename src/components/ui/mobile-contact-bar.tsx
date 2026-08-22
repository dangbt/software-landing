"use client";

import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

/**
 * Thanh Gọi / Zalo cố định ở đáy màn hình điện thoại.
 * Với khách hàng dịch vụ website tại Việt Nam, Zalo là kênh chốt chính —
 * để họ phải cuộn lên đầu trang tìm số là mất khách.
 */
export function MobileContactBar() {
  const t = useTranslations("common");

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur-lg">
      <a
        href={`tel:${site.contact.phoneTel}`}
        className="flex items-center justify-center gap-2 py-4 font-semibold text-foreground border-r border-border"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        {t("callNow")}
      </a>
      <a
        href={site.contact.zalo}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-4 font-semibold btn-brand"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.9 9.9 0 01-4.03-.84L3 21l1.4-3.72A7.6 7.6 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {t("chatZalo")}
      </a>
    </div>
  );
}
