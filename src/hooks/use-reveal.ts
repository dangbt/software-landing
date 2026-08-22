"use client";

import { useEffect, type RefObject } from "react";

type RevealOptions = {
  /** Selector của các phần tử cần hiện dần. Mặc định là mọi `.reveal` bên trong scope. */
  selector?: string;
  /** Độ trễ giữa các phần tử liền nhau, tính bằng giây. */
  stagger?: number;
  /** Chạy ngay khi tải trang thay vì chờ cuộn tới — dùng cho khối hero. */
  immediate?: boolean;
  /** Khoảng lề kích hoạt của IntersectionObserver. */
  rootMargin?: string;
};

/**
 * Hiện dần nội dung khi cuộn tới, bằng IntersectionObserver + CSS transition.
 *
 * Hai điều quan trọng:
 * 1. Nội dung KHÔNG bao giờ kẹt ở trạng thái ẩn — CSS chỉ ẩn `.reveal` khi
 *    <html> có class `js`, và mọi phần tử đều kết thúc ở `.is-visible`.
 * 2. Người bật "giảm chuyển động" thì hiện ngay, không animation.
 */
export function useReveal(
  scopeRef: RefObject<HTMLElement | null>,
  { selector = ".reveal", stagger = 0.08, immediate = false, rootMargin = "0px 0px -12% 0px" }: RevealOptions = {}
) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const items = Array.from(scope.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0) return;

    const show = (el: HTMLElement, index: number) => {
      el.style.transitionDelay = `${index * stagger}s`;
      el.classList.add("is-visible");
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || immediate || typeof IntersectionObserver === "undefined") {
      items.forEach((el, i) => show(el, reducedMotion ? 0 : i));
      return;
    }

    // Đếm thứ tự trong từng đợt để hiệu ứng chạy nối tiếp nhau, không phải
    // theo vị trí trong toàn bộ section (nếu không, phần tử cuối sẽ trễ rất lâu).
    const observer = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement, batchIndex++);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin, threshold: 0.05 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scopeRef, selector, stagger, immediate, rootMargin]);
}
