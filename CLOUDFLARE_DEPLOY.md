# SmartzConnect — Cloudflare Pages Deployment

## Build Settings (Cloudflare Pages Dashboard)

| Setting | Value |
|---|---|
| **Framework preset** | None (Vite) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave blank — repo root) |
| **Node.js version** | `20` |

---

## Required Environment Variables

Set these in Cloudflare Pages → Settings → Environment Variables → **Production** (and optionally Preview):

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ONESIGNAL_APP_ID=your_onesignal_app_id
VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
VITE_STREAM_API_KEY=your_getstream_api_key
VITE_APP_URL=https://smartzconnect.com
```

> **Note:** Only `VITE_` prefixed variables are needed here — they are embedded into the frontend build. Server-side secrets (OneSignal REST key, Turnstile secret, Stream secret, Resend key) must be set as **Supabase Edge Function secrets** via `supabase secrets set KEY=value`, NOT in Cloudflare.

---

## Cloudflare Pages Setup Steps

1. Go to https://dash.cloudflare.com → **Pages** → **Create a project**
2. Click **Connect to Git** → Select your GitHub repo
3. Set build settings as shown in the table above
4. Add all `VITE_` environment variables
5. Click **Save and Deploy**

---

## SPA Routing

`public/_redirects` contains `/* /index.html 200` — this ensures React Router works on Cloudflare Pages (all routes serve `index.html`).

---

## Security Headers

`public/_headers` configures HTTP security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Long-term caching for `/assets/*`

---

## Custom Domain

Pages → your project → **Custom domains** → Add `smartzconnect.com`

After adding the custom domain:
- OneSignal push notifications will activate (configured for `smartzconnect.com`)
- Cloudflare Turnstile CAPTCHA will activate (configured for `smartzconnect.com`)

---

## Post-Deploy Checklist

- [ ] Add `https://smartzconnect.com` to Supabase → Auth → URL Configuration → Site URL
- [ ] Add `https://smartzconnect.com/**` to Supabase → Auth → Redirect URLs
- [ ] All `VITE_` env vars set in Cloudflare Pages dashboard
- [ ] Server-side secrets set in Supabase Edge Functions (`supabase secrets set`)
- [ ] Enable Cloudflare Web Analytics (free) in Pages settings
- [ ] Enable Cloudflare Bot Fight Mode in Security settings

---

## Important: Remove .env from Git Tracking

The `.env` file is currently git-tracked. Before going live, run:

```bash
git rm --cached .env
git commit -m "chore: stop tracking .env"
git push
```

This ensures your local dev keys are never pushed to GitHub again.
