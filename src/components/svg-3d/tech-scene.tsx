"use client";

import { forwardRef } from "react";
import { CodeIcon3D, ServerIcon3D, CloudIcon3D, MobileIcon3D, RocketIcon3D, GearIcon3D } from "./icons";

interface TechScene3DProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const TechScene3D = forwardRef<SVGSVGElement, TechScene3DProps>(
  ({ width = 500, height = 400, className, style, id = "tech-scene" }, ref) => {
    return (
      <svg
        ref={ref}
        id={id}
        width={width}
        height={height}
        viewBox="0 0 500 400"
        className={className}
        style={style}
      >
        <defs>
          <radialGradient id="bg-gradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#e0e7ff" />
          </radialGradient>
          <filter id="shadow-sm">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Background */}
        <rect width="500" height="400" fill="url(#bg-gradient)" />

        {/* Decorative circles */}
        <circle cx="420" cy="80" r="50" fill="#4f46e5" opacity="0.05" />
        <circle cx="80" cy="320" r="40" fill="#06b6d4" opacity="0.05" />
        <circle cx="250" cy="200" r="80" fill="#8b5cf6" opacity="0.03" />

        {/* Connection lines */}
        <g stroke="#c7d2fe" strokeWidth="1" strokeDasharray="4 4" opacity="0.6">
          <line x1="250" y1="120" x2="150" y2="200" />
          <line x1="250" y1="120" x2="350" y2="200" />
          <line x1="150" y1="200" x2="100" y2="300" />
          <line x1="350" y1="200" x2="400" y2="300" />
          <line x1="250" y1="120" x2="250" y2="50" />
        </g>

        {/* Center - Code Editor (main focus) */}
        <g id="icon-code" transform="translate(175, 45)" filter="url(#shadow-sm)">
          <CodeIcon3D size={150} id="code-main" />
        </g>

        {/* Left - Server */}
        <g id="icon-server" transform="translate(50, 150)" filter="url(#shadow-sm)">
          <ServerIcon3D size={100} id="server-main" />
        </g>

        {/* Right - Cloud */}
        <g id="icon-cloud" transform="translate(350, 140)" filter="url(#shadow-sm)">
          <CloudIcon3D size={100} id="cloud-main" />
        </g>

        {/* Bottom Left - Mobile */}
        <g id="icon-mobile" transform="translate(30, 270)" filter="url(#shadow-sm)">
          <MobileIcon3D size={90} id="mobile-main" />
        </g>

        {/* Bottom Right - Rocket */}
        <g id="icon-rocket" transform="translate(380, 260)" filter="url(#shadow-sm)">
          <RocketIcon3D size={90} id="rocket-main" />
        </g>

        {/* Bottom Center - Gear */}
        <g id="icon-gear" transform="translate(210, 290)" filter="url(#shadow-sm)">
          <GearIcon3D size={80} id="gear-main" />
        </g>

        {/* Floating particles */}
        <circle cx="130" cy="100" r="3" fill="#4f46e5" opacity="0.6" />
        <circle cx="380" cy="90" r="2" fill="#06b6d4" opacity="0.6" />
        <circle cx="450" cy="200" r="3" fill="#8b5cf6" opacity="0.5" />
        <circle cx="50" cy="250" r="2" fill="#22c55e" opacity="0.6" />
        <circle cx="300" cy="350" r="3" fill="#f59e0b" opacity="0.5" />
      </svg>
    );
  }
);

TechScene3D.displayName = "TechScene3D";
