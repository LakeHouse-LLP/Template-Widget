# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial LakeHouse-LLP public open-source template scaffold (CI, OpenSSF Scorecard, CodeQL, DCO, gitleaks, README autogen, tier and runner guards).
- `.lakehouse/org.json` identity (orgName / brand / packageScope / domain) and `.lakehouse/pins.json` action + reusable-workflow catalog.
- Org-slug lint (`check:org-slug`), action-pin check (`check:pins`), and CITATION.cff generation from org.json.
- `docs/org.md` pointing at the organization `.github` runbook.
- Flagship release system: changesets, CI-only `vX.Y.Z` tags, draft GitHub Releases with SHA256 checksums and `attest-build-provenance`, npm OIDC trusted publishing, release-notes template, `.github/release.yml`, `docs/media/` convention, pre-release checklist, and rollback/yank docs.

### Fixed

- Remote URL parsing avoids host substring checks (CodeQL).
- Lychee config uses `include_mail = false` (CLI no longer accepts `--exclude-mail`).
- Dependency-review Action deferred until the owner enables Dependency graph (agents do not change settings).
- Guards, README AUTO badges, and citations no longer hardcode the GitHub org slug (brand + custom domain instead).
- `org.json` domain is `REPLACE_WITH_CUSTOM_DOMAIN` (no assumed hostname); brand set to `LakeHouse`.
- Changeset status on PRs compares against the PR base ref so stacked PRs validate.

[Unreleased]: https://github.com/LakeHouse-LLP/Template-OpenSource/compare/HEAD...HEAD
