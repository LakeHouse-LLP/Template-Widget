# Discoverability standard (GitHub + docs)

Machine-readable source: [`.lakehouse/discoverability.json`](../.lakehouse/discoverability.json).

## Description

- One keyword-rich sentence (80–350 chars).
- Must match `description.expected` exactly (Sen sets in GitHub UI).
- Include brand (**LakeHouse Studio**), AEC surface area, and `(tier: public)` for templates.

## Topics

- **8–20** topics.
- Prefer: `revit`, `rhino`, `grasshopper`, `bim`, `aec`, `architecture`, `indesign`, `design-tools`, plus stack tags (`nodejs`, `typescript`, `opensource`, `template`, `tier-public`, `starlight`).
- Sen applies via repo **Settings → General → Topics** (agents never change settings).

## README

- Keyword-rich **first prose paragraph** (see required keywords in discoverability.json).
- Social preview file at `docs/media/social-preview.svg` (export 1280×640 PNG for GitHub UI if needed).
- Homepage URL = custom domain from org.json when set — **never** `*.github.io`.

## Releases

Regular SemVer releases improve ranking. See [releasing.md](./releasing.md).

## Org `.github` (strategy)

Pinned repos + org profile README strategy: [org-profile.md](./org-profile.md). Copy into `{owner}/.github` when ready.

## CITATION

Keep `CITATION.cff` generated (`npm run citation:gen`).

## Awesome lists

See [awesome-lists.md](./awesome-lists.md).

## CI

```bash
npm run check:discoverability
```

Uses `GITHUB_TOKEN` to read description/topics. Strict on `main`; warns on PRs until Sen applies metadata.
