/**
 * Địa chỉ Cloudflare Worker nhận form liên hệ.
 *
 * Trước đây URL này bị hardcode trong contact-form.tsx, còn file config lại đọc
 * một tên biến khác với .env.example — nên đổi Worker phải sửa 3 chỗ.
 * Nay chỉ còn một biến duy nhất: NEXT_PUBLIC_CONTACT_API_URL.
 */
export const CONTACT_API =
  process.env.NEXT_PUBLIC_CONTACT_API_URL ||
  // TODO: đổi thành Worker của anh chị, hoặc đặt biến môi trường khi build
  "https://techsoft-api.buitandang96.workers.dev";
