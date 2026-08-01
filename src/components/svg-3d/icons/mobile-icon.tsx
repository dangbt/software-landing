"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const MobileIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`phone-body-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <linearGradient id={`phone-screen-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id={`phone-side-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
        </defs>
        <path d="M65 10 L75 15 L75 85 L65 90 L65 10" fill={`url(#phone-side-${id})`} />
        <rect x="25" y="10" width="40" height="80" rx="5" fill={`url(#phone-body-${id})`} />
        <rect x="28" y="18" width="34" height="60" rx="2" fill={`url(#phone-screen-${id})`} />
        <rect x="32" y="24" width="10" height="10" rx="2" fill="#22c55e" opacity="0.9" />
        <rect x="46" y="24" width="10" height="10" rx="2" fill="#f59e0b" opacity="0.9" />
        <rect x="32" y="38" width="10" height="10" rx="2" fill="#ef4444" opacity="0.9" />
        <rect x="46" y="38" width="10" height="10" rx="2" fill="#06b6d4" opacity="0.9" />
        <rect x="32" y="52" width="10" height="10" rx="2" fill="#8b5cf6" opacity="0.9" />
        <rect x="46" y="52" width="10" height="10" rx="2" fill="#ec4899" opacity="0.9" />
        <rect x="38" y="12" width="14" height="4" rx="2" fill="#000" />
        <circle cx="42" cy="14" r="1.5" fill="#1e3a5f" />
        <rect x="38" y="82" width="14" height="3" rx="1.5" fill="#374151" />
        <circle cx="58" cy="26" r="3" fill="#ef4444">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  }
);

MobileIcon3D.displayName = "MobileIcon3D";
