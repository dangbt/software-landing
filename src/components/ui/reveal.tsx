"use client";

import { useRef, type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

type Props = {
  children: ReactNode;
  /** Hiện ngay khi tải trang thay vì chờ cuộn tới. */
  immediate?: boolean;
  /** Độ trễ giữa các phần tử liền nhau, tính bằng giây. */
  stagger?: number;
};

/**
 * Bọc nội dung tĩnh (server component) để các phần tử `.reveal` bên trong
 * được gỡ ẩn.
 *
 * CSS ẩn mọi `.reveal` khi trang có JS, và chỉ `useReveal` mới gắn
 * `.is-visible` để hiện lại. Trang nào có `.reveal` mà không ai gọi hook thì
 * nội dung kẹt vĩnh viễn ở `opacity: 0` — đúng trường hợp của trang showcase.
 *
 * `display: contents` để lớp bọc không chen vào grid/flex của cha.
 */
export function Reveal({ children, immediate, stagger }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, { immediate, stagger });

  return (
    <div ref={ref} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
