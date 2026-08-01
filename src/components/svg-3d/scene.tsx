"use client";

import { forwardRef } from "react";
import { Cube3D } from "./cube";
import { Sphere3D } from "./sphere";
import { Pyramid3D } from "./pyramid";
import { Torus3D } from "./torus";
import { Cylinder3D } from "./cylinder";

export interface Scene3DProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const Scene3D = forwardRef<SVGSVGElement, Scene3DProps>(
  ({ width = 600, height = 400, className, style, id = "scene-3d" }, ref) => {
    return (
      <svg
        ref={ref}
        id={id}
        width={width}
        height={height}
        viewBox="0 0 600 400"
        className={className}
        style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", ...style }}
      >
        {/* Background decorative circles */}
        <circle cx="500" cy="80" r="60" fill="#4f46e5" opacity="0.05" />
        <circle cx="100" cy="320" r="40" fill="#06b6d4" opacity="0.05" />

        {/* Main Sphere - Center */}
        <g id="shape-sphere" transform="translate(250, 150)">
          <Sphere3D size={120} color="#4f46e5" id="sphere-main" />
        </g>

        {/* Cube - Left */}
        <g id="shape-cube" transform="translate(80, 180)">
          <Cube3D size={90} color="#06b6d4" id="cube-main" />
        </g>

        {/* Pyramid - Right */}
        <g id="shape-pyramid" transform="translate(430, 160)">
          <Pyramid3D size={100} color="#f59e0b" id="pyramid-main" />
        </g>

        {/* Torus - Top Right */}
        <g id="shape-torus" transform="translate(450, 50)">
          <Torus3D size={80} color="#ec4899" id="torus-main" />
        </g>

        {/* Cylinder - Bottom Left */}
        <g id="shape-cylinder" transform="translate(50, 280)">
          <Cylinder3D size={70} color="#10b981" id="cylinder-main" />
        </g>

        {/* Small accent shapes */}
        <g id="shape-small-cube" transform="translate(380, 280)">
          <Cube3D size={50} color="#8b5cf6" id="cube-small" />
        </g>

        <g id="shape-small-sphere" transform="translate(180, 50)">
          <Sphere3D size={50} color="#ef4444" id="sphere-small" />
        </g>

        {/* Floating dots for decoration */}
        <circle cx="150" cy="130" r="4" fill="#4f46e5" opacity="0.6" id="dot-1" />
        <circle cx="520" cy="200" r="3" fill="#06b6d4" opacity="0.6" id="dot-2" />
        <circle cx="350" cy="350" r="5" fill="#f59e0b" opacity="0.6" id="dot-3" />
        <circle cx="280" cy="80" r="3" fill="#ec4899" opacity="0.6" id="dot-4" />
      </svg>
    );
  }
);

Scene3D.displayName = "Scene3D";
