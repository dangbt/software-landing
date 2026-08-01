"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { gsap } from "gsap";
import { Cube3D } from "./cube";
import { Sphere3D } from "./sphere";
import { Pyramid3D } from "./pyramid";
import { Torus3D } from "./torus";
import { Cylinder3D } from "./cylinder";

export interface AnimatedScene3DProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  autoPlay?: boolean;
  duration?: number;
}

export interface AnimatedScene3DRef {
  play: () => void;
  pause: () => void;
  restart: () => void;
  getTimeline: () => gsap.core.Timeline | null;
  getSVG: () => SVGSVGElement | null;
}

export const AnimatedScene3D = forwardRef<AnimatedScene3DRef, AnimatedScene3DProps>(
  (
    {
      width = 600,
      height = 400,
      className,
      style,
      id = "animated-scene-3d",
      autoPlay = true,
      duration = 3,
    },
    ref
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useImperativeHandle(ref, () => ({
      play: () => timelineRef.current?.play(),
      pause: () => timelineRef.current?.pause(),
      restart: () => timelineRef.current?.restart(),
      getTimeline: () => timelineRef.current,
      getSVG: () => svgRef.current,
    }));

    useEffect(() => {
      if (!svgRef.current) return;

      const svg = svgRef.current;
      
      // Create main timeline
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: "power2.inOut" },
      });

      // Animate main sphere - floating and pulsing
      tl.to(
        svg.querySelector("#shape-sphere"),
        {
          y: -15,
          scale: 1.05,
          duration: duration,
        },
        0
      );

      // Animate cube - rotation effect via transform
      tl.to(
        svg.querySelector("#shape-cube"),
        {
          y: -10,
          x: 5,
          rotation: 5,
          transformOrigin: "center center",
          duration: duration * 0.8,
        },
        0.2
      );

      // Animate pyramid - bounce
      tl.to(
        svg.querySelector("#shape-pyramid"),
        {
          y: -20,
          scale: 1.08,
          duration: duration * 0.9,
        },
        0.1
      );

      // Animate torus - rotate and float
      tl.to(
        svg.querySelector("#shape-torus"),
        {
          y: -12,
          rotation: 15,
          transformOrigin: "center center",
          duration: duration,
        },
        0
      );

      // Animate cylinder - subtle bounce
      tl.to(
        svg.querySelector("#shape-cylinder"),
        {
          y: -8,
          scale: 1.03,
          duration: duration * 0.7,
        },
        0.3
      );

      // Animate small shapes
      tl.to(
        svg.querySelector("#shape-small-cube"),
        {
          y: -12,
          rotation: -10,
          transformOrigin: "center center",
          duration: duration * 0.85,
        },
        0.15
      );

      tl.to(
        svg.querySelector("#shape-small-sphere"),
        {
          y: -10,
          x: 5,
          scale: 1.1,
          duration: duration * 0.75,
        },
        0.25
      );

      // Animate decorative dots - staggered floating
      tl.to(
        svg.querySelectorAll("[id^='dot-']"),
        {
          y: -8,
          opacity: 1,
          stagger: 0.1,
          duration: duration * 0.6,
        },
        0
      );

      timelineRef.current = tl;

      if (!autoPlay) {
        tl.pause();
      }

      return () => {
        tl.kill();
      };
    }, [autoPlay, duration]);

    return (
      <svg
        ref={svgRef}
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
        <g id="shape-sphere" style={{ transformOrigin: "310px 210px" }}>
          <g transform="translate(250, 150)">
            <Sphere3D size={120} color="#4f46e5" id="sphere-main" />
          </g>
        </g>

        {/* Cube - Left */}
        <g id="shape-cube" style={{ transformOrigin: "125px 225px" }}>
          <g transform="translate(80, 180)">
            <Cube3D size={90} color="#06b6d4" id="cube-main" />
          </g>
        </g>

        {/* Pyramid - Right */}
        <g id="shape-pyramid" style={{ transformOrigin: "480px 210px" }}>
          <g transform="translate(430, 160)">
            <Pyramid3D size={100} color="#f59e0b" id="pyramid-main" />
          </g>
        </g>

        {/* Torus - Top Right */}
        <g id="shape-torus" style={{ transformOrigin: "490px 90px" }}>
          <g transform="translate(450, 50)">
            <Torus3D size={80} color="#ec4899" id="torus-main" />
          </g>
        </g>

        {/* Cylinder - Bottom Left */}
        <g id="shape-cylinder" style={{ transformOrigin: "85px 315px" }}>
          <g transform="translate(50, 280)">
            <Cylinder3D size={70} color="#10b981" id="cylinder-main" />
          </g>
        </g>

        {/* Small accent shapes */}
        <g id="shape-small-cube" style={{ transformOrigin: "405px 305px" }}>
          <g transform="translate(380, 280)">
            <Cube3D size={50} color="#8b5cf6" id="cube-small" />
          </g>
        </g>

        <g id="shape-small-sphere" style={{ transformOrigin: "205px 75px" }}>
          <g transform="translate(180, 50)">
            <Sphere3D size={50} color="#ef4444" id="sphere-small" />
          </g>
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

AnimatedScene3D.displayName = "AnimatedScene3D";
