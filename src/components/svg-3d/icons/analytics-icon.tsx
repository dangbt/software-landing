"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const AnalyticsIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`chart-1-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id={`chart-2-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id={`chart-3-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {/* Background panel */}
        <rect x="10" y="15" width="80" height="70" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        {/* Grid lines */}
        <line x1="20" y1="35" x2="80" y2="35" stroke="#e2e8f0" strokeWidth="1" />
        <line x1="20" y1="55" x2="80" y2="55" stroke="#e2e8f0" strokeWidth="1" />
        {/* Bar 1 */}
        <rect x="22" y="45" width="12" height="30" rx="2" fill={`url(#chart-1-${id})`}>
          <animate attributeName="height" values="0;30;30" dur="1s" fill="freeze" />
          <animate attributeName="y" values="75;45;45" dur="1s" fill="freeze" />
        </rect>
        {/* Bar 2 */}
        <rect x="44" y="30" width="12" height="45" rx="2" fill={`url(#chart-2-${id})`}>
          <animate attributeName="height" values="0;45;45" dur="1s" fill="freeze" begin="0.2s" />
          <animate attributeName="y" values="75;30;30" dur="1s" fill="freeze" begin="0.2s" />
        </rect>
        {/* Bar 3 */}
        <rect x="66" y="25" width="12" height="50" rx="2" fill={`url(#chart-3-${id})`}>
          <animate attributeName="height" values="0;50;50" dur="1s" fill="freeze" begin="0.4s" />
          <animate attributeName="y" values="75;25;25" dur="1s" fill="freeze" begin="0.4s" />
        </rect>
        {/* Trend line */}
        <path d="M28 55 L50 40 L72 25" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="1.5s" fill="freeze" />
        </path>
        {/* Trend arrow */}
        <polygon points="75,22 72,28 78,26" fill="#22c55e" />
      </svg>
    );
  }
);

AnalyticsIcon3D.displayName = "AnalyticsIcon3D";
