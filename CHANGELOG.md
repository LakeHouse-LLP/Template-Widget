# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


### Changed

- Brand kit v0.3: README `<picture>` header (`docs/media/readme-header.*`), standalone site favicons, LakeHouse Studio default theme tokens (graphite ramp, accent, Geist / Geist Mono).
- Writing-style rules in AGENTS.md / CONTRIBUTING.md; CI `check:copy` (no em/en dashes, banned filler).

### Added


- Continuous self-improvement house rule: AGENTS.md close-out, [docs/lessons.md](./docs/lessons.md) log, PR template **What did we learn?** section.


- Initial LakeHouse-LLP public open-source template scaffold (CI, OpenSSF Scorecard, CodeQL, DCO, gitleaks, README autogen, tier and runner guards).
- `.lakehouse/org.json` identity (orgName / brand / packageScope / domain) and `.lakehouse/pins.json` action + reusable-workflow catalog.
- Org-slug lint (`check:org-slug`), action-pin check (`check:pins`), and CITATION.cff generation from org.json.
- `docs/org.md` pointing at the organization `.github` runbook.
- Flagship release system: changesets, CI-only `vX.Y.Z` tags, draft GitHub Releases with SHA256 checksums and `attest-build-provenance`, npm OIDC trusted publishing, release-notes template, `.github/release.yml`, `docs/media/` convention, pre-release checklist, and rollback/yank docs.
- SEO/discoverability: `.lakehouse/discoverability.json` standard, README keyword paragraph, social preview, Astro Starlight docs site (dark-only, `#7DFFFF` accent), launch checklist, GoatCounter/Search Console Sen docs, and `check:discoverability` CI.
- Contributor growth: friendly CONTRIBUTING + Codespaces `.devcontainer`, ROADMAP/SUPPORT/GOVERNANCE (no stale bot), starter-issue and listings guides, maintainer playbook, all-contributors README block, and SHA-pinned `welcome` workflow (`actions/first-interaction`).
- Template-Widget rework: `widget.json` + schema, hello-world core/entries, mock host `preview/`, contract tests, placeholder `@lakehouse/widget-sdk` stub, release assets for loadable bundle; retired name Template-OpenSource.
- Three-mode dynamic UI/UX: shared `src/core`, host entry, thin `apps/site` shell, declared customization points (theme/slots/flags/toolbar/hooks), overlays preferred over forking; PDF markup example in docs.
- Vercel env-var rule for standalone site deploy (`docs/deploy/`), linking org `{owner}/.github` canonical doc; AGENTS.md forbids unapproved `vercel env` mutations.
- Merge queue preference for public repos: ruleset on `main`, `merge_group` CI triggers, stacked-PR enqueue flow; private templates stay manual merge commits ([docs/merge-queue.md](./docs/merge-queue.md)).
- Design contract (widget side): `@lakehouse/design-contract` placeholder stub, semantic/component tokens only, `engines.designContract`, hardcoded-values lint, preview theme switch (LakeHouse Studio / Lake Morning).

### Fixed

- Dependabot PRs: skip strict changelog and `changeset status` when `github.actor` is `dependabot[bot]`; apply `skip-changelog` in Dependabot config; skip welcome for bot actors.
- Main CI: pin `changesets/action` to v1.5.3 while `@changesets/cli` stays on v2 (action v2 requires CLI v3).
- Discoverability strict mode no longer fails while the GitHub description is still the TEMPLATE placeholder (Sen-only UI for description/topics).
- Welcome workflow: use snake_case inputs for `actions/first-interaction` v3 (`issue_message` / `pr_message` / `repo_token`).


- Remote URL parsing avoids host substring checks (CodeQL).
- Lychee config uses `include_mail = false` (CLI no longer accepts `--exclude-mail`).
- Dependency-review Action deferred until the owner enables Dependency graph (agents do not change settings).
- Guards, README AUTO badges, and citations no longer hardcode the GitHub org slug (brand + custom domain instead).
- `org.json` domain is `REPLACE_WITH_CUSTOM_DOMAIN` (no assumed hostname); brand set to `LakeHouse`.
- Changeset status on PRs compares against the PR base ref so stacked PRs validate.

[Unreleased]: https://github.com/LakeHouse-LLP/Template-Widget/compare/HEAD...HEAD
