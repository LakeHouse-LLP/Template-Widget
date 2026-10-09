---
title: Widgets
description: Template-Widget — one codebase for public site, in-app embed, and agent-driven per-user customization.
---

This repository **is** a widget (`widget.json` + `src/core` + host/standalone entries).

## Three modes

1. **Standalone website** — `apps/site` (Vercel free / Pages + custom domain)
2. **LakeHouse apps** — `dist/widget.js` in desktop (Tauri) and web hosts
3. **Agent reference** — declared `customization` points + `overlays/` for per-user dynamic UI/UX

Prefer **overlays/config** over forking. Example narrative (PDF markup tool): see repo `docs/dynamic-ui.md`.

- SDK: `@lakehouse/widget-sdk` from the monorepo — until published, local stub under `stubs/widget-sdk/`
- Preview: `npm run preview` / `npm run site:serve`
