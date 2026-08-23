export type ProjectCategory =
  | "landing-page"
  | "web-app"
  | "e-commerce"
  | "dashboard"
  | "corporate";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  year: number;
  client?: string;
  thumbnail: string;
  heroImage: string;
  screenshots: string[];
  techStack: string[];
  features: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

export const categoryLabels: Record<ProjectCategory, { vi: string; en: string }> = {
  "landing-page": { vi: "Landing Page", en: "Landing Page" },
  "web-app": { vi: "Ứng dụng Web", en: "Web Application" },
  "e-commerce": { vi: "Thương mại điện tử", en: "E-commerce" },
  dashboard: { vi: "Dashboard", en: "Dashboard" },
  corporate: { vi: "Doanh nghiệp", en: "Corporate" },
};

// Placeholder image helper - dùng placehold.co
const placeholder = (w: number, h: number, seed: number) =>
  `https://placehold.co/${w}x${h}/1a1a2e/eaeaea?text=Project+${seed}`;

export const projects: Project[] = [
  {
    id: "1",
    slug: "nha-hang-pho-co",
    title: "Nhà hàng Phố Cổ",
    shortDescription: "Website nhà hàng ẩm thực truyền thống với hệ thống đặt bàn online",
    fullDescription:
      "Thiết kế website cho nhà hàng ẩm thực truyền thống Phố Cổ, tích hợp hệ thống đặt bàn online, thực đơn động với hình ảnh chất lượng cao. Giao diện sang trọng, tối ưu trải nghiệm trên điện thoại để khách có thể đặt bàn nhanh chóng.",
    category: "corporate",
    year: 2024,
    client: "Nhà hàng Phố Cổ",
    thumbnail: placeholder(800, 500, 101),
    heroImage: placeholder(1920, 1080, 102),
    screenshots: [
      placeholder(1200, 800, 103),
      placeholder(1200, 800, 104),
      placeholder(1200, 800, 105),
    ],
    techStack: ["WordPress", "Elementor Pro", "WooCommerce", "Custom Booking Plugin"],
    features: [
      "Hệ thống đặt bàn online",
      "Thực đơn động với giá cập nhật",
      "Gallery ảnh món ăn",
      "Tích hợp Google Maps",
      "Form liên hệ tiệc/sự kiện",
    ],
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "2",
    slug: "spa-beauty-care",
    title: "Spa Beauty Care",
    shortDescription: "Landing page spa cao cấp với hệ thống đặt lịch và thanh toán trước",
    fullDescription:
      "Landing page cho chuỗi spa Beauty Care, tập trung vào chuyển đổi khách hàng tiềm năng thành lịch hẹn. Thiết kế thanh lịch, hình ảnh chất lượng cao, form đặt lịch tích hợp lịch làm việc của nhân viên.",
    category: "landing-page",
    year: 2024,
    client: "Beauty Care Spa",
    thumbnail: placeholder(800, 500, 201),
    heroImage: placeholder(1920, 1080, 202),
    screenshots: [
      placeholder(1200, 800, 203),
      placeholder(1200, 800, 204),
    ],
    techStack: ["Next.js", "Tailwind CSS", "Calendly API", "Vercel"],
    features: [
      "Đặt lịch online real-time",
      "Bảng giá dịch vụ chi tiết",
      "Before/After gallery",
      "Tích hợp Zalo OA",
      "Google Analytics 4",
    ],
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "3",
    slug: "phong-kham-nha-khoa",
    title: "Nha khoa Smile Dental",
    shortDescription: "Website phòng khám nha khoa với hệ thống đặt lịch và quản lý bệnh nhân",
    fullDescription:
      "Website chuyên nghiệp cho phòng khám nha khoa, giới thiệu đội ngũ bác sĩ, dịch vụ điều trị, và hệ thống đặt lịch khám. Thiết kế mang lại cảm giác tin tưởng và chuyên nghiệp.",
    category: "corporate",
    year: 2024,
    client: "Nha khoa Smile Dental",
    thumbnail: placeholder(800, 500, 301),
    heroImage: placeholder(1920, 1080, 302),
    screenshots: [
      placeholder(1200, 800, 303),
      placeholder(1200, 800, 304),
      placeholder(1200, 800, 305),
    ],
    techStack: ["WordPress", "Custom Theme", "Booking Calendar", "WPForms"],
    features: [
      "Giới thiệu đội ngũ bác sĩ",
      "Danh mục dịch vụ chi tiết",
      "Đặt lịch khám online",
      "Blog chăm sóc răng miệng",
      "Tích hợp bản đồ và chỉ đường",
    ],
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    id: "4",
    slug: "shop-thoi-trang-mimi",
    title: "Shop thời trang MiMi",
    shortDescription: "Website bán hàng thời trang với thanh toán online và quản lý kho",
    fullDescription:
      "Website thương mại điện tử cho shop thời trang MiMi. Hệ thống quản lý sản phẩm theo size/màu, giỏ hàng thông minh, thanh toán qua VNPay và MoMo, tích hợp vận chuyển GHN/GHTK.",
    category: "e-commerce",
    year: 2023,
    client: "MiMi Fashion",
    thumbnail: placeholder(800, 500, 401),
    heroImage: placeholder(1920, 1080, 402),
    screenshots: [
      placeholder(1200, 800, 403),
      placeholder(1200, 800, 404),
      placeholder(1200, 800, 405),
      placeholder(1200, 800, 406),
    ],
    techStack: ["WordPress", "WooCommerce", "VNPay", "GHTK API"],
    features: [
      "Quản lý size/màu sắc",
      "Thanh toán VNPay, MoMo",
      "Tích hợp vận chuyển tự động",
      "Mã giảm giá, flash sale",
      "Thông báo đơn hàng qua Zalo",
    ],
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "5",
    slug: "bat-dong-san-golden-land",
    title: "Bất động sản Golden Land",
    shortDescription: "Website môi giới bất động sản với bộ lọc nâng cao và bản đồ",
    fullDescription:
      "Website cho công ty môi giới bất động sản, hiển thị danh sách dự án với bộ lọc theo giá, diện tích, vị trí. Tích hợp bản đồ hiển thị vị trí các dự án, form đăng ký nhận thông tin.",
    category: "web-app",
    year: 2023,
    client: "Golden Land Real Estate",
    thumbnail: placeholder(800, 500, 501),
    heroImage: placeholder(1920, 1080, 502),
    screenshots: [
      placeholder(1200, 800, 503),
      placeholder(1200, 800, 504),
      placeholder(1200, 800, 505),
    ],
    techStack: ["Next.js", "Tailwind CSS", "Google Maps API", "Prisma", "PostgreSQL"],
    features: [
      "Bộ lọc BĐS nâng cao",
      "Bản đồ hiển thị vị trí",
      "So sánh dự án",
      "Đăng ký nhận thông tin",
      "Quản trị viên đăng dự án",
    ],
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    id: "6",
    slug: "trung-tam-tieng-anh-english-star",
    title: "English Star Center",
    shortDescription: "Landing page trung tâm tiếng Anh với form đăng ký học thử",
    fullDescription:
      "Landing page cho trung tâm tiếng Anh, tập trung vào thu hút phụ huynh đăng ký cho con học thử miễn phí. Thiết kế sinh động, nội dung rõ ràng về chương trình học, đội ngũ giáo viên.",
    category: "landing-page",
    year: 2024,
    client: "English Star Center",
    thumbnail: placeholder(800, 500, 601),
    heroImage: placeholder(1920, 1080, 602),
    screenshots: [
      placeholder(1200, 800, 603),
      placeholder(1200, 800, 604),
    ],
    techStack: ["HTML/CSS", "JavaScript", "Netlify Forms", "Google Tag Manager"],
    features: [
      "Form đăng ký học thử",
      "Giới thiệu chương trình học",
      "Đội ngũ giáo viên",
      "Testimonials học viên",
      "Facebook Pixel tracking",
    ],
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    id: "7",
    slug: "noi-that-modern-home",
    title: "Nội thất Modern Home",
    shortDescription: "Website công ty nội thất với portfolio dự án và báo giá online",
    fullDescription:
      "Website cho công ty thiết kế nội thất, showcase các dự án đã thực hiện với gallery ảnh chi tiết. Khách hàng có thể xem portfolio và yêu cầu báo giá trực tiếp trên website.",
    category: "corporate",
    year: 2023,
    client: "Modern Home Interior",
    thumbnail: placeholder(800, 500, 701),
    heroImage: placeholder(1920, 1080, 702),
    screenshots: [
      placeholder(1200, 800, 703),
      placeholder(1200, 800, 704),
      placeholder(1200, 800, 705),
    ],
    techStack: ["WordPress", "Custom Theme", "Advanced Custom Fields", "GSAP Animation"],
    features: [
      "Portfolio dự án chi tiết",
      "Gallery ảnh fullscreen",
      "Form yêu cầu báo giá",
      "Blog ý tưởng thiết kế",
      "Trang tuyển dụng",
    ],
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "8",
    slug: "admin-dashboard-crm",
    title: "CRM Dashboard",
    shortDescription: "Dashboard quản lý khách hàng và đơn hàng cho doanh nghiệp",
    fullDescription:
      "Hệ thống CRM tùy chỉnh cho doanh nghiệp vừa và nhỏ. Quản lý khách hàng, pipeline bán hàng, đơn hàng và báo cáo doanh thu. Giao diện trực quan, dễ sử dụng trên cả desktop và tablet.",
    category: "dashboard",
    year: 2024,
    client: "Confidential",
    thumbnail: placeholder(800, 500, 801),
    heroImage: placeholder(1920, 1080, 802),
    screenshots: [
      placeholder(1200, 800, 803),
      placeholder(1200, 800, 804),
      placeholder(1200, 800, 805),
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Express", "PostgreSQL"],
    features: [
      "Quản lý khách hàng",
      "Pipeline bán hàng",
      "Báo cáo doanh thu",
      "Quản lý đơn hàng",
      "Phân quyền người dùng",
    ],
    featured: false,
  },
];

// Helper functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllCategories(): ProjectCategory[] {
  return [...new Set(projects.map((p) => p.category))];
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
