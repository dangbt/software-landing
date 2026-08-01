"use client";

import { useCallback, useState } from "react";

interface ExportOptions {
  format: "png" | "svg" | "jpg";
  quality?: number;
  scale?: number;
  filename?: string;
}

export function useCanvasExporter() {
  const [isExporting, setIsExporting] = useState(false);

  const exportCanvas = useCallback(async (
    canvasId: string,
    options: ExportOptions = { format: "png" }
  ) => {
    setIsExporting(true);
    
    try {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (!canvas) {
        throw new Error(`Canvas with id "${canvasId}" not found`);
      }

      const { format, quality = 0.92, scale = 1, filename = "export" } = options;

      // Create a scaled canvas for higher resolution export
      if (scale !== 1) {
        const scaledCanvas = document.createElement("canvas");
        const ctx = scaledCanvas.getContext("2d");
        if (!ctx) throw new Error("Could not get canvas context");
        
        scaledCanvas.width = canvas.width * scale;
        scaledCanvas.height = canvas.height * scale;
        ctx.scale(scale, scale);
        ctx.drawImage(canvas, 0, 0);
        
        return exportCanvasElement(scaledCanvas, { format, quality, filename });
      }

      return exportCanvasElement(canvas, { format, quality, filename });
    } finally {
      setIsExporting(false);
    }
  }, []);

  return { exportCanvas, isExporting };
}

function exportCanvasElement(
  canvas: HTMLCanvasElement,
  { format, quality, filename }: { format: string; quality: number; filename: string }
) {
  return new Promise<string>((resolve, reject) => {
    try {
      let dataUrl: string;
      let mimeType: string;
      let extension: string;

      if (format === "svg") {
        // For SVG, we create an SVG element with the canvas as an embedded image
        const svgContent = canvasToSvg(canvas);
        const blob = new Blob([svgContent], { type: "image/svg+xml" });
        dataUrl = URL.createObjectURL(blob);
        mimeType = "image/svg+xml";
        extension = "svg";
      } else if (format === "jpg") {
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        mimeType = "image/jpeg";
        extension = "jpg";
      } else {
        dataUrl = canvas.toDataURL("image/png");
        mimeType = "image/png";
        extension = "png";
      }

      // Trigger download
      const link = document.createElement("a");
      link.download = `${filename}.${extension}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup blob URL if created
      if (format === "svg") {
        URL.revokeObjectURL(dataUrl);
      }

      resolve(dataUrl);
    } catch (error) {
      reject(error);
    }
  });
}

function canvasToSvg(canvas: HTMLCanvasElement): string {
  const dataUrl = canvas.toDataURL("image/png");
  const width = canvas.width;
  const height = canvas.height;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <image width="${width}" height="${height}" xlink:href="${dataUrl}"/>
</svg>`;
}

interface CanvasExporterProps {
  canvasId: string;
  className?: string;
}

export function CanvasExporter({ canvasId, className }: CanvasExporterProps) {
  const { exportCanvas, isExporting } = useCanvasExporter();
  const [selectedFormat, setSelectedFormat] = useState<"png" | "svg" | "jpg">("png");

  const handleExport = () => {
    exportCanvas(canvasId, {
      format: selectedFormat,
      scale: 2, // 2x resolution for sharper exports
      filename: `techsoft-3d-${Date.now()}`,
    });
  };

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <select
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value as "png" | "svg" | "jpg")}
        className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        disabled={isExporting}
      >
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="svg">SVG</option>
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
            Exporting...
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
  );
}
