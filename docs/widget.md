# Widget template

This repo **is** a LakeHouse widget with **three modes** from one codebase (see [dynamic-ui.md](./dynamic-ui.md)).

## Layout

| Path | Role |
| --- | --- |
| `widget.json` | SemVer manifest + **customization** points + agent hints |
| `widget.schema.json` | Temporary local JSON Schema — **TODO** replace with `@lakehouse/widget-sdk` |
| `src/core/` | Shared widget core |
| `src/entry/widget.ts` | In-app host entry → `dist/widget.js` |
| `src/entry/standalone.ts` | Public site entry → `dist/standalone.js` |
| `apps/site/` | Thin standalone web shell (Vercel/Pages) |
| `overlays/` | Per-user overlay examples |
| `preview/` | Mock host (iframe + postMessage) |
| `stubs/widget-sdk/` | Placeholder SDK — **not** the real SDK |
| `tests/widget-contract.test.mjs` | Contract / host-range / customization tests |
| `dist/` | Build output |

## SDK dependency

Canonical SDK: monorepo `packages/widget-sdk` → npm `@lakehouse/widget-sdk`.

Until publish:

```json
"@lakehouse/widget-sdk": "file:./stubs/widget-sdk"
```

Do **not** vendor the real SDK into this repo.

## Commands

```bash
npm run build          # dist/widget.js + dist/standalone.js + widget.json
npm run check:widget   # schema + engines.lakehouse + version sync
npm test               # contract tests
npm run preview        # mock LakeHouse host
npm run site:serve     # public shell at /apps/site/
```

## Release assets

`npm run release:build` produces the loadable **widget** bundle, `widget.json`, npm pack, and `SHA256SUMS`.
