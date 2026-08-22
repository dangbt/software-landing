/**
 * Cloudflare Worker for Contact Form API
 * Deploy this as a separate Cloudflare Worker
 * 
 * Environment Variables needed:
 * - TELEGRAM_BOT_TOKEN
 * - TELEGRAM_CHAT_ID
 * - ALLOWED_ORIGIN (your Cloudflare Pages URL)
 */

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  ALLOWED_ORIGIN: string;
}

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  budget?: string;
  services?: string[];
  message?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatTelegramMessage(data: ContactFormData): string {
  const services = data.services?.join(", ") || "Không chọn";
  const phone = data.phone || "Không cung cấp";
  const budget = data.budget || "Không chọn";
  const email = data.email || "Không cung cấp";
  const message = data.message || "Không có mô tả thêm";

  return `
🔔 <b>Yêu cầu liên hệ mới!</b>

👤 <b>Họ tên:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> ${escapeHtml(email)}
📱 <b>SĐT:</b> ${escapeHtml(phone)}
💰 <b>Ngân sách:</b> ${escapeHtml(budget)}
🛠 <b>Dịch vụ:</b> ${escapeHtml(services)}

📝 <b>Nội dung:</b>
${escapeHtml(message)}

⏰ ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
`.trim();
}

async function sendTelegramMessage(env: Env, text: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: "HTML",
        }),
      }
    );
    const result = await response.json() as { ok: boolean };
    return result.ok;
  } catch (error) {
    console.error("Telegram error:", error);
    return false;
  }
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function corsHeaders(origin: string, allowedOrigin: string): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Allow the configured origin or localhost for development
  if (origin === allowedOrigin || origin.includes("localhost")) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin, env.ALLOWED_ORIGIN);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    // Only allow POST
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers }
      );
    }

    try {
      const body = await request.json() as ContactFormData;
      const { name, email, phone, budget, services, message } = body;

      // Validation
      if (!name || name.trim().length < 2) {
        return new Response(
          JSON.stringify({ error: "Vui lòng nhập họ tên hợp lệ" }),
          { status: 400, headers }
        );
      }

      // Khách hàng mảng website thường để lại số điện thoại chứ không phải email,
      // nên số điện thoại là bắt buộc còn email là tuỳ chọn.
      if (!phone || phone.replace(/[^0-9+]/g, "").length < 9) {
        return new Response(
          JSON.stringify({ error: "Vui lòng nhập số điện thoại hợp lệ" }),
          { status: 400, headers }
        );
      }

      if (email && !validateEmail(email)) {
        return new Response(
          JSON.stringify({ error: "Email không hợp lệ" }),
          { status: 400, headers }
        );
      }

      // Send Telegram notification
      const telegramMessage = formatTelegramMessage({
        name: name.trim(),
        email: email?.trim(),
        phone: phone?.trim(),
        budget,
        services,
        message: message?.trim(),
      });

      await sendTelegramMessage(env, telegramMessage);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h."
        }),
        { status: 200, headers }
      );

    } catch (error) {
      console.error("Error:", error);
      return new Response(
        JSON.stringify({ error: "Đã xảy ra lỗi. Vui lòng thử lại sau." }),
        { status: 500, headers }
      );
    }
  },
};
