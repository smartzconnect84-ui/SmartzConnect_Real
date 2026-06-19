# SmartzConnect — Cloudflare Pages Deployment

## Build Settings (Cloudflare Pages Dashboard)

| Setting | Value |
|---|---|
| **Framework preset** | None (Vite) |
| **Build command** | `pnpm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave blank if repo root is smartzconnect) |
| **Node.js version** | `20` |

---

## Required Environment Variables

Add these in Cloudflare Pages → Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://ufmuhwepyxzaldvcbipd.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_ONESIGNAL_APP_ID=your_onesignal_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key (optional)
```

---

## Cloudflare Pages Setup Steps

1. Go to https://dash.cloudflare.com → **Pages** → **Create a project**
2. Click **Connect to Git** → Select your GitHub repo
3. Set build settings as above
4. Add environment variables
5. Click **Save and Deploy**

## SPA Routing Fix

The `public/_redirects` file handles React Router — all routes serve `index.html`.

## Custom Domain (Optional)

Pages → your project → **Custom domains** → Add `smartzconnect.com`

---

## Post-Deploy Checklist

- [ ] Add Supabase URL to allowed origins in Supabase Dashboard → Auth → URL Configuration
- [ ] Add your Cloudflare Pages URL to Supabase → Auth → Redirect URLs
- [ ] Set `SITE_URL` in Supabase to your production domain
- [ ] Enable Cloudflare Web Analytics (free) in Pages settings
