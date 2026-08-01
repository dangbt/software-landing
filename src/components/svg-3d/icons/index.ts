export { CodeIcon3D } from "./code-icon";
export { ServerIcon3D } from "./server-icon";
export { CloudIcon3D } from "./cloud-icon";
export { MobileIcon3D } from "./mobile-icon";
export { RocketIcon3D } from "./rocket-icon";
export { GearIcon3D } from "./gear-icon";
export { DatabaseIcon3D } from "./database-icon";
export { ApiIcon3D } from "./api-icon";
export { SecurityIcon3D } from "./security-icon";
export { AnalyticsIcon3D } from "./analytics-icon";
export { AiIcon3D } from "./ai-icon";
export { GitIcon3D } from "./git-icon";
export { DockerIcon3D } from "./docker-icon";
export { GlobeIcon3D } from "./globe-icon";

// Icon registry for easy access
export const TECH_ICONS = {
  code: { component: "CodeIcon3D", name: "Code Editor", color: "#1e293b" },
  server: { component: "ServerIcon3D", name: "Server", color: "#4f46e5" },
  cloud: { component: "CloudIcon3D", name: "Cloud", color: "#3b82f6" },
  mobile: { component: "MobileIcon3D", name: "Mobile App", color: "#8b5cf6" },
  rocket: { component: "RocketIcon3D", name: "Rocket", color: "#ef4444" },
  gear: { component: "GearIcon3D", name: "Settings", color: "#f59e0b" },
  database: { component: "DatabaseIcon3D", name: "Database", color: "#06b6d4" },
  api: { component: "ApiIcon3D", name: "API", color: "#7c3aed" },
  security: { component: "SecurityIcon3D", name: "Security", color: "#10b981" },
  analytics: { component: "AnalyticsIcon3D", name: "Analytics", color: "#3b82f6" },
  ai: { component: "AiIcon3D", name: "AI/ML", color: "#ec4899" },
  git: { component: "GitIcon3D", name: "Git", color: "#f97316" },
  docker: { component: "DockerIcon3D", name: "Docker", color: "#2563eb" },
  globe: { component: "GlobeIcon3D", name: "Web/Global", color: "#10b981" },
} as const;
