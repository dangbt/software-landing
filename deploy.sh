#!/bin/bash

# ===========================================
# TechSoft - Cloudflare Deployment Script
# ===========================================

echo "🚀 Building Next.js for Cloudflare Pages..."
pnpm build

echo ""
echo "✅ Build complete! Output in ./out folder"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Deploy to Cloudflare Pages:"
echo "   - Go to https://dash.cloudflare.com"
echo "   - Pages > Create a project > Connect to Git"
echo "   - Or use Direct Upload: upload the ./out folder"
echo ""
echo "   Build settings (if using Git):"
echo "   - Build command: pnpm build"
echo "   - Build output directory: out"
echo "   - Root directory: /"
echo ""
echo "2. Deploy Contact API Worker:"
echo "   cd workers/contact-api"
echo "   pnpm install"
echo "   wrangler secret put TELEGRAM_BOT_TOKEN"
echo "   wrangler secret put TELEGRAM_CHAT_ID"
echo "   pnpm deploy"
echo ""
echo "3. Set environment variable in Cloudflare Pages:"
echo "   NEXT_PUBLIC_CONTACT_API_URL = https://techsoft-contact-api.YOUR_SUBDOMAIN.workers.dev"
echo ""
echo "4. Rebuild Pages after setting env variable"
echo ""
