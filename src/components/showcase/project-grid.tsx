"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Project, ProjectCategory } from "@/data/projects";
import { Reveal } from "@/components/ui";
import { ProjectCard } from "./project-card";
import { FilterBar } from "./filter-bar";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const t = useTranslations("showcase");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <p className="text-muted-foreground">{t("noProjects")}</p>
        </div>
      ) : (
        // key theo danh mục để Reveal chạy lại: lọc xong là DOM mới, observer
        // cũ không biết tới chúng nên thẻ mới sẽ kẹt ở opacity: 0.
        <Reveal key={activeCategory} stagger={0.05}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="reveal">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
