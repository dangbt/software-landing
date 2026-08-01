"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const GearIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`gear-main-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id={`gear-dark-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>
        {/* Gear teeth */}
        <g className="gear" style={{ transformOrigin: "50px 50px" }}>
          <path d="M50 12 L56 12 L58 20 L54 22 L46 22 L42 20 L44 12 Z" fill={`url(#gear-main-${id})`} />
          <path d="M50 88 L56 88 L58 80 L54 78 L46 78 L42 80 L44 88 Z" fill={`url(#gear-dark-${id})`} />
          <path d="M12 50 L12 44 L20 42 L22 46 L22 54 L20 58 L12 56 Z" fill={`url(#gear-dark-${id})`} />
          <path d="M88 50 L88 44 L80 42 L78 46 L78 54 L80 58 L88 56 Z" fill={`url(#gear-main-${id})`} />
          <path d="M23 23 L28 18 L35 23 L34 28 L28 34 L23 35 L18 28 Z" fill={`url(#gear-main-${id})`} />
          <path d="M77 77 L72 82 L65 77 L66 72 L72 66 L77 65 L82 72 Z" fill={`url(#gear-dark-${id})`} />
          <path d="M23 77 L18 72 L23 65 L28 66 L34 72 L35 77 L28 82 Z" fill={`url(#gear-dark-${id})`} />
          <path d="M77 23 L82 28 L77 35 L72 34 L66 28 L65 23 L72 18 Z" fill={`url(#gear-main-${id})`} />
          {/* Main circle */}
          <circle cx="50" cy="50" r="25" fill={`url(#gear-main-${id})`} />
          <circle cx="50" cy="50" r="20" fill={`url(#gear-dark-${id})`} />
          <circle cx="50" cy="50" r="12" fill="#fef3c7" />
          <circle cx="50" cy="50" r="8" fill={`url(#gear-main-${id})`} />
          {/* Highlight */}
          <circle cx="42" cy="42" r="6" fill="white" opacity="0.2" />
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="8s" repeatCount="indefinite" />
        </g>
      </svg>
    );
  }
);

GearIcon3D.displayName = "GearIcon3D";
