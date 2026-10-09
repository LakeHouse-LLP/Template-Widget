# Agent instructions (LakeHouse-LLP public template)

This repository is the **Template-OpenSource** starter for public projects in the [LakeHouse-LLP](https://github.com/LakeHouse-LLP) GitHub organization.

Projects created from this template must use **plain repository names** (no `Template-` prefix). The `Template-` prefix is reserved for template repositories only.

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

## Required local checks

```bash
npm install
npm run hooks:install          # gitleaks pre-commit (cross-platform)
npm run check:remote           # WRONG_REMOTE guard
npm run check:tier             # .lakehouse/tier === public and repo is public
npm run check:runners          # fail if any workflow uses runs-on: self-hosted
npm run readme:gen             # refresh <!-- AUTO:* --> blocks
npm run readme:check           # fail when README is stale
```

## README autogen

Hand-written README prose stays short. Generated sections live between:

```html
<!-- AUTO:name -->
...generated...
<!-- /AUTO:name -->
```

CI fails when those blocks are stale. A weekly workflow regenerates them, opens a PR if needed, and runs lychee link checks.

## Changelog

Every PR must update `CHANGELOG.md` (Keep a Changelog, `[Unreleased]`) **or** carry the `skip-changelog` label.

## Secrets and client data

- gitleaks runs in pre-commit and in CI (full git history, free CLI).
- Deny-list covers placeholder client/firm names, CAD binaries (`*.rvt`, `*.3dm`, `*.dwg`), `.env` files, and internal hostnames. See `.gitleaks.toml`.

## Ownership

- CODEOWNERS: `@zsenarchitect`
- Do not merge this template's PR yourself; the owner reviews draft PRs.
