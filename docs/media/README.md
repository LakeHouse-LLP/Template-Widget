# Media convention

Place product screenshots, demo GIFs/MP4s, and README imagery here.

## Layout

| Path | Purpose |
| --- | --- |
| `readme-header.svg` / `readme-header.png` | README `<picture>` header (brand kit v0.3; 1280x320) |
| `social-preview.svg` / `social-preview.png` | 1280x640 repo social preview candidate |
| `screenshots/` | UI stills |
| `demos/` | Short GIF/MP4 walkthroughs |

Standalone site favicons live under [`apps/site/`](../../apps/site/) (`favicon.svg`, `favicon.ico`, sizes). Canonical kit: `{owner}/.github/brand/` (see [docs/brand.md](../brand.md)). Templates keep only the local copies they need under `docs/media/` and `apps/site/`.

## Rules

- **Alt text** required for every informative image in docs/README.
- **No client data**, no placeholder firm names, no confidential project graphics.
- Prefer SVG/PNG for UI; GIF/MP4 for motion demos.
- **Size limits (git):** aim ≤ 1 MB per file in-repo; ≤ 5 MB hard cap.
- Larger media → **Git LFS** or attach to the **GitHub Release** (not the git tree).
- Never use `*.github.io` for canonical media URLs; use the custom domain from `.lakehouse/org.json` when set (not the `REPLACE_WITH_CUSTOM_DOMAIN` placeholder).
