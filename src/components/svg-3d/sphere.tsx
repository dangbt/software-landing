"use client";

import { forwardRef } from "react";
import type { Shape3DProps } from "./cube";

export const Sphere3D = forwardRef<SVGSVGElement, Shape3DProps>(
  (
    {
      size = 100,
      color = "#06b6d4",
      secondaryColor,
      className,
      style,
      id,
    },
    ref
  ) => {
    const gradientId = `sphere-gradient-${id || Math.random().toString(36).slice(2)}`;
    const highlightId = `sphere-highlight-${id || Math.random().toString(36).slice(2)}`;

    return (
      <svg
        ref={ref}
        id={id}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={className}
        style={style}
      >
        <defs>
          {/* Main gradient */}
          <radialGradient id={gradientId} cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor={secondaryColor || adjustBrightness(color, 40)} />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={adjustBrightness(color, -30)} />
          </radialGradient>
          {/* Highlight */}
          <radialGradient id={highlightId} cx="30%" cy="30%" r="20%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Main sphere */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill={`url(#${gradientId})`}
          className="sphere-body"
        />

        {/* Highlight */}
        <ellipse
          cx="38"
          cy="38"
          rx="12"
          ry="10"
          fill={`url(#${highlightId})`}
          className="sphere-highlight"
        />

        {/* Subtle ring for 3D effect */}
        <ellipse
          cx="50"
          cy="70"
          rx="30"
          ry="8"
          fill="none"
          stroke={adjustBrightness(color, -40)}
          strokeWidth="0.5"
          opacity="0.3"
          className="sphere-ring"
        />
      </svg>
    );
  }
);

Sphere3D.displayName = "Sphere3D";

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
