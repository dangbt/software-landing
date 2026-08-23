"use client";

import { useLocale, useTranslations } from "next-intl";
import { ProjectCategory, categoryLabels, getAllCategories } from "@/data/projects";

interface FilterBarProps {
  activeCategory: ProjectCategory | "all";
  onCategoryChange: (category: ProjectCategory | "all") => void;
}

export function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
  const t = useTranslations("showcase");
  const locale = useLocale() as "vi" | "en";
  const categories = getAllCategories();

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          activeCategory === "all"
            ? "bg-gradient-primary text-primary-foreground shadow-md"
            : "bg-card border border-border text-secondary hover:border-primary/35 hover:text-foreground"
        }`}
      >
        {t("filterAll")}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category
              ? "bg-gradient-primary text-primary-foreground shadow-md"
              : "bg-card border border-border text-secondary hover:border-primary/35 hover:text-foreground"
          }`}
        >
          {categoryLabels[category][locale]}
        </button>
      ))}
    </div>
  );
}
