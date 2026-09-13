import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Đầu ra của bản dựng Cloudflare/Vercel: JavaScript đã bundle và minify,
    // không phải mã nguồn ta viết. Không loại ra thì `pnpm lint` báo 313 lỗi
    // toàn từ đây, che mất lỗi thật trong src/ và chặn mọi cổng kiểm lint.
    ".open-next/**",
    ".vercel/**",
  ]),
]);

export default eslintConfig;
