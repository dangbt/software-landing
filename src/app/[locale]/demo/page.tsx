"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/layout";
import { FadeIn } from "@/components/animations";
import {
  Cube3D,
  Sphere3D,
  Pyramid3D,
  Torus3D,
  Cylinder3D,
  AnimatedScene3D,
  SVGAnimationExporter,
  type AnimatedScene3DRef,
} from "@/components/svg-3d";
import { gsap } from "gsap";

export default function DemoPage() {
  const sceneRef = useRef<AnimatedScene3DRef>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if (isPlaying) {
      sceneRef.current?.pause();
    } else {
      sceneRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    sceneRef.current?.restart();
    setIsPlaying(true);
  };

  // Update refs when scene mounts
  const handleSceneRef = (ref: AnimatedScene3DRef | null) => {
    if (ref) {
      (sceneRef as React.MutableRefObject<AnimatedScene3DRef | null>).current = ref;
      (svgRef as React.MutableRefObject<SVGSVGElement | null>).current = ref.getSVG();
      (timelineRef as React.MutableRefObject<gsap.core.Timeline | null>).current = ref.getTimeline();
    }
  };

  return (
    <section className="py-12">
      <Container>
        <FadeIn>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                SVG 3D Scene with GSAP Animation
              </h1>
              <p className="text-secondary max-w-2xl mx-auto">
                Interactive SVG scene composed from individual 3D shape components.
                Export as static SVG, animated SVG with CSS, or PNG frames for GIF creation.
              </p>
            </div>

            {/* Main Animated Scene */}
            <div className="bg-white rounded-2xl shadow-xl p-4 mb-6 overflow-hidden">
              <AnimatedScene3D
                ref={handleSceneRef}
                width={800}
                height={500}
                className="w-full h-auto mx-auto"
                style={{ maxWidth: "100%" }}
                autoPlay={true}
                duration={2.5}
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-accent rounded-xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayPause}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border hover:border-primary rounded-lg text-sm font-medium transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play
                    </>
                  )}
                </button>
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border hover:border-primary rounded-lg text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Restart
                </button>
              </div>

              <SVGAnimationExporter
                svgRef={svgRef}
                timelineRef={timelineRef}
              />
            </div>

            {/* Individual Components Showcase */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Individual 3D Shape Components
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <ShapeCard title="Cube" color="#06b6d4">
                  <Cube3D size={80} color="#06b6d4" />
                </ShapeCard>
                <ShapeCard title="Sphere" color="#4f46e5">
                  <Sphere3D size={80} color="#4f46e5" />
                </ShapeCard>
                <ShapeCard title="Pyramid" color="#f59e0b">
                  <Pyramid3D size={80} color="#f59e0b" />
                </ShapeCard>
                <ShapeCard title="Torus" color="#ec4899">
                  <Torus3D size={80} color="#ec4899" />
                </ShapeCard>
                <ShapeCard title="Cylinder" color="#10b981">
                  <Cylinder3D size={80} color="#10b981" />
                </ShapeCard>
              </div>
            </div>

            {/* Instructions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Export Options
                </h3>
                <ul className="text-secondary text-sm space-y-2">
                  <li><strong>SVG (Static):</strong> Current frame as vector graphic</li>
                  <li><strong>SVG (Animated):</strong> Includes CSS @keyframes animation</li>
                  <li><strong>PNG:</strong> High-resolution raster image (2x scale)</li>
                  <li><strong>PNG Frames:</strong> 24 frames for external GIF tools</li>
                </ul>
              </div>

              <div className="bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Technical Details
                </h3>
                <ul className="text-secondary text-sm space-y-2">
                  <li><strong>Animation:</strong> GSAP Timeline with yoyo repeat</li>
                  <li><strong>Components:</strong> Individual SVG shapes (forwardRef)</li>
                  <li><strong>Export:</strong> CSS animations embedded in SVG</li>
                  <li><strong>Shapes:</strong> Cube, Sphere, Pyramid, Torus, Cylinder</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

// Shape showcase card
function ShapeCard({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-border p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-center h-20">
        {children}
      </div>
      <span className="text-sm font-medium text-foreground">{title}</span>
      <span className="text-xs text-secondary">{color}</span>
    </div>
  );
}
