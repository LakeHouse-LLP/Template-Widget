# Customization points (for agents)

LakeHouse widgets are built for **dynamic UI/UX**: the same public codebase should look and behave differently per user when loaded into an office.

## Preference order

1. **Per-user overlay / config** (preferred) — merge onto `widget.json` → `customization` defaults  
2. **Change product defaults** in `widget.json` `customization` (everyone)  
3. **Fork** (fallback) — only when overlays cannot express the change (new capabilities, new backend, new slots that need code)

`customization.preference` is `"overlay"`. `forkFallback` is `true`.

## Declared points (`widget.json` → `customization`)

| Point | Purpose |
| --- | --- |
| `themeTokens` | Maps onto design-contract **semantic** CSS vars (`--color-accent`, surfaces, text). Defaults are token names; overlays may override with concrete values. See [architecture/design-contract.md](./architecture/design-contract.md). |
| `layoutSlots` | Named regions (`toolbar`, `main`, `sidebar`, `status`) |
| `featureFlags` | Toggle optional UI/behavior |
| `toolbar.actions` | Toolbar/action config (`id`, `label`, `enabled`) |
| `extensionHooks` | Named lifecycle hooks agents/host can listen for |
| `overlays` | Where example/user overlay files live |

## Overlay shape

See [`overlays/example.user.json`](../overlays/example.user.json). Hosts pass the overlay via settings (`bridge.getSettings().overlay`). The public shell demo: `apps/site/?overlay=example`.

## What agents may do

- Generate or edit a **user overlay** so the tool looks/works differently for that person  
- Read this repo as a **reference** while generating overlays (do not vendor the SDK)  
- Fork only when the user needs deeper structural changes  

## What agents must not do

- Expand `stubs/widget-sdk/` or `stubs/design-contract/` into real packages (do not vendor)  
- Hardcode colors/sizes/fonts in `src/`, `apps/site/`, or `preview/` (use semantic/component tokens)  
- Change org settings/secrets, or merge `Template-*` PRs  

Brand/marketing default stays **LakeHouse Studio** dark + accent token. **User skins may be light** (see example **Lake Morning**).
