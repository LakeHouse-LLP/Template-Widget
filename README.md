# Template-OpenSource

<!-- AUTO:header -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/media/logo-dark.svg" />
  <img src="docs/media/logo-light.svg" alt="LakeHouse" width="320" height="80" />
</picture>
<!-- /AUTO:header -->

⚠ TEMPLATE — open-source project starter for the **LakeHouse** brand (org identity: [`.lakehouse/org.json`](./.lakehouse/org.json)).

Projects created from this template should use a **plain repository name** (no `Template-` prefix).

<!-- AUTO:badges -->
[![CI](https://img.shields.io/badge/CI-domain%20pending-lightgrey)](./docs/org.md)
[![Release](https://img.shields.io/badge/release-domain%20pending-lightgrey)](./docs/org.md)
[![License](https://img.shields.io/badge/license-license%20pending-lightgrey)](./LICENSE)
[![OpenSSF Scorecard](https://img.shields.io/badge/Scorecard-domain%20pending-lightgrey)](./docs/org.md)
<!-- /AUTO:badges -->

<!-- AUTO:toc -->
- [About](#about)
- [Quick start](#quick-start)
- [Releasing](#releasing)
- [Agent rules](#agent-rules)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
<!-- /AUTO:toc -->

## About

<!-- AUTO:repo-meta -->
| | |
| --- | --- |
| Brand | `LakeHouse` |
| Package scope | `@lakehouse` |
| Public domain | `REPLACE_WITH_CUSTOM_DOMAIN` (set a real custom domain in org.json — never assume a hostname; never `*.github.io`) |
| GitHub owner | runtime: `github.repository_owner` or `.lakehouse/org.json` `orgName` |
| Repository | `Template-Widget` |
| Tier | `public` |
| License | `pending` (suggested: Apache-2.0) |
| Code owner | [@zsenarchitect](https://github.com/zsenarchitect) |
| Runners | GitHub-hosted only |
| Merge style | Merge commits only |
| Releases | changesets → CI `vX.Y.Z` tag → draft GH release + npm OIDC |
| Action pins | [`.lakehouse/pins.json`](./.lakehouse/pins.json) |
| Org runbook | `{owner}/.github` (see [docs/org.md](./docs/org.md)) |
<!-- /AUTO:repo-meta -->

Minimal public-template defaults: OpenSSF-aligned CI, README autogen, changelog policy, gitleaks, changesets-driven releases, and guards that keep the org on **GitHub Free** with **GitHub-hosted runners only**. See [docs/org.md](./docs/org.md).

## Quick start

```bash
npm install
npm run hooks:install
npm run readme:gen
npm run citation:gen
npm run check:all
```

## Releasing

Changesets → CI version PR → CI-only `vX.Y.Z` tag → build, checksums, provenance attestations → **draft** GitHub Release → npm OIDC trusted publishing.

- [docs/releasing.md](./docs/releasing.md)
- [docs/pre-release-checklist.md](./docs/pre-release-checklist.md)
- [docs/rollback.md](./docs/rollback.md)
- Media: [docs/media/](./docs/media/)

## Agent rules

See [AGENTS.md](./AGENTS.md) (imported by [CLAUDE.md](./CLAUDE.md)).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for DCO sign-off and the stacked-PR merge-commit workflow.

## Security

See [SECURITY.md](./SECURITY.md).

## License

<!-- AUTO:license-notice -->
License is **pending** owner selection. Suggested default: [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0). See [docs/license.md](./docs/license.md).
<!-- /AUTO:license-notice -->
