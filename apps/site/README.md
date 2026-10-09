# `apps/site` — standalone public web shell

Thin marketing/chrome shell around the **same widget core** used in LakeHouse apps.

## Deploy (zero cost)

1. `npm run build` (repo root) → writes `dist/widget.js` + `dist/standalone.js`
2. Deploy repo root (or this folder + `dist/` + `overlays/`) to **Vercel free** or **GitHub Pages**
3. Point the custom domain from `.lakehouse/org.json` (never `*.github.io` as the public hostname)

## Local

```bash
npm run build
npm run site:serve
```

Open `http://127.0.0.1:4173/apps/site/` — try `?overlay=example` for a per-user overlay demo.
