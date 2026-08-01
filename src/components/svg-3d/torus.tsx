"use client";

import { forwardRef } from "react";
import type { Shape3DProps } from "./cube";

export const Torus3D = forwardRef<SVGSVGElement, Shape3DProps>(
  (
    {
      size = 100,
      color = "#ec4899",
      secondaryColor,
      className,
      style,
      id,
    },
    ref
  ) => {
    const gradientId = `torus-gradient-${id || Math.random().toString(36).slice(2)}`;
    const innerGradientId = `torus-inner-${id || Math.random().toString(36).slice(2)}`;
    const darkColor = adjustBrightness(color, -30);
    const lightColor = secondaryColor || adjustBrightness(color, 30);

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
          {/* Outer gradient */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={lightColor} />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={darkColor} />
          </linearGradient>
          {/* Inner shadow gradient */}
          <linearGradient id={innerGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkColor} />
            <stop offset="100%" stopColor={adjustBrightness(color, -50)} />
          </linearGradient>
        </defs>

        {/* Back part of torus (darker) */}
        <ellipse
          cx="50"
          cy="50"
          rx="40"
          ry="20"
          fill="none"
          stroke={darkColor}
          strokeWidth="12"
          strokeDasharray="126 126"
          strokeDashoffset="63"
          className="torus-back"
        />

        {/* Front part of torus */}
        <ellipse
          cx="50"
          cy="50"
          rx="40"
          ry="20"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          strokeDasharray="126 126"
          strokeDashoffset="-63"
          className="torus-front"
        />

        {/* Inner hole shading */}
        <ellipse
          cx="50"
          cy="50"
          rx="22"
          ry="8"
          fill={`url(#${innerGradientId})`}
          opacity="0.5"
          className="torus-hole"
        />

        {/* Highlight */}
        <ellipse
          cx="30"
          cy="45"
          rx="8"
          ry="3"
          fill="rgba(255,255,255,0.4)"
          className="torus-highlight"
        />
      </svg>
    );
  }
);

Torus3D.displayName = "Torus3D";

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
