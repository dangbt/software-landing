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

// Kích thước chữ tương ứng với các size
const fontSize = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };
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

  // Khi onDark = true (nền tối cố định như footer), dùng màu gradient sáng hơn
  // để đảm bảo độ tương phản tốt
  if (onDark) {
    return (
      <span
        className={`font-bold ${fontSize[size]} ${className}`}
        style={{
          background: "linear-gradient(135deg, #34d67a 0%, #14b8a6 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        Linkable
      </span>
    );
  }

  // Gradient text tự động đổi màu theo light/dark mode thông qua CSS variable
  return (
    <span className={`font-bold ${fontSize[size]} text-gradient-primary ${className}`}>
      Linkable
    </span>
  );
}
