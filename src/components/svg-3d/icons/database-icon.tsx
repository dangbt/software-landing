"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const DatabaseIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`db-top-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id={`db-body-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        {/* Bottom ellipse */}
        <ellipse cx="50" cy="80" rx="35" ry="12" fill="#0e7490" />
        {/* Body */}
        <rect x="15" y="30" width="70" height="50" fill={`url(#db-body-${id})`} />
        {/* Middle ring */}
        <ellipse cx="50" cy="55" rx="35" ry="12" fill="none" stroke="#0e7490" strokeWidth="2" />
        {/* Top ellipse */}
        <ellipse cx="50" cy="30" rx="35" ry="12" fill={`url(#db-top-${id})`} />
        {/* Highlight */}
        <ellipse cx="40" cy="28" rx="15" ry="5" fill="white" opacity="0.2" />
        {/* Data lines */}
        <line x1="25" y1="45" x2="45" y2="45" stroke="#0e7490" strokeWidth="2" opacity="0.5" />
        <line x1="25" y1="65" x2="55" y2="65" stroke="#0e7490" strokeWidth="2" opacity="0.5" />
        {/* Activity indicator */}
        <circle cx="70" cy="45" r="4" fill="#22c55e">
          <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  }
);

DatabaseIcon3D.displayName = "DatabaseIcon3D";
