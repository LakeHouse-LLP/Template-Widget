# Brand assets (Template-Widget)

This repo keeps only the brand assets it needs. The **canonical** LakeHouse Studio brand kit (v0.3+) lives in the org `.github` repository:

`{owner}/.github` → `brand/` (BRAND.md, WRITING-STYLE.md, tokens.json, `final/`).

## Local copies

| Path | Use |
| --- | --- |
| [`docs/media/readme-header.svg`](./media/readme-header.svg) / [`.png`](./media/readme-header.png) | README `<picture>` header (AUTO block via `npm run readme:gen`) |
| [`docs/media/social-preview.svg`](./media/social-preview.svg) / [`.png`](./media/social-preview.png) | GitHub social preview candidate |
| [`apps/site/favicon*`](../apps/site/) | Standalone public site favicons |

Do not vendor the full kit or regenerate logos here. Pull updated files from `{owner}/.github/brand/final/` when Sen publishes a new kit version.

## Default theme (design contract)

Preview harness default skin **LakeHouse Studio** uses brand tokens (graphite ramp `#161616`-`#383838`, accent `#7DFFFF`, Geist and Geist Mono). Values live in the `@lakehouse/design-contract` stub theme pack only. See [architecture/design-contract.md](./architecture/design-contract.md).

## Writing style

Copy rules (no em/en dashes, banned hype words): [AGENTS.md](../AGENTS.md) and [CONTRIBUTING.md](../CONTRIBUTING.md). Full guide: `{owner}/.github/brand/WRITING-STYLE.md`. CI: `npm run check:copy`.
