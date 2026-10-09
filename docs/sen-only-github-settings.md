# GitHub UI settings only Sen can change

Agents and contributors must not change these via API, UI, or automation unless Sen explicitly directs it in-band.

**TODO:** Prefer the org runbook `{owner}/.github` → `docs/sen-only-github-settings.md` when that draft lands on `main`.

## Per repository (this template / products from it)

- [ ] Description, **8–20 topics**, homepage (custom `domain` — see [discoverability.md](./discoverability.md))
- [ ] Social preview (1280×640 — see [docs/media/social-preview.svg](./media/social-preview.svg))
- [ ] Discussions on + categories (**Ideas**, **Q&A**, **Show and tell**)
- [ ] First-time contributor workflow **approval** required
- [ ] Immutable releases on
- [ ] Tag rulesets for release tags (`v*`)
- [ ] Private vulnerability reporting on
- [ ] Merge commits only (squash/rebase off)
- [ ] npm **OIDC trusted publishing** configured for packages (no long-lived npm tokens)
- [ ] Seed **3–5** `good first issue` / `help wanted` issues ([starter-issues.md](./starter-issues.md))
- [ ] Optional: Hacktoberfest topic (opt-in per year — [contributor-listings.md](./contributor-listings.md))
- [ ] SEO verification / analytics steps ([sen-seo-verification.md](./sen-seo-verification.md))
- [ ] Vercel project + team **Shared Environment Variables** links ([deploy/vercel.md](./deploy/vercel.md)); agents must not mutate env vars without explicit approval

## Also Sen-only

- Repository **visibility** changes
- Org/repo **secrets**, **variables**, and **rulesets**
- Approving merges into `Template-*` and `.github`
- Publishing draft GitHub Releases
- Uploading final **brand** assets
- Vercel env var create/edit/delete (shared or project) unless an agent is given explicit in-band approval

See [AGENTS.md](../AGENTS.md) **Never do** list.
