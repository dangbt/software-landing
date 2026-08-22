/**
 * ============================================================
 *  THÔNG TIN DOANH NGHIỆP — SỬA DUY NHẤT Ở FILE NÀY
 * ============================================================
 *  Mọi nơi trên website (header, footer, contact, JSON-LD, SEO)
 *  đều đọc từ đây. Thay giá trị TODO bên dưới là xong.
 */

export const site = {
  /** TODO: tên thương hiệu hiển thị */
  name: "Linkable",
  /** TODO: tên pháp nhân đầy đủ trên GPKD */
  legalName: "CÔNG TY TNHH LINKABLE",
  /** TODO: mã số thuế / số GPKD */
  taxId: "0123456789",
  /** TODO: năm thành lập */
  established: "2019",
  /** TODO: domain thật, KHÔNG có dấu / ở cuối */
  url: "https://linkable.vn",

  contact: {
    /** TODO */
    email: "hello@linkable.vn",
    /** TODO: số hiển thị cho người đọc */
    phoneDisplay: "0912 345 678",
    /** TODO: số dạng tel: — không dấu cách, có +84 */
    phoneTel: "+84912345678",
    /** TODO: link Zalo (https://zalo.me/<số điện thoại>) */
    zalo: "https://zalo.me/0912345678",
    /** TODO: link Facebook Page, để "" nếu chưa có */
    facebook: "",
    /** TODO: địa chỉ đầy đủ */
    address: "123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh",
    city: "TP. Hồ Chí Minh",
    country: "VN",
    workingHours: "Thứ 2 - Thứ 7, 8:00 - 18:00",
  },
} as const;

/**
 * Bảng giá gói trọn gói.
 * TODO: chỉnh `price` theo giá thật của anh.
 * `price` là số nguyên VNĐ — phần hiển thị tự format.
 * Nội dung chữ (tên gói, tính năng) nằm trong src/messages/*.json.
 */
export const pricingPlans = [
  { id: "landing", price: 4_900_000, renewal: 1_200_000, featured: false },
  { id: "business", price: 14_990_000, renewal: 1_500_000, featured: true },
  { id: "commerce", price: 19_900_000, renewal: 2_500_000, featured: false },
] as const;

export type PricingPlan = (typeof pricingPlans)[number];

/** 4.900.000đ */
export function formatVND(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}
