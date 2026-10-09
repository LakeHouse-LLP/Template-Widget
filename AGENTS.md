# Agent instructions (public template)

This repository is the **Template-OpenSource** starter for public projects in the org described by [`.lakehouse/org.json`](./.lakehouse/org.json) (brand + mutable `orgName`).

Projects created from this template must use **plain repository names** (no `Template-` prefix). The `Template-` prefix is reserved for template repositories only.

Org runbook / shared defaults: the organization [`.github`](./docs/org.md) repository (`{owner}/.github`, owner from `github.repository_owner` or `org.json`).

## Cost and hosting

- **ZERO COST** on GitHub Free.
- Public repos use **GitHub-hosted runners only**.
- Never introduce paid GitHub features, third-party CI that requires billing, or self-hosted runners.

## Merge policy

- **Merge commits only** (no squash, no rebase-merge on GitHub).
- Prefer small **stacked PRs**, merged bottom-up. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

- `LICENSE` is a placeholder until the owner (Sen / `@zsenarchitect`) chooses.
- **Suggested default: Apache-2.0.** Swapping is documented in `LICENSE` and `docs/license.md`.

## Never do

Agents and automation must **never**:

1. Change repository **visibility**, **settings**, **rulesets**, or **secrets**.
2. **Force-push** to any branch on any remote.
3. **Delete or rename** repositories, branches, or tags.
4. **Merge** into `Template-*` repositories or into the org `.github` repository.
5. **Vendor** shared / org-common code into this tree (link or depend instead).
6. **Push to an unexpected remote** (see `npm run check:remote` / `scripts/check-wrong-remote.mjs`).
7. **Hardcode the GitHub org slug** in workflows, docs, or badges (use `org.json`, `github.repository_owner`, brand, or custom domain).

## Required local checks

```bash
npm install
npm run hooks:install          # gitleaks pre-commit (cross-platform)
npm run check:remote           # WRONG_REMOTE guard
npm run check:tier             # .lakehouse/tier === public and repo is public
npm run check:runners          # fail if any workflow uses runs-on: self-hosted
npm run check:org-slug         # fail on hardcoded org slug outside allowlist
npm run check:pins             # workflow action SHAs match .lakehouse/pins.json
npm run readme:gen             # refresh <!-- AUTO:* --> blocks
npm run citation:gen           # refresh CITATION.cff from org.json
npm run readme:check           # fail when README is stale
```

## README autogen

Hand-written README prose stays short. Generated sections live between:

```html
<!-- AUTO:name -->
...generated...
<!-- /AUTO:name -->
```

Public badges and links use the **custom domain** from `org.json` (never `*.github.io`). CI fails when AUTO blocks are stale. A weekly workflow regenerates them, opens a PR if needed, and runs lychee link checks.

## Discoverability

Follow [docs/discoverability.md](./docs/discoverability.md). Do not change GitHub description/topics/homepage (Sen-only). Run `npm run check:discoverability`.

## Contributors

Community health files: [CONTRIBUTING.md](./CONTRIBUTING.md), [GOVERNANCE.md](./GOVERNANCE.md), [SUPPORT.md](./SUPPORT.md), [ROADMAP.md](./ROADMAP.md), [docs/maintainer-playbook.md](./docs/maintainer-playbook.md). Seed starter issues per [docs/starter-issues.md](./docs/starter-issues.md). Never run fork PR code on self-hosted runners; never pair `pull_request_target` with checkout of PR code.

## Changelog and releases

Every PR must add a **changeset** (`npx changeset`) and/or update `CHANGELOG.md`, **or** carry the `skip-changelog` label.

Release tags (`vX.Y.Z`) are created **only by CI**. Never tag or publish by hand. See [docs/releasing.md](./docs/releasing.md) and [docs/rollback.md](./docs/rollback.md).

## Secrets and client data

- gitleaks runs in pre-commit and in CI (full git history, free CLI).
- Deny-list covers placeholder client/firm names, CAD binaries (`*.rvt`, `*.3dm`, `*.dwg`), `.env` files, and internal hostnames. See `.gitleaks.toml`.

## Ownership

- CODEOWNERS: `@zsenarchitect`
- Do not merge this template's PR yourself; the owner reviews draft PRs.
