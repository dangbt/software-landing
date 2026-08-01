"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const GitIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`git-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        {/* Main branch line */}
        <line x1="30" y1="20" x2="30" y2="80" stroke="#fdba74" strokeWidth="4" strokeLinecap="round" />
        {/* Feature branch */}
        <path d="M30 40 Q45 40 55 30" fill="none" stroke="#86efac" strokeWidth="3" strokeLinecap="round" />
        <path d="M55 30 L55 20" fill="none" stroke="#86efac" strokeWidth="3" strokeLinecap="round" />
        {/* Merge back */}
        <path d="M55 20 Q70 25 70 40 Q70 55 30 60" fill="none" stroke="#86efac" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 2" />
        {/* Commit nodes */}
        <circle cx="30" cy="20" r="6" fill={`url(#git-grad-${id})`} stroke="#fff" strokeWidth="2" />
        <circle cx="30" cy="40" r="6" fill={`url(#git-grad-${id})`} stroke="#fff" strokeWidth="2" />
        <circle cx="30" cy="60" r="6" fill={`url(#git-grad-${id})`} stroke="#fff" strokeWidth="2" />
        <circle cx="30" cy="80" r="6" fill={`url(#git-grad-${id})`} stroke="#fff" strokeWidth="2" />
        {/* Branch commits */}
        <circle cx="55" cy="30" r="5" fill="#22c55e" stroke="#fff" strokeWidth="2" />
        <circle cx="55" cy="20" r="5" fill="#22c55e" stroke="#fff" strokeWidth="2" />
        {/* HEAD pointer */}
        <rect x="65" y="75" width="25" height="12" rx="3" fill="#fbbf24" />
        <text x="77" y="84" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#78350f">HEAD</text>
        <line x1="65" y1="80" x2="36" y2="80" stroke="#fbbf24" strokeWidth="2" />
      </svg>
    );
  }
);

GitIcon3D.displayName = "GitIcon3D";
