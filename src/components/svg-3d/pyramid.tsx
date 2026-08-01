"use client";

import { forwardRef } from "react";
import type { Shape3DProps } from "./cube";

export const Pyramid3D = forwardRef<SVGSVGElement, Shape3DProps>(
  (
    {
      size = 100,
      color = "#f59e0b",
      secondaryColor,
      tertiaryColor,
      className,
      style,
      id,
    },
    ref
  ) => {
    const leftColor = secondaryColor || adjustBrightness(color, -15);
    const rightColor = tertiaryColor || adjustBrightness(color, -30);

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
        {/* Front face */}
        <polygon
          points="50,10 20,85 50,70"
          fill={color}
          className="pyramid-front"
        />
        {/* Left face */}
        <polygon
          points="50,10 50,70 80,85"
          fill={leftColor}
          className="pyramid-left"
        />
        {/* Bottom face (visible part) */}
        <polygon
          points="20,85 50,70 80,85"
          fill={rightColor}
          className="pyramid-bottom"
        />
        {/* Edges */}
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="70"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.5"
        />
        <line
          x1="50"
          y1="10"
          x2="20"
          y2="85"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
        <line
          x1="50"
          y1="10"
          x2="80"
          y2="85"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
      </svg>
    );
  }
);

Pyramid3D.displayName = "Pyramid3D";

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
