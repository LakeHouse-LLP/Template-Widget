# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial LakeHouse-LLP public open-source template scaffold (CI, OpenSSF Scorecard, CodeQL, DCO, gitleaks, README autogen, tier and runner guards).

### Fixed

- Remote URL parsing avoids host substring checks (CodeQL).
- Lychee config uses `include_mail = false` (CLI no longer accepts `--exclude-mail`).
- Dependency-review Action deferred until the owner enables Dependency graph (agents do not change settings).

[Unreleased]: https://github.com/LakeHouse-LLP/Template-OpenSource/compare/HEAD...HEAD
