import type { Metadata } from "next";
import { site } from "./site";
import { routing } from "@/i18n/routing";

/** Ghép URL tuyệt đối theo cấu hình trailingSlash của dự án. */
export function absoluteUrl(locale: string, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${site.url}/${locale}/${clean}/` : `${site.url}/${locale}/`;
}

/**
 * Canonical + hreflang cho mọi ngôn ngữ.
 * Trước đây site không khai báo alternates nên Google coi bản vi và en
 * là hai trang trùng nội dung.
 */
export function buildAlternates(locale: string, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l === "vi" ? "vi-VN" : "en"] = absoluteUrl(l, path);
  }
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);

  return {
    canonical: absoluteUrl(locale, path),
    languages,
  };
}
