import Image from "next/image";
import { site } from "@/lib/site";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** "full" = logo chữ Linkable đầy đủ; "mark" = chỉ dấu hiệu vuông (dùng làm avatar). */
  variant?: "full" | "mark";
  /** Đặt true khi logo nằm trên nền tối cố định (footer), không phụ thuộc chế độ sáng/tối. */
  onDark?: boolean;
};

// Kích thước thật của file sau khi tối ưu: logo chữ 343x64, dấu hiệu 240x240.
// Khai báo đúng tỉ lệ để trình duyệt chừa sẵn chỗ, tránh giật layout khi ảnh tải xong.
const fullHeight = { sm: 20, md: 26, lg: 32 };
const markSize = { sm: 26, md: 32, lg: 40 };

export function Logo({ className = "", size = "md", variant = "full", onDark = false }: LogoProps) {
  if (variant === "mark") {
    const s = markSize[size];
    return (
      <Image
        src="/favicon.png"
        alt={site.name}
        width={s}
        height={s}
        className={`shrink-0 rounded-lg ${className}`}
      />
    );
  }

  const h = fullHeight[size];
  const w = Math.round((h * 343) / 64);

  if (onDark) {
    return (
      <Image
        src="/logo-dark.png"
        alt={site.name}
        width={w}
        height={h}
        style={{ height: h, width: "auto" }}
        className={className}
      />
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* Hai bản logo được hiện/ẩn bằng CSS theo class .dark trên <html>.
          Làm bằng CSS thay vì JavaScript nên không bị nháy lúc tải trang
          và không lệch giữa HTML dựng sẵn với trình duyệt. */}
      <Image
        src="/logo-light.png"
        alt={site.name}
        width={w}
        height={h}
        style={{ height: h, width: "auto" }}
        className="block dark:hidden"
        fetchPriority="high"
      />
      <Image
        src="/logo-dark.png"
        alt={site.name}
        width={w}
        height={h}
        style={{ height: h, width: "auto" }}
        className="hidden dark:block"
        fetchPriority="high"
      />
    </span>
  );
}
