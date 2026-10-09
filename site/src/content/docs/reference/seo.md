---
title: SEO metadata
description: Sitemap, robots, canonical, Open Graph, Twitter cards, and JSON-LD for the docs site.
---

## Implemented in this scaffold

| Feature | Where |
| --- | --- |
| `sitemap.xml` | `@astrojs/sitemap` when `site` is set from org.json domain |
| `robots.txt` | `public/robots.txt` |
| Canonical / `site` | `astro.config.mjs` reads `.lakehouse/org.json` (never github.io) |
| Open Graph / Twitter | Starlight page `description` + site URL |
| JSON-LD | Organization + SoftwareApplication in `head` |
| Meta descriptions | Frontmatter `description` on every page |
| Dark-only + accent | `src/styles/lakehouse.css` (`--lh-accent: #7DFFFF`) |

## Domain placeholder

While `domain` is `REPLACE_WITH_CUSTOM_DOMAIN`, the Astro `site` option stays unset (build still succeeds). After Sen sets a real domain, rebuild so canonical, sitemap, and OG URLs activate.

## Lighthouse

Optional free budget: `npm run lhci` in `site/` (see root workflow `docs-lighthouse.yml`). Not a paid third-party SEO product.
