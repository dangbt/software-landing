"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { gsap } from "gsap";
import { CodeIcon3D, CloudIcon3D, RocketIcon3D, GlobeIcon3D } from "./icons";

interface AnimatedTechSceneProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  autoPlay?: boolean;
}

export interface AnimatedTechSceneRef {
  play: () => void;
  pause: () => void;
  restart: () => void;
  getTimeline: () => gsap.core.Timeline | null;
  getSVG: () => SVGSVGElement | null;
}

export const AnimatedTechScene = forwardRef<AnimatedTechSceneRef, AnimatedTechSceneProps>(
  ({ width = 500, height = 400, className, style, id = "animated-tech-scene", autoPlay = true }, ref) => {
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

      const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "power1.inOut" } });

      // Main code icon - gentle float
      tl.to(svg.querySelector("#icon-code"), { y: -8, duration: 3 }, 0);

      // Cloud - subtle drift
      tl.to(svg.querySelector("#icon-cloud"), { y: -6, x: 2, duration: 3.5 }, 0);

      // Rocket - gentle movement
      tl.to(svg.querySelector("#icon-rocket"), { y: -10, duration: 2.5 }, 0);

      // Globe - slow float
      tl.to(svg.querySelector("#icon-globe"), { y: -5, duration: 3.2 }, 0);

      // Floating dots
      tl.to(svg.querySelectorAll(".dot"), { y: -6, opacity: 0.8, stagger: 0.15, duration: 2.5 }, 0);

      timelineRef.current = tl;
      if (!autoPlay) tl.pause();

      return () => { tl.kill(); };
    }, [autoPlay]);

    return (
      <svg ref={svgRef} id={id} width={width} height={height} viewBox="0 0 500 400" className={className} style={style}>
        <defs>
          <radialGradient id="scene-bg" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </radialGradient>
          <filter id="shadow-sm">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Background */}
        <rect width="500" height="400" fill="url(#scene-bg)" rx="20" />

        {/* Decorative circles */}
        <circle cx="420" cy="80" r="80" fill="#4f46e5" opacity="0.05" />
        <circle cx="80" cy="320" r="60" fill="#06b6d4" opacity="0.05" />

        {/* Connection lines - subtle dashed */}
        <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" opacity="0.4">
          <path d="M250 120 Q 150 180 100 250" fill="none" />
          <path d="M250 120 Q 350 180 400 250" fill="none" />
          <path d="M250 120 L 250 60" fill="none" />
        </g>

        {/* === ICONS - Clean layout === */}
        
        {/* Center Top - Code Editor (main hero) */}
        <g id="icon-code" transform="translate(150, 80)" filter="url(#shadow-sm)">
          <CodeIcon3D size={200} id="code-main" />
        </g>

        {/* Left Bottom - Cloud */}
        <g id="icon-cloud" transform="translate(30, 240)" filter="url(#shadow-sm)">
          <CloudIcon3D size={100} id="cloud-main" />
        </g>

        {/* Right Bottom - Rocket */}
        <g id="icon-rocket" transform="translate(370, 230)" filter="url(#shadow-sm)">
          <RocketIcon3D size={110} id="rocket-main" />
        </g>

        {/* Top Left - Globe (small) */}
        <g id="icon-globe" transform="translate(40, 50)" filter="url(#shadow-sm)">
          <GlobeIcon3D size={70} id="globe-main" />
        </g>

        {/* Floating dots - minimal decoration */}
        <circle className="dot" cx="120" cy="180" r="4" fill="#4f46e5" opacity="0.4" />
        <circle className="dot" cx="380" cy="160" r="3" fill="#06b6d4" opacity="0.4" />
        <circle className="dot" cx="300" cy="350" r="4" fill="#8b5cf6" opacity="0.3" />
        <circle className="dot" cx="200" cy="320" r="3" fill="#22c55e" opacity="0.4" />
      </svg>
    );
  }
);

AnimatedTechScene.displayName = "AnimatedTechScene";
