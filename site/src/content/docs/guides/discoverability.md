---
title: Discoverability
description: GitHub description, topics, README keywords, and CITATION for LakeHouse Studio templates.
---

Keep the repository findable without paid SEO tools.

## GitHub metadata (Sen-only UI)

Agents never change repo settings. Sen applies:

1. **Description** — exact string in `.lakehouse/discoverability.json` → `description.expected`
2. **Topics** — 8–20 topics from `topics.expected` (Revit, Rhino, Grasshopper, BIM, AEC, …)
3. **Homepage** — `https://` + real domain from `.lakehouse/org.json` (not the placeholder; never `*.github.io`)
4. **Social preview** — upload `docs/media/social-preview.svg` (or PNG export 1280×640)

CI runs `npm run check:discoverability` (API via `GITHUB_TOKEN`).

## README

Keyword-rich first paragraph (AEC + LakeHouse Studio + Revit/Rhino/Grasshopper/BIM). Badge URLs come from org.json domain when set.

## Releases

Ship regular SemVer releases (see repo `docs/releasing.md`). Fresh releases improve GitHub ranking and feed docs changelogs.

## CITATION.cff

Generated from org.json (`npm run citation:gen`). Cite the software in academic/AEC workflows.
