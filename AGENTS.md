# Agent instructions (Template-Widget)

This repository is **Template-Widget** — a standalone, agent-friendly **LakeHouse Studio widget** (public). Org identity: [`.lakehouse/org.json`](./.lakehouse/org.json).

**Retired name:** `Template-OpenSource` → `Template-Widget` (see [docs/retired-names.md](./docs/retired-names.md)). Update remotes if your clone still points at the old URL.

Projects created from this template must use **plain repository names** (no `Template-` prefix).

## Dynamic UI/UX — three modes (one codebase)

Read [docs/dynamic-ui.md](./docs/dynamic-ui.md). Example: a **PDF markup** public widget must:

1. Run as a **free standalone website** (`apps/site` → Vercel free / Pages + custom domain)  
2. Load as a **widget** into LakeHouse **desktop (Tauri)** and **web** apps (`dist/widget.js`)  
3. Act as a **reference** agents read to generate **per-user** customizations (overlays) so the tool looks/works differently for each person  

**Prefer overlays/config over forking.** Fork only for deeper structural changes. Declared points: [docs/customization.md](./docs/customization.md) and `widget.json` → `customization`.

## Agent flow — customize for a user (preferred)

1. Read `widget.json` (`customization`, `agentHints`, `ui.slots`, `toolbar`, hooks).  
2. Produce a **user overlay** (themeTokens, layoutSlots, featureFlags, toolbar/actions, extensionHooks) — see `overlays/example.user.json`.  
3. Hand the overlay to the LakeHouse host settings (`overlay` field); do **not** fork unless required.  
4. Validate with `npm run build` and `apps/site/?overlay=example` (or host preview).

## Agent flow — fork / deeper change (fallback)

1. Fork under a plain name.  
2. Edit `src/core/`, `src/entry/`, `apps/site/`, `widget.json` as needed.  
3. Keep brand default **LakeHouse Studio** (dark + accent token). User skins may differ — use `@lakehouse/design-contract`, never hardcode values in widget UI.  
4. Do **not** expand `stubs/widget-sdk/` or `stubs/design-contract/`, or vendor those packages.  
5. Bump **both** `widget.json` and `package.json` versions; add a changeset.  
6. `npm ci && npm run check:all`  
7. Load `dist/widget.js` + `widget.json` into the office.  
8. Open a **draft PR**; Sen merges with a **merge commit**.

### Safe to change

- `src/core/`, `src/entry/`, `apps/site/`, `overlays/`, `widget.json`, `preview/`, docs prose, tests

### Do not change (unless Sen asks)

- `.lakehouse/`, workflow pins, release/OIDC wiring, `stubs/widget-sdk/` / `stubs/design-contract/` beyond TODO replacement, org secrets/settings

## Cost and hosting

- **ZERO COST** on GitHub Free.  
- Public repos: **GitHub-hosted runners only**.  
- Standalone site: Vercel free or GitHub Pages + custom domain from `org.json` (never `*.github.io` as the public hostname).  
- Vercel env vars: team **Shared** vars when a value spans projects; project vars only when unique. See [docs/deploy/vercel.md](./docs/deploy/vercel.md). Org canonical: `{owner}/.github` → `docs/deploy/vercel-env-vars.md`.

## Merge policy

- **Merge commits only**. Prefer small **stacked PRs**. See [CONTRIBUTING.md](./CONTRIBUTING.md).
- **Public** repos (this template): Sen uses the **GitHub merge queue** on `main` (ruleset). See [docs/merge-queue.md](./docs/merge-queue.md). Org canonical: `{owner}/.github` → `docs/merge-queue.md`.
- Agents **never enqueue** or **merge**; Sen does.

## License

- `LICENSE` placeholder until Sen chooses. **Suggested: Apache-2.0.**

## Never do

1. Change repository **visibility**, **settings**, **rulesets**, or **secrets**.  
2. **Force-push** to any branch.  
3. **Delete or rename** repositories, branches, or tags.  
4. **Merge** into `Template-*` or org `.github`.  
5. **Enqueue** a PR into the GitHub merge queue (or otherwise land changes on protected branches).  
6. **Vendor** the real `@lakehouse/widget-sdk` or other monorepo packages.  
7. **Push to an unexpected remote** (`npm run check:remote`).  
8. **Hardcode the GitHub org slug**.  
9. **Create, edit, or delete Vercel environment variables** (including `vercel env add` / `rm` / dashboard edits) without Sen’s **explicit** approval.

## Design contract

- Depend on `@lakehouse/design-contract` (placeholder stub until published). Declare `engines.designContract` in `widget.json`.  
- Widget UI: semantic/component tokens only. Docs: [docs/architecture/design-contract.md](./docs/architecture/design-contract.md).

## Required local checks

```bash
npm install
npm run hooks:install
npm run check:all
npm run preview
npm run site:serve
```

## Widget contract

- [`widget.json`](./widget.json) + [`widget.schema.json`](./widget.schema.json) (temporary — **TODO** use published SDK schema)  
- Guide: [docs/widget.md](./docs/widget.md)

## Ownership

- CODEOWNERS: `@zsenarchitect`  
- Do not merge this template's PR yourself.
