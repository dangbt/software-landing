"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const SecurityIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`shield-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id={`shield-dark-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* Shield shape - left half */}
        <path d="M50 10 L20 25 L20 50 C20 70 35 85 50 90 L50 10" fill={`url(#shield-grad-${id})`} />
        {/* Shield shape - right half (darker) */}
        <path d="M50 10 L80 25 L80 50 C80 70 65 85 50 90 L50 10" fill={`url(#shield-dark-${id})`} />
        {/* Border */}
        <path d="M50 10 L20 25 L20 50 C20 70 35 85 50 90 C65 85 80 70 80 50 L80 25 Z" fill="none" stroke="#047857" strokeWidth="2" />
        {/* Checkmark */}
        <path d="M35 50 L45 60 L65 38" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Shine */}
        <path d="M30 30 L40 35 L30 45 Z" fill="white" opacity="0.2" />
        {/* Pulse effect */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="#34d399" strokeWidth="2" opacity="0.5">
          <animate attributeName="r" values="30;40;30" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  }
);

SecurityIcon3D.displayName = "SecurityIcon3D";
