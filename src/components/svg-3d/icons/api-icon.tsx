"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const ApiIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`api-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        {/* Central hub */}
        <circle cx="50" cy="50" r="20" fill={`url(#api-grad-${id})`} />
        <circle cx="50" cy="50" r="12" fill="#ede9fe" />
        <text x="50" y="55" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7c3aed">{`{ }`}</text>
        {/* Connection nodes */}
        <circle cx="50" cy="15" r="10" fill="#c4b5fd" />
        <circle cx="85" cy="50" r="10" fill="#c4b5fd" />
        <circle cx="50" cy="85" r="10" fill="#c4b5fd" />
        <circle cx="15" cy="50" r="10" fill="#c4b5fd" />
        {/* Connection lines */}
        <line x1="50" y1="30" x2="50" y2="25" stroke="#7c3aed" strokeWidth="3" />
        <line x1="70" y1="50" x2="75" y2="50" stroke="#7c3aed" strokeWidth="3" />
        <line x1="50" y1="70" x2="50" y2="75" stroke="#7c3aed" strokeWidth="3" />
        <line x1="30" y1="50" x2="25" y2="50" stroke="#7c3aed" strokeWidth="3" />
        {/* Data flow animation */}
        <circle cx="50" cy="27" r="2" fill="#22c55e">
          <animate attributeName="cy" values="27;22;27" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="73" cy="50" r="2" fill="#22c55e">
          <animate attributeName="cx" values="73;78;73" dur="1s" repeatCount="indefinite" begin="0.25s" />
        </circle>
      </svg>
    );
  }
);

ApiIcon3D.displayName = "ApiIcon3D";
