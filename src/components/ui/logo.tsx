"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LogoProps {
  className?: string;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

export function Logo({
  className = "",
  animated = false,
  size = "md",
  variant = "full",
}: LogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);

  const sizes = {
    sm: { width: 120, height: 32 },
    md: { width: 160, height: 40 },
    lg: { width: 200, height: 50 },
  };

  const iconSizes = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 50, height: 50 },
  };

  const currentSize = variant === "icon" ? iconSizes[size] : sizes[size];

  useEffect(() => {
    if (!animated || !logoRef.current) return;

    const paths = pathsRef.current;
    
    // Initial state
    gsap.set(paths, {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
      fill: "transparent",
    });

    // Draw animation
    const tl = gsap.timeline();
    
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.2,
    }).to(
      paths,
      {
        fill: "currentColor",
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, [animated]);

  if (variant === "icon") {
    return (
      <svg
        ref={logoRef}
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 50 50"
        fill="none"
        className={className}
      >
        {/* T lettermark with geometric styling */}
        <path
          ref={(el) => {
            if (el) pathsRef.current[0] = el;
          }}
          d="M10 12H40V18H28V38H22V18H10V12Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
        />
        {/* Accent corner */}
        <path
          ref={(el) => {
            if (el) pathsRef.current[1] = el;
          }}
          d="M35 28L40 28L40 38L35 38L35 28Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary/60"
        />
      </svg>
    );
  }

  return (
    <svg
      ref={logoRef}
      width={currentSize.width}
      height={currentSize.height}
      viewBox="0 0 160 40"
      fill="none"
      className={className}
    >
      {/* T lettermark */}
      <g className="text-primary">
        <path
          ref={(el) => {
            if (el) pathsRef.current[0] = el;
          }}
          d="M5 8H30V13H20V32H15V13H5V8Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        {/* Accent block */}
        <path
          ref={(el) => {
            if (el) pathsRef.current[1] = el;
          }}
          d="M25 22H30V32H25V22Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          className="opacity-60"
        />
      </g>

      {/* TechSoft text */}
      <g className="text-foreground" fill="currentColor">
        <path
          ref={(el) => {
            if (el) pathsRef.current[2] = el;
          }}
          d="M42 12H60V15H53V28H49V15H42V12Z"
        />
        <path
          ref={(el) => {
            if (el) pathsRef.current[3] = el;
          }}
          d="M63 17C63 14.2 65.2 12 68 12H74C76.8 12 79 14.2 79 17V18H75V17C75 16.4 74.6 16 74 16H68C67.4 16 67 16.4 67 17V19C67 19.6 67.4 20 68 20H74C76.8 20 79 22.2 79 25V28H75V25C75 24.4 74.6 24 74 24H68C67.4 24 67 24.4 67 25V28H63V17Z"
        />
        <path
          ref={(el) => {
            if (el) pathsRef.current[4] = el;
          }}
          d="M82 17C82 14.2 84.2 12 87 12H93C95.8 12 98 14.2 98 17V23C98 25.8 95.8 28 93 28H87C84.2 28 82 25.8 82 23V17ZM86 17V23C86 23.6 86.4 24 87 24H93C93.6 24 94 23.6 94 23V17C94 16.4 93.6 16 93 16H87C86.4 16 86 16.4 86 17Z"
        />
        <path
          ref={(el) => {
            if (el) pathsRef.current[5] = el;
          }}
          d="M101 12H117V16H105V18H114V22H105V28H101V12Z"
        />
        <path
          ref={(el) => {
            if (el) pathsRef.current[6] = el;
          }}
          d="M120 12H138V16H131V28H127V16H120V12Z"
        />
      </g>
    </svg>
  );
}

// Animated logo for hero/loading
export function AnimatedLogo({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Subtle pulse animation
    tl.to(containerRef.current, {
      scale: 1.02,
      duration: 1,
      ease: "power2.inOut",
    }).to(containerRef.current, {
      scale: 1,
      duration: 1,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <Logo animated size="lg" />
    </div>
  );
}
