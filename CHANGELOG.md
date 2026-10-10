# Changelog

## 0.1.0

### Minor Changes

- [#5](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/pull/5) [`17e04bf`](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/commit/17e04bf7ac0d4b8e4fce0870f9aa57f800f47603) Thanks [@zsenarchitect](https://github.com/zsenarchitect)! - Contributor growth: CONTRIBUTING/Codespaces, GOVERNANCE/ROADMAP, starter issues, listings, maintainer playbook, all-contributors, and SHA-pinned welcome workflow.

- [#3](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/pull/3) [`8b54ff8`](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/commit/8b54ff8ab1fbdc00519583aca695e7c36c998502) Thanks [@zsenarchitect](https://github.com/zsenarchitect)! - Add the flagship public release system: changesets, CI-only `vX.Y.Z` tags, draft GitHub Releases with checksums and build provenance, and npm OIDC trusted publishing.

- [#4](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/pull/4) [`2ff370a`](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/commit/2ff370ae5a33740cc1cb54c8f35e0a82b0c2df8f) Thanks [@zsenarchitect](https://github.com/zsenarchitect)! - Add SEO/discoverability standard, Starlight docs scaffold (dark-only, accent token), CITATION/launch/Sen verification docs, and CI check for README + GitHub description/topics.

- [#6](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/pull/6) [`fb83cac`](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/commit/fb83cacbf7a2b2e3c3c1a1fe95577ff2765088b7) Thanks [@zsenarchitect](https://github.com/zsenarchitect)! - Rework Template-OpenSource into Template-Widget: three-mode dynamic UI/UX (apps/site + host entry + agent overlays), widget.json customization points, hello-world core, mock host preview, contract tests, placeholder @lakehouse/widget-sdk stub, and release assets for the loadable bundle.

### Patch Changes

- [#10](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/pull/10) [`d10bd73`](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/commit/d10bd73a49a487b446139e2ee8fd516c85333547) Thanks [@zsenarchitect](https://github.com/zsenarchitect)! - Apply LakeHouse Studio brand kit v0.3: README header, default theme tokens (graphite ramp, accent, Geist), writing-style copy lint, standalone favicons.

- [#15](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/pull/15) [`64d3679`](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/commit/64d3679d2db4f388b3d1c9723dc615b39ab110a0) Thanks [@zsenarchitect](https://github.com/zsenarchitect)! - Continuous self-improvement house rule: AGENTS.md close-out, docs/lessons.md log, PR template What did we learn? section.

- [#9](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/pull/9) [`15b879b`](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/commit/15b879b41ce51c37f41bb132819d5a0e2ca4d99d) Thanks [@zsenarchitect](https://github.com/zsenarchitect)! - Consume @lakehouse/design-contract (placeholder stub): token-only hello widget, engines.designContract range, hardcoded-values lint, preview default/example skin switch.

- [#14](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/pull/14) [`c84f721`](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/commit/c84f721be988a92d02087f44d9e6b63a27be66d7) Thanks [@zsenarchitect](https://github.com/zsenarchitect)! - Fix main CI: pin changesets/action to v1 for CLI v2; do not fail discoverability strict while GitHub description is still the TEMPLATE placeholder (Sen-only UI).
  Also fix welcome.yml snake_case inputs for first-interaction v3.

- [#8](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/pull/8) [`643710c`](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/commit/643710c65bd65e6a660124ae80d07f7f54282e52) Thanks [@zsenarchitect](https://github.com/zsenarchitect)! - Document GitHub merge queue preference for public Template-Widget (ruleset, merge_group CI, stacked enqueue); agents never enqueue or merge.

- [#7](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/pull/7) [`6337968`](https://github.com/LakeHouse-LLP/Template-LakeHouse-Widget/commit/633796875f6771f61746f4d65fe2d3d3f8313c18) Thanks [@zsenarchitect](https://github.com/zsenarchitect)! - Document Vercel shared vs project env-var rule for the standalone public site, with inventory/rotation templates and AGENTS.md Never-do for vercel env mutations.

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
- Dependabot CI skips also match `pull_request.user.login` so rebases by agents still pass.
- Changesets config: resolve custom changelog via `../scripts/changeset-changelog.mjs` (path is relative to `.changeset/`, required for `@changesets/cli` 3.x).
- Pin `changesets/action` to v2.1.2 alongside `@changesets/cli` 3.x.
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
