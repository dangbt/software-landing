"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const CloudIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`cloud-main-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id={`cloud-shadow-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <ellipse cx="52" cy="62" rx="30" ry="10" fill={`url(#cloud-shadow-${id})`} opacity="0.5" />
        <circle cx="35" cy="45" r="18" fill={`url(#cloud-main-${id})`} />
        <circle cx="55" cy="40" r="22" fill={`url(#cloud-main-${id})`} />
        <circle cx="70" cy="48" r="15" fill={`url(#cloud-main-${id})`} />
        <ellipse cx="50" cy="52" rx="32" ry="14" fill={`url(#cloud-main-${id})`} />
        <circle cx="40" cy="38" r="8" fill="white" opacity="0.3" />
        <path d="M50 68 L50 48 M42 56 L50 48 L58 56" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
        </path>
        <circle cx="42" cy="75" r="2" fill="#22d3ee">
          <animate attributeName="cy" values="75;40;75" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="58" cy="76" r="2" fill="#34d399">
          <animate attributeName="cy" values="76;38;76" dur="2.2s" repeatCount="indefinite" begin="0.5s" />
          <animate attributeName="opacity" values="1;0;1" dur="2.2s" repeatCount="indefinite" begin="0.5s" />
        </circle>
      </svg>
    );
  }
);

CloudIcon3D.displayName = "CloudIcon3D";
