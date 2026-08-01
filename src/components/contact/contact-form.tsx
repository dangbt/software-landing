"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type FormStatus = "idle" | "loading" | "success" | "error";

// Cloudflare Worker API
const CONTACT_API_URL = "https://techsoft-api.buitandang96.workers.dev";

export function ContactForm() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Get selected services
    const services: string[] = [];
    formData.getAll("services").forEach((value) => {
      services.push(value.toString());
    });

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      budget: formData.get("budget") as string,
      services,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Đã xảy ra lỗi");
      }

      setFormStatus("success");
      form.reset();
    } catch (error) {
      setFormStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-6">
        {t("formTitle")}
      </h2>

      {/* Success Message */}
      {formStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium text-green-800">{t("successTitle")}</p>
              <p className="text-sm text-green-700">{t("successMessage")}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {formStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium text-red-800">{t("errorTitle")}</p>
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
              {t("name")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              disabled={formStatus === "loading"}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-background outline-none transition-all disabled:opacity-50"
              placeholder={t("namePlaceholder")}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
              {t("email")} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={formStatus === "loading"}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-background outline-none transition-all disabled:opacity-50"
              placeholder={t("emailPlaceholder")}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
              {t("phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              disabled={formStatus === "loading"}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-background outline-none transition-all disabled:opacity-50"
              placeholder={t("phonePlaceholder")}
            />
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-1.5">
              {t("budget")}
            </label>
            <select
              id="budget"
              name="budget"
              disabled={formStatus === "loading"}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-background outline-none transition-all disabled:opacity-50"
            >
              <option value="">{t("budgetPlaceholder")}</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000 - $25,000">$10,000 - $25,000</option>
              <option value="$25,000 - $50,000">$25,000 - $50,000</option>
              <option value="$50,000+">{t("budgetOptions.50k+")}</option>
              <option value="Need consultation">{t("budgetOptions.discuss")}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t("servicesLabel")}
          </label>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Web App", "Mobile App", "WordPress", "Shopify", "MVP / Prototype", "Cloud & DevOps"].map((service) => (
              <label key={service} className="flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  name="services" 
                  value={service} 
                  disabled={formStatus === "loading"}
                  className="w-4 h-4 text-primary rounded border-border focus:ring-primary disabled:opacity-50" 
                />
                <span className="text-sm text-foreground">{service}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
            {t("message")} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            disabled={formStatus === "loading"}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all resize-none disabled:opacity-50"
            placeholder={t("messagePlaceholder")}
          />
        </div>

        <button
          type="submit"
          disabled={formStatus === "loading"}
          className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formStatus === "loading" ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Đang gửi...
            </>
          ) : (
            <>
              {t("submit")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>

        <p className="text-xs text-secondary text-center">
          {t("privacyNote")}{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            {tCommon("privacy")}
          </Link>
        </p>
      </form>
    </div>
  );
}
