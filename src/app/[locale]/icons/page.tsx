"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/layout";
import { FadeIn } from "@/components/animations";
import {
  CodeIcon3D, ServerIcon3D, CloudIcon3D, MobileIcon3D, RocketIcon3D, GearIcon3D,
  DatabaseIcon3D, ApiIcon3D, SecurityIcon3D, AnalyticsIcon3D, AiIcon3D,
  GitIcon3D, DockerIcon3D, GlobeIcon3D
} from "@/components/svg-3d/icons";
import { IconExporter } from "@/components/svg-3d/icon-exporter";

const ICONS = [
  { id: "code", name: "Code Editor", Component: CodeIcon3D, color: "#1e293b", desc: "IDE & Development" },
  { id: "server", name: "Server", Component: ServerIcon3D, color: "#4f46e5", desc: "Backend Infrastructure" },
  { id: "cloud", name: "Cloud", Component: CloudIcon3D, color: "#3b82f6", desc: "Cloud Services" },
  { id: "mobile", name: "Mobile", Component: MobileIcon3D, color: "#8b5cf6", desc: "Mobile Apps" },
  { id: "rocket", name: "Rocket", Component: RocketIcon3D, color: "#ef4444", desc: "Launch & Growth" },
  { id: "gear", name: "Settings", Component: GearIcon3D, color: "#f59e0b", desc: "Configuration" },
  { id: "database", name: "Database", Component: DatabaseIcon3D, color: "#06b6d4", desc: "Data Storage" },
  { id: "api", name: "API", Component: ApiIcon3D, color: "#7c3aed", desc: "API Integration" },
  { id: "security", name: "Security", Component: SecurityIcon3D, color: "#10b981", desc: "Protection" },
  { id: "analytics", name: "Analytics", Component: AnalyticsIcon3D, color: "#3b82f6", desc: "Data Insights" },
  { id: "ai", name: "AI/ML", Component: AiIcon3D, color: "#ec4899", desc: "Machine Learning" },
  { id: "git", name: "Git", Component: GitIcon3D, color: "#f97316", desc: "Version Control" },
  { id: "docker", name: "Docker", Component: DockerIcon3D, color: "#2563eb", desc: "Containerization" },
  { id: "globe", name: "Global", Component: GlobeIcon3D, color: "#10b981", desc: "Worldwide Reach" },
];

function IconCard({ icon }: { icon: typeof ICONS[0] }) {
  const ref = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl border border-border p-4 flex flex-col items-center gap-3 hover:shadow-lg hover:border-primary/30 transition-all"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-24 h-24 flex items-center justify-center" style={{ transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s" }}>
        <icon.Component ref={ref} size={90} id={icon.id} />
      </div>
      <div className="text-center">
        <p className="font-semibold text-foreground">{icon.name}</p>
        <p className="text-xs text-secondary">{icon.desc}</p>
      </div>
      <IconExporter svgRef={ref} iconName={icon.id} />
    </div>
  );
}

export default function IconGalleryPage() {
  return (
    <section className="py-12">
      <Container>
        <FadeIn>
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">3D Tech Icon Gallery</h1>
            <p className="text-secondary max-w-2xl mx-auto">
              14 hand-crafted SVG icons with 3D effects. Export as PNG or SVG in multiple sizes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {ICONS.map((icon) => (
              <IconCard key={icon.id} icon={icon} />
            ))}
          </div>

          <div className="mt-10 p-6 bg-accent rounded-xl">
            <h3 className="font-semibold text-foreground mb-3">Usage Tips</h3>
            <ul className="text-secondary text-sm space-y-1">
              <li>• <strong>PNG 512px:</strong> Best for web and presentations</li>
              <li>• <strong>PNG 1024px:</strong> High-res for print materials</li>
              <li>• <strong>SVG:</strong> Scalable vector, editable in Figma/Illustrator</li>
              <li>• All icons include subtle animations (visible on page)</li>
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
