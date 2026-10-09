# Merge queue preference (Template-Widget / public)

Org preference: use the **GitHub merge queue** wherever the plan allows. LakeHouse stays **zero cost** on GitHub Free.

**Canonical org rule** (when published): `{owner}/.github` → `docs/merge-queue.md`  
Resolve `{owner}` from `github.repository_owner` or `.lakehouse/org.json` `orgName` — see [org.md](./org.md). This page is the per-repo application for **Template-Widget**.

## Plan limits (why public vs private differs)

| Repo class | Examples | Merge queue on Free? | Practice |
| --- | --- | --- | --- |
| **Public** | Template-Widget, Template-OpenSource, org `.github`, public widgets/OSS from templates | **Yes** | Require merge queue on `main` via a **branch ruleset**. Merge method: **merge commit** only (never squash/rebase). |
| **Private** | Template-Monorepo, Template-Sandbox, `sandbox-*` / `legacy-*` | **No** (needs Enterprise Cloud) | Manual bottom-up merges with **merge commits**; require an **up-to-date** branch with **green CI** before merging. |

## Public repo ruleset (Sen applies in UI)

Exact clicks: [sen-only-github-settings.md](./sen-only-github-settings.md). Summary for this public template:

1. Branch ruleset targeting `main` (and only `main` for the queue).
2. **Require merge queue** enabled.
3. Allowed merge method: **Merge commit** only (disable squash and rebase).
4. Build concurrency / group size suited to a **small org**:
   - **Max group size ≈ 5** — enough to batch a short stack without one bad PR blocking a large batch.
   - **Merge group wait ≈ 2–5 minutes** — short idle so related stacked landings can group; not so long that merges feel stuck.
5. Required status checks = the workflows that also listen on `merge_group:` (see below).

Agents and contributors **never** enqueue or merge; **Sen** does.

## CI: `merge_group` trigger

Every required workflow must trigger on `merge_group:` **in addition to** `pull_request:` (with **no** `branches:` filter on `pull_request`, so stacked PRs still get CI). Queued merges run those checks on **GitHub-hosted** runners — self-hosted runners never run on public repos.

Local guard: `npm run check:merge-group`.

## Stacked PRs and the queue

Only PRs that **target `main`** enter the merge queue.

1. Merge **bottom-up** (parent/base of the stack first) using the queue when the PR targets `main`.
2. After the parent lands, **retarget** the next PR to `main`.
3. Sen **enqueues** that PR (agents do not).
4. Repeat for the rest of the stack.

Details: [stacked-prs.md](./stacked-prs.md).

## Related

- [CONTRIBUTING.md](../CONTRIBUTING.md) — contributor-facing merge notes  
- [AGENTS.md](../AGENTS.md) — Never-do (no enqueue/merge)  
- [maintainer-playbook.md](./maintainer-playbook.md)
