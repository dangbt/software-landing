"use client";

import { forwardRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const ServerIcon3D = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 100, className, style, id }, ref) => {
    return (
      <svg ref={ref} id={id} width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
        <defs>
          <linearGradient id={`server-top-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id={`server-front-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#3730a3" />
          </linearGradient>
          <linearGradient id={`server-side-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3730a3" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
        </defs>
        {/* Server 1 */}
        <polygon points="20,65 50,50 80,65 50,80" fill={`url(#server-top-${id})`} />
        <polygon points="20,65 50,80 50,90 20,75" fill={`url(#server-front-${id})`} />
        <polygon points="50,80 80,65 80,75 50,90" fill={`url(#server-side-${id})`} />
        <circle cx="30" cy="70" r="2" fill="#22c55e"><animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" /></circle>
        <circle cx="36" cy="72" r="2" fill="#22c55e" />
        {/* Server 2 */}
        <polygon points="20,50 50,35 80,50 50,65" fill={`url(#server-top-${id})`} />
        <polygon points="20,50 50,65 50,75 20,60" fill={`url(#server-front-${id})`} />
        <polygon points="50,65 80,50 80,60 50,75" fill={`url(#server-side-${id})`} />
        <circle cx="30" cy="55" r="2" fill="#eab308"><animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" /></circle>
        <circle cx="36" cy="57" r="2" fill="#22c55e" />
        {/* Server 3 */}
        <polygon points="20,35 50,20 80,35 50,50" fill={`url(#server-top-${id})`} />
        <polygon points="20,35 50,50 50,60 20,45" fill={`url(#server-front-${id})`} />
        <polygon points="50,50 80,35 80,45 50,60" fill={`url(#server-side-${id})`} />
        <circle cx="30" cy="40" r="2" fill="#22c55e" />
        <circle cx="36" cy="42" r="2" fill="#22c55e" />
      </svg>
    );
  }
);

ServerIcon3D.displayName = "ServerIcon3D";
