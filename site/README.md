# Docs site (Astro Starlight)

LakeHouse Studio **dark-mode-only** docs scaffold with accent token `--lh-accent: #7DFFFF`.

## Why this shape

**Per-repo Starlight seed** for **one org docs hub** on the custom domain from `.lakehouse/org.json` (never `*.github.io`). Justified in `.lakehouse/discoverability.json` → `docsSite.justification`. Matches the monorepo Astro choice; other repos can deep-link into the hub later.

## Commands

```bash
npm ci
npm run dev
npm run build
npm run lhci   # optional free Lighthouse CI budget
```

When `domain` is still `REPLACE_WITH_CUSTOM_DOMAIN`, `astro.config.mjs` leaves `site` unset (build OK; sitemap/canonical activate after Sen sets DNS + domain).
