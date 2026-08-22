import { useTranslations } from "next-intl";
import { site, pricingPlans } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

const FAQ_COUNT = 8;

/**
 * Dữ liệu có cấu trúc cho Google: thông tin doanh nghiệp, dịch vụ và FAQ.
 * FAQPage giúp câu hỏi hiển thị ngay trên trang kết quả tìm kiếm.
 */
export function JsonLd({ locale }: { locale: string }) {
  const tFaq = useTranslations("faq");
  const tPricing = useTranslations("pricing");
  const tSeo = useTranslations("seo");

  const organization = {
    "@type": "ProfessionalService",
    "@id": `${site.url}#organization`,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl(locale),
    email: site.contact.email,
    telephone: site.contact.phoneTel,
    taxID: site.taxId,
    foundingDate: site.established,
    description: tSeo("homeDescription"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressLocality: site.contact.city,
      addressCountry: site.contact.country,
    },
    areaServed: { "@type": "Country", name: "Vietnam" },
    priceRange: "₫₫",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: tPricing("title"),
      itemListElement: pricingPlans.map((plan) => ({
        "@type": "Offer",
        name: tPricing(`${plan.id}.name`),
        description: tPricing(`${plan.id}.for`),
        price: plan.price,
        priceCurrency: "VND",
      })),
    },
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(locale)}#faq`,
    mainEntity: Array.from({ length: FAQ_COUNT }, (_, i) => i + 1).map((n) => ({
      "@type": "Question",
      name: tFaq(`q${n}`),
      acceptedAnswer: { "@type": "Answer", text: tFaq(`a${n}`) },
    })),
  };

  const graph = { "@context": "https://schema.org", "@graph": [organization, faq] };

  return (
    <script
      type="application/ld+json"
      // Nội dung do chính chúng ta sinh ra từ file ngôn ngữ, không phải input người dùng.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
