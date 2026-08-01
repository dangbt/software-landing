# Deploy to Cloudflare

## Architecture

```
┌─────────────────────┐     ┌─────────────────────┐
│  Cloudflare Pages   │     │  Cloudflare Worker  │
│  (Static Site)      │────▶│  (Contact API)      │
│  techsoft.pages.dev │     │  techsoft-contact-  │
│                     │     │  api.workers.dev    │
└─────────────────────┘     └──────────┬──────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │   Telegram Bot API  │
                            └─────────────────────┘
```

## Step 1: Deploy Contact API Worker

```bash
cd workers/contact-api

# Install dependencies
pnpm install

# Set secrets (you'll be prompted to enter values)
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID

# Deploy
pnpm deploy
```

After deployment, note your Worker URL: `https://techsoft-contact-api.YOUR_SUBDOMAIN.workers.dev`

### Get Telegram Credentials

1. **Bot Token**: Message [@BotFather](https://t.me/BotFather) on Telegram
   - Send `/newbot`
   - Follow prompts to create bot
   - Copy the token

2. **Chat ID**: Message [@userinfobot](https://t.me/userinfobot)
   - It will reply with your user ID
   - Use this as TELEGRAM_CHAT_ID

## Step 2: Deploy Next.js to Cloudflare Pages

### Option A: Git Integration (Recommended)

1. Push code to GitHub/GitLab
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) > Pages
3. Create a project > Connect to Git
4. Configure:
   - **Build command**: `pnpm build`
   - **Build output directory**: `out`
   - **Root directory**: `/`

5. Add environment variable:
   - **Variable name**: `NEXT_PUBLIC_CONTACT_API_URL`
   - **Value**: `https://techsoft-contact-api.YOUR_SUBDOMAIN.workers.dev`

6. Deploy!

### Option B: Direct Upload

```bash
# Build locally
pnpm build

# Upload ./out folder to Cloudflare Pages via Dashboard
```

## Step 3: Update Worker CORS

After Pages deployment, update the Worker's `ALLOWED_ORIGIN`:

```bash
cd workers/contact-api
npx wrangler secret put ALLOWED_ORIGIN
# Enter your Pages URL: https://techsoft.pages.dev
```

Or update `wrangler.toml`:
```toml
[vars]
ALLOWED_ORIGIN = "https://your-project.pages.dev"
```

Then redeploy:
```bash
pnpm deploy
```

## Custom Domain

1. Go to Cloudflare Pages > Your project > Custom domains
2. Add your domain (e.g., `techsoft.dev`)
3. Update DNS if needed
4. Update `ALLOWED_ORIGIN` in Worker to match

## Environment Variables Summary

### Cloudflare Pages
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_CONTACT_API_URL` | Worker API URL | `https://techsoft-contact-api.xxx.workers.dev` |

### Cloudflare Worker (Secrets)
| Variable | Description |
|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | From @BotFather |
| `TELEGRAM_CHAT_ID` | Your Telegram user/group ID |
| `ALLOWED_ORIGIN` | Your Pages URL |

## Troubleshooting

### Form not submitting
- Check browser console for CORS errors
- Verify `NEXT_PUBLIC_CONTACT_API_URL` is set correctly
- Check Worker logs: `wrangler tail`

### Not receiving Telegram messages
- Verify bot token is correct
- Make sure you've messaged the bot at least once
- Check chat ID is correct (use @userinfobot)

### 404 errors on page refresh
- The `_redirects` file should handle this
- If still issues, check Cloudflare Pages settings
