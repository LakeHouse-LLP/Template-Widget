# Env var / secret rotation checklist

Use when rotating a credential that backs a Vercel env var (shared or project).

Org companion (when published): `{owner}/.github` → `docs/deploy/rotation-checklist.md`.

1. [ ] Confirm the **name** (not value) in [secrets-inventory.template.md](./secrets-inventory.template.md) / live inventory in the **owner’s vault**
2. [ ] Generate the new secret in the upstream system (never in chat logs)
3. [ ] Store the new value in the **owner’s vault** first
4. [ ] Sen updates Vercel (team Shared Env Var or project var) for the right environments — agents do **not** run `vercel env add/rm` unless Sen explicitly approves
5. [ ] Prefer rotating Production after Preview/Development verification when the integration allows dual keys
6. [ ] Redeploy affected Preview, then Production
7. [ ] Revoke / delete the old secret upstream
8. [ ] Update “Last rotated” in the inventory (vault + optional repo names-only table)
9. [ ] Confirm Preview/Development still do **not** use production values
