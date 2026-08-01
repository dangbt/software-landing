"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const DockerIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`docker-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {/* Whale body */}
        <ellipse cx="50" cy="55" rx="38" ry="22" fill={`url(#docker-grad-${id})`} />
        {/* Whale tail */}
        <path d="M12 55 Q5 45 15 35 Q20 45 18 55" fill={`url(#docker-grad-${id})`} />
        {/* Water spray */}
        <path d="M75 35 Q80 25 75 20 Q85 25 82 35" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round">
          <animate attributeName="d" values="M75 35 Q80 25 75 20 Q85 25 82 35;M75 33 Q80 22 75 17 Q87 23 82 33;M75 35 Q80 25 75 20 Q85 25 82 35" dur="1s" repeatCount="indefinite" />
        </path>
        {/* Containers (cargo) */}
        <rect x="25" y="40" width="10" height="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1" />
        <rect x="37" y="40" width="10" height="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1" />
        <rect x="49" y="40" width="10" height="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1" />
        <rect x="61" y="40" width="10" height="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1" />
        <rect x="31" y="30" width="10" height="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1" />
        <rect x="43" y="30" width="10" height="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1" />
        <rect x="55" y="30" width="10" height="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1" />
        <rect x="37" y="20" width="10" height="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1" />
        <rect x="49" y="20" width="10" height="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1" />
        {/* Eye */}
        <circle cx="22" cy="52" r="3" fill="#1e3a8a" />
        <circle cx="21" cy="51" r="1" fill="white" />
        {/* Water line */}
        <path d="M5 70 Q25 65 50 70 Q75 75 95 70" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
      </svg>
    );
  }
);

DockerIcon3D.displayName = "DockerIcon3D";
