# Media convention

Place product screenshots, demo GIFs/MP4s, and README imagery here.

## Layout

| Path | Purpose |
| --- | --- |
| `logo-light.svg` / `logo-dark.svg` | README `<picture>` header (required placeholders) |
| `logo-light.png` / `logo-dark.png` | Optional raster fallbacks (512px+) |
| `social-preview.png` | 1280×640 repo social preview candidate |
| `screenshots/` | UI stills |
| `demos/` | Short GIF/MP4 walkthroughs |

Org-wide brand masters (palette, usage rules, additional logo sizes) live in the organization `.github` repository under `brand/` — see [docs/org.md](../org.md). Sen uploads final artwork there; templates keep local copies under `docs/media/` as needed.

## Rules

- **Alt text** required for every informative image in docs/README.
- **No client data**, no placeholder firm names, no confidential project graphics.
- Prefer SVG/PNG for UI; GIF/MP4 for motion demos.
- **Size limits (git):** aim ≤ 1 MB per file in-repo; ≤ 5 MB hard cap.
- Larger media → **Git LFS** or attach to the **GitHub Release** (not the git tree).
- Never use `*.github.io` for canonical media URLs; use the custom domain from `.lakehouse/org.json` when set (not the `REPLACE_WITH_CUSTOM_DOMAIN` placeholder).
