/**
 * ============================================================
 *  THÔNG TIN DOANH NGHIỆP — SỬA DUY NHẤT Ở FILE NÀY
 * ============================================================
 *  Mọi nơi trên website (header, footer, contact, JSON-LD, SEO)
 *  đều đọc từ đây. Thay giá trị TODO bên dưới là xong.
 *
 *  Các field để `undefined` sẽ TỰ ĐỘNG ẨN ở mọi nơi:
 *  - JSON-LD không gửi lên Google
 *  - Footer/Contact không hiển thị
 *  - Mobile contact bar ẩn nút tương ứng
 */

/** Type cho thông tin liên hệ, các field có thể undefined */
interface ContactInfo {
  /** Email liên hệ (bắt buộc) */
  email: string;
  /** Số hiển thị cho người đọc, ví dụ: "0912 345 678" */
  phoneDisplay?: string;
  /** Số dạng tel: — không dấu cách, có +84, ví dụ: "+84912345678" */
  phoneTel?: string;
  /** Link Zalo (https://zalo.me/<số điện thoại>) */
  zalo?: string;
  /** Link Facebook Page */
  facebook?: string;
  /**
   * Địa chỉ đầy đủ — để undefined nếu chưa có địa chỉ thật
   * Khi undefined, JSON-LD sẽ không có PostalAddress, footer/contact ẩn địa chỉ
   */
  address?: string;
  city: string;
  country: string;
  workingHours: string;
}

/** Type cho thông tin doanh nghiệp */
interface SiteConfig {
  /** Tên thương hiệu hiển thị */
  name: string;
  /** Tên pháp nhân đầy đủ trên GPKD */
  legalName: string;
  /** Mã số thuế / số GPKD — để undefined nếu chưa có */
  taxId?: string;
  /** Năm thành lập — để undefined nếu chưa có */
  established?: string;
  /** Domain thật, KHÔNG có dấu / ở cuối */
  url: string;
  /** Domain production hiện tại */
  productionUrl: string;
  contact: ContactInfo;
}

export const site: SiteConfig = {
  name: "Linkable",
  legalName: "CÔNG TY TNHH LINKABLE",

  /**
   * TODO: Điền mã số thuế thật vào đây
   * Ví dụ: taxId: "0316123456",
   * Hiện tại để undefined để không hiển thị số giả
   */
  taxId: undefined,

  /**
   * TODO: Điền năm thành lập thật vào đây
   * Ví dụ: established: "2020",
   * Hiện tại để undefined để không hiển thị năm giả
   */
  established: undefined,

  /** Domain thật, KHÔNG có dấu / ở cuối. Canonical, sitemap, hreflang và
   *  dữ liệu gửi Google đều sinh ra từ dòng này. */
  url: "https://apps.linkable.vn",
  /** Domain production hiện tại (Cloudflare Pages). Dùng cho og:image để
   *  đảm bảo crawler truy cập được ảnh. Khi domain chính đã hoạt động thì
   *  đổi lại về site.url. */
  productionUrl: "https://techsoft-landing-9ob.pages.dev",

  contact: {
    email: "support@linkable.vn",

    /**
     * TODO: Điền số điện thoại thật vào đây
     * Ví dụ:
     *   phoneDisplay: "0909 123 456",
     *   phoneTel: "+84909123456",
     * Hiện tại để undefined để không hiển thị số giả
     */
    phoneDisplay: undefined,
    phoneTel: undefined,

    /**
     * TODO: Điền link Zalo thật vào đây
     * Ví dụ: zalo: "https://zalo.me/0909123456",
     * Hiện tại để undefined để không hiển thị link giả
     */
    zalo: undefined,

    facebook: "",

    /**
     * TODO: Điền địa chỉ thật vào đây
     * Ví dụ: address: "Tầng 5, Tòa nhà ABC, 123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
     * Hiện tại để undefined để không hiển thị địa chỉ giả
     */
    address: undefined,
    city: "TP. Hồ Chí Minh",
    country: "VN",
    workingHours: "Thứ 2 - Thứ 7, 8:00 - 18:00",
  },
};

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
