"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Theo dõi class `dark` trên <html> — nguồn sự thật duy nhất về theme. */
function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export function ThemeToggle() {
  // Đọc thẳng từ DOM thay vì giữ state riêng rồi đồng bộ trong useEffect —
  // cách cũ gây thêm một lượt render và bị React cảnh báo.
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";

    // Chỉ bật transition màu trong lúc đổi theme rồi tắt đi. Trước đây quy tắc
    // transition đặt trên `*` nên chạy suốt, làm hover và animation bị nhoè.
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 300);

    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Trình duyệt chặn localStorage (chế độ ẩn danh) — vẫn đổi được cho phiên này
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
      aria-label={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
    >
      {/* Hiện/ẩn bằng CSS theo class .dark nên không lệch giữa server và trình duyệt */}
      <svg
        className="w-5 h-5 absolute transition-all duration-200 opacity-100 rotate-0 dark:opacity-0 dark:rotate-90"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <svg
        className="w-5 h-5 absolute transition-all duration-200 opacity-0 -rotate-90 dark:opacity-100 dark:rotate-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
