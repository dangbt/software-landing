"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const AiIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`brain-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
          <filter id={`glow-${id}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Brain outline */}
        <path d="M50 15 C35 15 25 25 25 40 C20 42 18 50 20 58 C18 65 22 75 35 78 C40 85 60 85 65 78 C78 75 82 65 80 58 C82 50 80 42 75 40 C75 25 65 15 50 15" fill={`url(#brain-grad-${id})`} />
        {/* Brain folds */}
        <path d="M35 35 Q50 45 65 35" fill="none" stroke="#be185d" strokeWidth="2" />
        <path d="M30 50 Q50 60 70 50" fill="none" stroke="#be185d" strokeWidth="2" />
        <path d="M50 25 L50 75" fill="none" stroke="#be185d" strokeWidth="2" />
        {/* Neural nodes */}
        <circle cx="35" cy="40" r="4" fill="#fce7f3" filter={`url(#glow-${id})`}>
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="65" cy="40" r="4" fill="#fce7f3" filter={`url(#glow-${id})`}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="55" r="5" fill="#fce7f3" filter={`url(#glow-${id})`}>
          <animate attributeName="opacity" values="1;0.6;1" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="68" r="3" fill="#fce7f3" />
        <circle cx="60" cy="68" r="3" fill="#fce7f3" />
        {/* Connection sparks */}
        <line x1="35" y1="40" x2="50" y2="55" stroke="#fce7f3" strokeWidth="1" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="0.8s" repeatCount="indefinite" />
        </line>
        <line x1="65" y1="40" x2="50" y2="55" stroke="#fce7f3" strokeWidth="1" opacity="0.6">
          <animate attributeName="opacity" values="1;0.6;1" dur="0.8s" repeatCount="indefinite" />
        </line>
      </svg>
    );
  }
);

AiIcon3D.displayName = "AiIcon3D";
