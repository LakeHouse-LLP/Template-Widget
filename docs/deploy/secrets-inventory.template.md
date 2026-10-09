# Secrets inventory template (names only)

Copy rows as needed. **Never put secret values in this file or the git repo.**  
Source of truth for important credentials: **owner’s vault** (Sen).

Org companion (when published): `{owner}/.github` → `docs/deploy/secrets-inventory.template.md`.

| Name | Scope (`shared` / `project`) | Linked Vercel projects | Environments (`Production` / `Preview` / `Development`) | Owner | Source of truth | Rotation cadence | Last rotated (date) | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `EXAMPLE_PUBLIC_SITE_URL` | project | Template-Widget site | Production, Preview | Sen | owner’s vault / Vercel | n/a (public) | | Truly public; ok in Preview |
| `EXAMPLE_SHARED_ANALYTICS_SITE_ID` | shared | (list linked projects) | Production | Sen | owner’s vault | yearly | | Link via team Shared Env Vars |
| | | | | | | | | |

Rules of thumb:

- Preview / Development columns must not list production secret **names** that are wired with production **values**
- Prefer Vercel OIDC over storing long-lived cloud keys here at all
