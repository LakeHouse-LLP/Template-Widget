# Lessons log

Short dated notes from agents and humans. After each task, capture friction here when it is not fixed in the same PR (see [AGENTS.md](../AGENTS.md) Continuous self-improvement).

**Promotion rule:** Any lesson that comes up repeatedly gets promoted to a house rule, a script, or a CI check. Mark that entry `promoted` and point at the place it landed.

Status values: `open` | `fixed` | `promoted`

## Entries

### 2026-10-10 - continuous self-improvement house rule

| | |
| --- | --- |
| **Lesson** | Without an explicit close-out step, agents finish the feature and skip recording friction, so the same CI and process footguns return on the next stack. |
| **Action** | Added AGENTS.md continuous self-improvement rule, this log, and a PR template **What did we learn?** section. |
| **Status** | `promoted` (AGENTS.md + PR template + this file) |

### 2026-10-09 - changesets/action v2 vs CLI v2

| | |
| --- | --- |
| **Lesson** | `changesets/action` v2 requires Changesets CLI v3. Pinning action v2 while `@changesets/cli` is still on v2 breaks `version-pr` on `main` after merge. |
| **Action** | Prefer keeping pins.json and the workflow SHA in lockstep with the installed CLI major; fixed on main via #14. |
| **Status** | `fixed` (#14) |

### 2026-10-09 - first-interaction v3 input names

| | |
| --- | --- |
| **Lesson** | `actions/first-interaction` v3 expects snake_case inputs (`issue_message`, `pr_message`, `repo_token`). Kebab-case names fail the welcome workflow. `pull_request_target` runs the workflow file from the **base** branch, so a PR cannot green its own welcome check until main has the fix. |
| **Action** | Ship snake_case `welcome.yml` on the continuous-self-improvement PR (and/or main-ci-fixes #14) so the next merge to main cures it. |
| **Status** | `fixed` (#14 / #15) |

### 2026-10-10 - Dependabot vs changelog and changeset status

| | |
| --- | --- |
| **Lesson** | Dependabot PRs fail `guards` (`check:changelog --strict`) and `version-pr` (`changeset status --since=origin/main`) because they change packages without a CHANGELOG/changeset or `skip-changelog` label. |
| **Action** | Skip those steps when `github.actor == dependabot[bot]`, apply `skip-changelog` in `.github/dependabot.yml`, and skip the welcome job for `*[bot]` actors. |
| **Status** | `fixed` (this PR) |

### 2026-10-10 - skip-changelog label missing on fresh repos

| | |
| --- | --- |
| **Lesson** | `.github/labels.yml` declares `skip-changelog`, but the label is not present on GitHub until synced. Agents get 403 creating labels, so a workflow-only PR cannot rely on that label for `check:changelog`. |
| **Action** | Touch CHANGELOG.md (Unreleased) when the label is missing; prefer syncing labels from labels.yml (Sen) so Dependabot and agents can use `skip-changelog`. |
| **Status** | `open` |

### 2026-10-10 - changesets changelog path is relative to .changeset/

| | |
| --- | --- |
| **Lesson** | Custom `changelog` paths in `.changeset/config.json` resolve from the `.changeset/` directory. `./scripts/...` breaks on `changeset version` (CLI 2 and 3); use `../scripts/changeset-changelog.mjs`. CLI 3 is ESM-only but the existing `.mjs` adapter loads fine once the path is correct. |
| **Action** | Fix the path before merging `@changesets/cli` 3.x; verify with `npx changeset version --snapshot` (do not commit the snapshot). |
| **Status** | `fixed` (this PR) |

### 2026-10-10 - README AUTO stale after remote rename

| | |
| --- | --- |
| **Lesson** | After the GitHub remote name changed to `Template-LakeHouse-Widget`, `readme:check` failed until `npm run readme:gen` refreshed the AUTO Repository row. |
| **Action** | Run `readme:gen` in the same PR when guards fail on AUTO freshness after renames. |
| **Status** | `fixed` (this PR) |

