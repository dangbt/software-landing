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

// Kích thước logo full (dựa trên tỉ lệ gốc 343x64)
const logoHeight = { sm: 24, md: 32, lg: 40 };
const logoWidth = { sm: 129, md: 172, lg: 214 }; // width = height * (343/64)

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

  const w = logoWidth[size];
  const h = logoHeight[size];

  // Logo dạng ảnh thay vì text
  // Dùng 2 thẻ Image, hiện/ẩn dựa vào class dark:
  // - logo-light.png: chữ ĐEN, dùng cho nền SÁNG (light mode)
  // - logo-dark.png: chữ TRẮNG, dùng cho nền TỐI (dark mode, onDark)
  return (
    <span className={`inline-flex shrink-0 ${className}`}>
      {/* Light mode: hiện logo-light (chữ đen trên nền sáng) */}
      <Image
        src="/logo-light.png"
        alt={site.name}
        width={w}
        height={h}
        className={onDark ? "hidden" : "dark:hidden"}
      />
      {/* Dark mode / onDark: hiện logo-dark (chữ trắng trên nền tối) */}
      <Image
        src="/logo-dark.png"
        alt={site.name}
        width={w}
        height={h}
        className={onDark ? "block" : "hidden dark:block"}
      />
    </span>
  );
}
