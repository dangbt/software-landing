"use client";

import { useState, useCallback } from "react";
import { gsap } from "gsap";

interface ExportOptions {
  format: "svg" | "svg-animated" | "png" | "gif-frames";
  filename?: string;
  scale?: number;
  frameCount?: number; // For GIF frames export
  frameDuration?: number; // Duration between frames in seconds
}

export function useSVGExporter() {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const exportSVG = useCallback(
    async (
      svgElement: SVGSVGElement,
      timeline: gsap.core.Timeline | null,
      options: ExportOptions = { format: "svg" }
    ) => {
      setIsExporting(true);
      setProgress(0);

      try {
        const { format, filename = "export", scale = 2, frameCount = 30, frameDuration = 0.1 } = options;

        switch (format) {
          case "svg":
            return exportStaticSVG(svgElement, filename);

          case "svg-animated":
            return exportAnimatedSVG(svgElement, timeline, filename);

          case "png":
            return exportPNG(svgElement, filename, scale);

          case "gif-frames":
            return exportGIFFrames(svgElement, timeline, filename, frameCount, frameDuration, setProgress);

          default:
            throw new Error(`Unknown format: ${format}`);
        }
      } finally {
        setIsExporting(false);
        setProgress(0);
      }
    },
    []
  );

  return { exportSVG, isExporting, progress };
}

// Export static SVG (current state)
function exportStaticSVG(svg: SVGSVGElement, filename: string): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  
  // Add XML declaration and proper namespaces
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

  const svgString = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  downloadFile(url, `${filename}.svg`);
  URL.revokeObjectURL(url);

  return url;
}

// Export SVG with CSS animations embedded
function exportAnimatedSVG(
  svg: SVGSVGElement,
  timeline: gsap.core.Timeline | null,
  filename: string
): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

  // Generate CSS keyframe animations from GSAP timeline
  const styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style");
  
  const cssAnimations = generateCSSAnimations(timeline);
  styleElement.textContent = cssAnimations;

  clone.insertBefore(styleElement, clone.firstChild);

  const svgString = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  downloadFile(url, `${filename}-animated.svg`);
  URL.revokeObjectURL(url);

  return url;
}

// Generate CSS animations based on GSAP timeline
function generateCSSAnimations(timeline: gsap.core.Timeline | null): string {
  const duration = timeline?.duration() || 3;
  
  // Pre-defined animations for common elements
  return `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    
    @keyframes float-rotate {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(10deg); }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.1); opacity: 1; }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-20px) scale(1.05); }
    }

    #shape-sphere { animation: float ${duration}s ease-in-out infinite; }
    #shape-cube { animation: float-rotate ${duration * 0.8}s ease-in-out infinite 0.2s; }
    #shape-pyramid { animation: bounce ${duration * 0.9}s ease-in-out infinite 0.1s; }
    #shape-torus { animation: float-rotate ${duration}s ease-in-out infinite; }
    #shape-cylinder { animation: float ${duration * 0.7}s ease-in-out infinite 0.3s; }
    #shape-small-cube { animation: float-rotate ${duration * 0.85}s ease-in-out infinite 0.15s; }
    #shape-small-sphere { animation: pulse ${duration * 0.75}s ease-in-out infinite 0.25s; }
    
    [id^="dot-"] { animation: pulse ${duration * 0.6}s ease-in-out infinite; }
    #dot-1 { animation-delay: 0s; }
    #dot-2 { animation-delay: 0.1s; }
    #dot-3 { animation-delay: 0.2s; }
    #dot-4 { animation-delay: 0.3s; }
  `;
}

// Export as PNG
async function exportPNG(svg: SVGSVGElement, filename: string, scale: number): Promise<string> {
  const svgString = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.src = url;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  canvas.width = svg.clientWidth * scale || 600 * scale;
  canvas.height = svg.clientHeight * scale || 400 * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.scale(scale, scale);
  ctx.drawImage(img, 0, 0);

  URL.revokeObjectURL(url);

  const pngUrl = canvas.toDataURL("image/png");
  downloadFile(pngUrl, `${filename}.png`);

  return pngUrl;
}

// Export frames for GIF creation (can be combined externally)
async function exportGIFFrames(
  svg: SVGSVGElement,
  timeline: gsap.core.Timeline | null,
  filename: string,
  frameCount: number,
  frameDuration: number,
  setProgress: (p: number) => void
): Promise<string[]> {
  if (!timeline) {
    throw new Error("Timeline required for frame export");
  }

  const totalDuration = timeline.duration();
  const frames: string[] = [];

  // Pause and seek through timeline
  timeline.pause();

  for (let i = 0; i < frameCount; i++) {
    const time = (i / frameCount) * totalDuration;
    timeline.seek(time);

    // Wait for DOM to update
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => setTimeout(r, 50));

    // Capture current frame as PNG
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.src = url;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0, 600, 400);
      const frameUrl = canvas.toDataURL("image/png");
      frames.push(frameUrl);
      
      // Download each frame
      downloadFile(frameUrl, `${filename}-frame-${String(i).padStart(3, "0")}.png`);
    }

    URL.revokeObjectURL(url);
    setProgress(((i + 1) / frameCount) * 100);
  }

  // Resume timeline
  timeline.play();

  return frames;
}

// Helper to download file
function downloadFile(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export Component UI
interface SVGAnimationExporterProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  timelineRef: React.RefObject<gsap.core.Timeline | null>;
  className?: string;
}

export function SVGAnimationExporter({ svgRef, timelineRef, className }: SVGAnimationExporterProps) {
  const { exportSVG, isExporting, progress } = useSVGExporter();
  const [selectedFormat, setSelectedFormat] = useState<ExportOptions["format"]>("svg");

  const handleExport = async () => {
    if (!svgRef.current) return;
    
    await exportSVG(svgRef.current, timelineRef.current, {
      format: selectedFormat,
      filename: `techsoft-3d-${Date.now()}`,
      scale: 2,
      frameCount: 24,
    });
  };

  return (
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      <div className="flex items-center gap-2">
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value as ExportOptions["format"])}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          disabled={isExporting}
        >
          <option value="svg">SVG (Static)</option>
          <option value="svg-animated">SVG (Animated CSS)</option>
          <option value="png">PNG (High-res)</option>
          <option value="gif-frames">PNG Frames (for GIF)</option>
        </select>
        
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {progress > 0 ? `${Math.round(progress)}%` : "Exporting..."}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </>
          )}
        </button>
      </div>

      {/* Format descriptions */}
      <div className="text-xs text-secondary">
        {selectedFormat === "svg" && "Download current state as scalable vector graphic"}
        {selectedFormat === "svg-animated" && "SVG with embedded CSS animations (works in browsers)"}
        {selectedFormat === "png" && "High-resolution raster image (2x scale)"}
        {selectedFormat === "gif-frames" && "Export 24 PNG frames to create GIF externally"}
      </div>
    </div>
  );
}
