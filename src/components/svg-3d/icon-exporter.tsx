"use client";

import { useCallback, useState } from "react";

interface ExportIconOptions {
  format: "svg" | "png";
  size?: number;
  filename?: string;
  background?: string;
}

export function useIconExporter() {
  const [isExporting, setIsExporting] = useState(false);

  const exportIcon = useCallback(async (
    svgElement: SVGSVGElement | null,
    options: ExportIconOptions = { format: "svg" }
  ) => {
    if (!svgElement) return;
    setIsExporting(true);

    try {
      const { format, size = 512, filename = "icon", background } = options;

      // Clone and prepare SVG
      const clone = svgElement.cloneNode(true) as SVGSVGElement;
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      clone.setAttribute("width", String(size));
      clone.setAttribute("height", String(size));

      if (background) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");
        rect.setAttribute("fill", background);
        clone.insertBefore(rect, clone.firstChild);
      }

      if (format === "svg") {
        const svgString = new XMLSerializer().serializeToString(clone);
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        downloadBlob(blob, `${filename}.svg`);
      } else {
        await exportAsPNG(clone, size, filename);
      }
    } finally {
      setIsExporting(false);
    }
  }, []);

  return { exportIcon, isExporting };
}

async function exportAsPNG(svg: SVGSVGElement, size: number, filename: string) {
  const svgString = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.src = url;
  await new Promise<void>((resolve) => { img.onload = () => resolve(); });

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(img, 0, 0, size, size);
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `${filename}.png`);
    }, "image/png");
  }
  URL.revokeObjectURL(url);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

interface IconExporterProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  iconName: string;
  className?: string;
}

export function IconExporter({ svgRef, iconName, className }: IconExporterProps) {
  const { exportIcon, isExporting } = useIconExporter();
  const [format, setFormat] = useState<"svg" | "png">("png");
  const [size, setSize] = useState(512);

  const handleExport = () => {
    exportIcon(svgRef.current, { format, size, filename: iconName });
  };

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <select value={format} onChange={(e) => setFormat(e.target.value as "svg" | "png")} className="px-2 py-1 text-xs border rounded" disabled={isExporting}>
        <option value="png">PNG</option>
        <option value="svg">SVG</option>
      </select>
      <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="px-2 py-1 text-xs border rounded" disabled={isExporting}>
        <option value="128">128px</option>
        <option value="256">256px</option>
        <option value="512">512px</option>
        <option value="1024">1024px</option>
      </select>
      <button onClick={handleExport} disabled={isExporting} className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50">
        {isExporting ? "..." : "Export"}
      </button>
    </div>
  );
}
