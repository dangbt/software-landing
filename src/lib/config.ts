// API Configuration
// For Cloudflare deployment, set NEXT_PUBLIC_API_URL to your Worker URL

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const CONTACT_API = `${API_URL}/contact`;
