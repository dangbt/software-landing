"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const CodeIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`code-screen-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id={`code-frame-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>
        <rect x="10" y="15" width="80" height="55" rx="4" fill={`url(#code-frame-${id})`} />
        <rect x="14" y="19" width="72" height="47" rx="2" fill={`url(#code-screen-${id})`} />
        <rect x="20" y="26" width="18" height="3" rx="1" fill="#c084fc" />
        <rect x="42" y="26" width="25" height="3" rx="1" fill="#fbbf24" />
        <rect x="26" y="33" width="12" height="3" rx="1" fill="#22d3ee" />
        <rect x="42" y="33" width="30" height="3" rx="1" fill="#a3e635" />
        <rect x="26" y="40" width="16" height="3" rx="1" fill="#fb7185" />
        <rect x="46" y="40" width="20" height="3" rx="1" fill="#94a3b8" />
        <rect x="20" y="47" width="14" height="3" rx="1" fill="#c084fc" />
        <rect x="20" y="54" width="35" height="3" rx="1" fill="#64748b" />
        <rect x="58" y="54" width="2" height="6" fill="#22d3ee">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </rect>
        <circle cx="20" cy="23" r="2" fill="#ef4444" />
        <circle cx="27" cy="23" r="2" fill="#fbbf24" />
        <circle cx="34" cy="23" r="2" fill="#22c55e" />
        <path d="M40 70 L60 70 L55 78 L45 78 Z" fill="#64748b" />
        <ellipse cx="50" cy="82" rx="18" ry="4" fill="#475569" />
      </svg>
    );
  }
);

CodeIcon3D.displayName = "CodeIcon3D";
