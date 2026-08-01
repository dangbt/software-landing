"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const GlobeIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`globe-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id={`globe-dark-${id}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* Globe */}
        <circle cx="50" cy="50" r="38" fill={`url(#globe-grad-${id})`} />
        {/* Dark side */}
        <path d="M50 12 A38 38 0 0 1 50 88" fill={`url(#globe-dark-${id})`} />
        {/* Latitude lines */}
        <ellipse cx="50" cy="30" rx="35" ry="8" fill="none" stroke="#047857" strokeWidth="1" opacity="0.5" />
        <ellipse cx="50" cy="50" rx="38" ry="10" fill="none" stroke="#047857" strokeWidth="1" opacity="0.5" />
        <ellipse cx="50" cy="70" rx="35" ry="8" fill="none" stroke="#047857" strokeWidth="1" opacity="0.5" />
        {/* Longitude lines */}
        <ellipse cx="50" cy="50" rx="15" ry="38" fill="none" stroke="#047857" strokeWidth="1" opacity="0.5" />
        <ellipse cx="50" cy="50" rx="30" ry="38" fill="none" stroke="#047857" strokeWidth="1" opacity="0.5" />
        {/* Highlight */}
        <circle cx="35" cy="35" r="12" fill="white" opacity="0.2" />
        {/* Connection points */}
        <circle cx="30" cy="40" r="3" fill="#fbbf24" />
        <circle cx="65" cy="55" r="3" fill="#fbbf24" />
        <circle cx="45" cy="70" r="3" fill="#fbbf24" />
        {/* Connection arcs */}
        <path d="M30 40 Q50 30 65 55" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2">
          <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
        </path>
        <path d="M65 55 Q55 65 45 70" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2">
          <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" begin="0.3s" />
        </path>
      </svg>
    );
  }
);

GlobeIcon3D.displayName = "GlobeIcon3D";
