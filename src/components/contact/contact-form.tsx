"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { CONTACT_API } from "@/lib/config";

type FormStatus = "idle" | "loading" | "success" | "error";

const BUDGET_OPTIONS = ["under5m", "5-10m", "10-20m", "over20m", "discuss"] as const;

const SERVICE_OPTIONS = [
  "wordpress",
  "landing",
  "theme",
  "ecommerce",
  "hosting",
  "maintenance",
  "other",
] as const;

const inputClass =
  "w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/25 focus:border-primary focus:bg-background outline-none transition-colors disabled:opacity-50";

export function ContactForm() {
  const t = useTranslations("contact");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      budget: formData.get("budget") as string,
      services: formData.getAll("services").map(String),
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || t("errorMessage"));

      setFormStatus("success");
      form.reset();
    } catch (error) {
      setFormStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t("errorMessage"));
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-6">{t("formTitle")}</h2>

      {formStatus === "success" && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-3">
          <svg
            className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-medium text-foreground">{t("successTitle")}</p>
            <p className="text-sm text-secondary">{t("successMessage")}</p>
          </div>
        </div>
      )}

      {formStatus === "error" && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-medium text-foreground">{t("errorTitle")}</p>
            <p className="text-sm text-secondary">{errorMessage}</p>
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
              autoComplete="name"
              disabled={formStatus === "loading"}
              className={inputClass}
              placeholder={t("namePlaceholder")}
            />
          </div>
          <div>
            {/* Khách hàng mảng này thường liên hệ bằng điện thoại, nên SĐT là trường bắt buộc */}
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
              {t("phone")} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              autoComplete="tel"
              inputMode="tel"
              disabled={formStatus === "loading"}
              className={inputClass}
              placeholder={t("phonePlaceholder")}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              disabled={formStatus === "loading"}
              className={inputClass}
              placeholder={t("emailPlaceholder")}
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
              className={inputClass}
              defaultValue=""
            >
              <option value="">{t("budgetPlaceholder")}</option>
              {BUDGET_OPTIONS.map((key) => (
                <option key={key} value={t(`budgetOptions.${key}`)}>
                  {t(`budgetOptions.${key}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-foreground mb-1.5">
            {t("servicesLabel")}
          </legend>
          <div className="grid sm:grid-cols-2 gap-2">
            {SERVICE_OPTIONS.map((key) => (
              <label
                key={key}
                className="flex items-center gap-2.5 px-3 py-2.5 bg-muted border border-border rounded-lg hover:border-primary/40 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  name="services"
                  value={t(`serviceOptions.${key}`)}
                  disabled={formStatus === "loading"}
                  className="w-4 h-4 accent-[var(--primary)] rounded border-border disabled:opacity-50"
                />
                <span className="text-sm text-foreground">{t(`serviceOptions.${key}`)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
            {t("message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            disabled={formStatus === "loading"}
            className={`${inputClass} resize-none`}
            placeholder={t("messagePlaceholder")}
          />
        </div>

        <button
          type="submit"
          disabled={formStatus === "loading"}
          className="w-full btn-brand px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {formStatus === "loading" ? (
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <>
              {t("submit")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>

        <p className="text-xs text-secondary text-center">
          {t("privacyNote")}{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            {t("privacyLink")}
          </Link>
        </p>
      </form>
    </div>
  );
}
