"use client";

import { forwardRef } from "react";

export interface Shape3DProps {
  size?: number;
  color?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const Cube3D = forwardRef<SVGSVGElement, Shape3DProps>(
  (
    {
      size = 100,
      color = "#4f46e5",
      secondaryColor,
      tertiaryColor,
      className,
      style,
      id,
    },
    ref
  ) => {
    // Calculate lighter/darker shades if not provided
    const topColor = secondaryColor || adjustBrightness(color, 30);
    const rightColor = tertiaryColor || adjustBrightness(color, -20);

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
        {/* Top face */}
        <polygon
          points="50,10 90,30 50,50 10,30"
          fill={topColor}
          className="cube-top"
        />
        {/* Left face */}
        <polygon
          points="10,30 50,50 50,90 10,70"
          fill={color}
          className="cube-left"
        />
        {/* Right face */}
        <polygon
          points="50,50 90,30 90,70 50,90"
          fill={rightColor}
          className="cube-right"
        />
        {/* Edges */}
        <polyline
          points="10,30 50,50 50,90"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
        />
        <polyline
          points="50,50 90,30"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
        />
      </svg>
    );
  }
);

Cube3D.displayName = "Cube3D";

// Helper function to adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
