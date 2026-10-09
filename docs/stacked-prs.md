# Stacked pull requests

Keep each PR small and reviewable. Stack dependent work as a chain of PRs.

## Workflow

1. Open PR1 targeting `main`.
2. Branch PR2 from PR1's branch; open PR2 targeting PR1's branch (not `main` yet).
3. CI must run on every PR in the stack (`pull_request` with **no** `branches:` filter, plus `merge_group` for the queue).
4. Merge **bottom-up** using a **merge commit** (never squash/rebase-merge).
5. **Only PRs targeting `main` enter the merge queue.** After PR1 is ready, Sen enqueues it (agents never enqueue). When it lands, retarget PR2 to `main`, then Sen enqueues PR2.
6. Repeat for the rest of the stack.

See [merge-queue.md](./merge-queue.md) for public vs private plan limits and ruleset settings.

## Checklist

- [ ] Each PR has a focused diff and a CHANGELOG entry (or `skip-changelog`).
- [ ] Commits include a DCO `Signed-off-by:` trailer.
- [ ] Base branch retargeted after the parent merges (queue only applies once the base is `main`).
- [ ] No force-push; no rewriting of already-reviewed history on shared branches.
