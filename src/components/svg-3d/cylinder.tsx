"use client";

import { forwardRef } from "react";
import type { Shape3DProps } from "./cube";

export const Cylinder3D = forwardRef<SVGSVGElement, Shape3DProps>(
  (
    {
      size = 100,
      color = "#10b981",
      secondaryColor,
      tertiaryColor,
      className,
      style,
      id,
    },
    ref
  ) => {
    const gradientId = `cylinder-gradient-${id || Math.random().toString(36).slice(2)}`;
    const topColor = secondaryColor || adjustBrightness(color, 25);
    const darkColor = tertiaryColor || adjustBrightness(color, -25);

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
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={darkColor} />
            <stop offset="30%" stopColor={color} />
            <stop offset="70%" stopColor={color} />
            <stop offset="100%" stopColor={darkColor} />
          </linearGradient>
        </defs>

        {/* Body */}
        <rect
          x="20"
          y="25"
          width="60"
          height="50"
          fill={`url(#${gradientId})`}
          className="cylinder-body"
        />

        {/* Bottom ellipse */}
        <ellipse
          cx="50"
          cy="75"
          rx="30"
          ry="10"
          fill={darkColor}
          className="cylinder-bottom"
        />

        {/* Top ellipse */}
        <ellipse
          cx="50"
          cy="25"
          rx="30"
          ry="10"
          fill={topColor}
          className="cylinder-top"
        />

        {/* Highlight on body */}
        <rect
          x="25"
          y="30"
          width="8"
          height="40"
          fill="rgba(255,255,255,0.15)"
          rx="4"
          className="cylinder-highlight"
        />

        {/* Top highlight */}
        <ellipse
          cx="42"
          cy="23"
          rx="12"
          ry="4"
          fill="rgba(255,255,255,0.2)"
          className="cylinder-top-highlight"
        />
      </svg>
    );
  }
);

Cylinder3D.displayName = "Cylinder3D";

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
