"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  CodeIcon3D, ServerIcon3D, CloudIcon3D, MobileIcon3D, RocketIcon3D, GearIcon3D,
  DatabaseIcon3D, ApiIcon3D, SecurityIcon3D, AnalyticsIcon3D, AiIcon3D,
  GitIcon3D, DockerIcon3D, GlobeIcon3D
} from "./icons";

const ALL_ICONS = [
  CodeIcon3D, ServerIcon3D, CloudIcon3D, MobileIcon3D, RocketIcon3D, GearIcon3D,
  DatabaseIcon3D, ApiIcon3D, SecurityIcon3D, AnalyticsIcon3D, AiIcon3D,
  GitIcon3D, DockerIcon3D, GlobeIcon3D
];

interface FloatingIconsProps {
  /** Number of icons to display */
  count?: number;
  /** Opacity of icons */
  opacity?: number;
  /** Size range [min, max] */
  sizeRange?: [number, number];
  className?: string;
}

export function FloatingIcons({
  count = 12,
  opacity = 0.12,
  sizeRange = [40, 90],
  className,
}: FloatingIconsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random positions spread across the entire area
  const items = Array.from({ length: count }, (_, i) => {
    const cols = 4; // Divide into grid columns
    const rows = Math.ceil(count / cols);
    const col = i % cols;
    const row = Math.floor(i / cols);
    
    // Base position from grid + random offset
    const baseLeft = (col / cols) * 100;
    const baseTop = (row / rows) * 100;
    
    return {
      iconIndex: Math.floor(Math.random() * ALL_ICONS.length),
      left: `${baseLeft + Math.random() * (100 / cols) - 5}%`,
      top: `${baseTop + Math.random() * (100 / rows)}%`,
      size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
      delay: Math.random() * 2,
      duration: 2.5 + Math.random() * 2,
      rotation: Math.random() * 20 - 10,
    };
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const icons = containerRef.current.querySelectorAll(".floating-icon");

    const animations = Array.from(icons).map((icon, i) => {
      const item = items[i];
      return gsap.to(icon, {
        y: -12 - Math.random() * 15,
        x: (Math.random() - 0.5) * 15,
        rotation: item.rotation + (Math.random() - 0.5) * 10,
        duration: item.duration,
        delay: item.delay,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    return () => animations.forEach(anim => anim.kill());
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ""}`}
      style={{ zIndex: 0 }}
    >
      {items.map((item, i) => {
        const Icon = ALL_ICONS[item.iconIndex];
        return (
          <div
            key={i}
            className="floating-icon absolute"
            style={{
              left: item.left,
              top: item.top,
              opacity,
              transform: `rotate(${item.rotation}deg)`,
            }}
          >
            <Icon size={item.size} id={`float-${i}-${item.iconIndex}`} />
          </div>
        );
      })}
    </div>
  );
}

/** Full page decoration with many icons */
export function PageDecoration({ count = 16, opacity = 0.08 }: { count?: number; opacity?: number }) {
  return <FloatingIcons count={count} opacity={opacity} sizeRange={[35, 80]} />;
}

/** Section decoration - fewer icons */
export function SectionDecoration({ count = 8, opacity = 0.1 }: { count?: number; opacity?: number }) {
  return <FloatingIcons count={count} opacity={opacity} sizeRange={[40, 70]} />;
}
