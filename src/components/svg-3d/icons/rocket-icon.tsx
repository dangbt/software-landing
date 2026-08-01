"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const RocketIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`rocket-body-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id={`rocket-accent-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id={`flame-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <g transform="rotate(-45 50 50)">
          <path d="M50 15 C50 15 35 30 35 50 L35 65 L50 72 L65 65 L65 50 C65 30 50 15 50 15" fill={`url(#rocket-body-${id})`} stroke="#94a3b8" strokeWidth="1" />
          <path d="M50 15 C50 15 42 25 42 35 L50 30 L58 35 C58 25 50 15 50 15" fill={`url(#rocket-accent-${id})`} />
          <circle cx="50" cy="42" r="8" fill="#3b82f6" />
          <circle cx="48" cy="40" r="3" fill="white" opacity="0.5" />
          <rect x="42" y="52" width="16" height="4" fill={`url(#rocket-accent-${id})`} />
          <path d="M35 55 L25 70 L35 65 Z" fill={`url(#rocket-accent-${id})`} />
          <path d="M65 55 L75 70 L65 65 Z" fill={`url(#rocket-accent-${id})`} />
        </g>
        <g transform="rotate(-45 50 50)">
          <ellipse cx="50" cy="82" rx="8" ry="12" fill={`url(#flame-${id})`}>
            <animate attributeName="ry" values="12;15;12" dur="0.2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="50" cy="85" rx="5" ry="8" fill="#fef08a">
            <animate attributeName="ry" values="8;10;8" dur="0.15s" repeatCount="indefinite" />
          </ellipse>
        </g>
        <circle cx="15" cy="25" r="1.5" fill="#fbbf24" />
        <circle cx="85" cy="20" r="1" fill="#fbbf24" />
        <circle cx="80" cy="45" r="1.5" fill="#fbbf24" />
      </svg>
    );
  }
);

RocketIcon3D.displayName = "RocketIcon3D";
