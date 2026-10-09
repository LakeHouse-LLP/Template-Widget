# Vercel deploy — Template-Widget standalone site

Covers the **public free website** mode (`apps/site` + `dist/`). LakeHouse in-app widgets do not deploy here.

**Canonical org rule** (all LakeHouse templates): `{owner}/.github` → `docs/deploy/vercel-env-vars.md`  
Resolve `{owner}` from `github.repository_owner` or `.lakehouse/org.json` `orgName` — see [docs/org.md](../org.md). This file is the per-repo application for Template-Widget; prefer the org doc when that path lands on `main`.

**TODO:** when the org `.github` draft publishes `docs/deploy/vercel-env-vars.md`, keep this page as a thin pointer + Template-Widget specifics only.

## Shared vs project env vars

| Scope | Use when |
| --- | --- |
| **Team Shared Environment Variables** | Value applies to **more than one** Vercel project — create once at team level and **link** into each project |
| **Project env vars** | Value is **unique** to this Template-Widget / product deploy |

Agents must **not** create, edit, or delete Vercel env vars (including `vercel env add` / `rm`) without Sen’s explicit approval — see [AGENTS.md](../../AGENTS.md) **Never do**.

## Naming convention

- `UPPER_SNAKE_CASE`
- Prefix by domain or service when shared, e.g. `LH_SITE_`, `LH_ANALYTICS_`, `GOATCOUNTER_`
- Use `NEXT_PUBLIC_` / `PUBLIC_` **only** for values that are truly public in the browser bundle
- Never put production secrets in names that imply public exposure

## Environments

| Environment | Secrets |
| --- | --- |
| **Production** | Production credentials only; linked shared vars as appropriate |
| **Preview** | Non-production / stub values — **never** production secrets |
| **Development** | Local/dev stubs — **never** production secrets |

## Local development

```bash
# After Sen grants CLI access and links shared vars to this project:
# Pull into a gitignored dotenv file for local use (Vercel’s usual local filename;
# never commit any `.env*` file).
vercel env pull
```

- Writes a **gitignored dotenv file for local development** (project convention; typically the Vercel local env filename)
- **`.env*` is gitignored** (see root `.gitignore`) and never committed
- Enforced by gitleaks deny-list (`.env` paths) — do not weaken that rule

## Auth to cloud providers

Prefer **Vercel OIDC federation** (and similar short-lived federation) over long-lived tokens or static cloud keys whenever the integration supports it.

## Template-Widget project notes

Suggested Vercel project settings (Sen applies in UI):

- **Root / build:** build widget + serve `apps/site` (e.g. build command `npm run build`, output / static root arranged so `apps/site` can load `/dist/standalone.js`)
- **Domain:** custom domain from `.lakehouse/org.json` (never `*.github.io` as the public hostname)
- **Env:** prefer team shared vars for anything reused across templates; project-only for this site’s public analytics site id, etc.

Related: [apps/site/README.md](../../apps/site/README.md), [docs/dynamic-ui.md](../dynamic-ui.md).

## Secrets inventory & rotation

- Inventory template (names only): [secrets-inventory.template.md](./secrets-inventory.template.md)
- Rotation checklist: [rotation-checklist.md](./rotation-checklist.md)
- Important credentials live in the **owner’s vault** (Sen / Google Drive) — docs reference that phrase only; never paste values into the repo
