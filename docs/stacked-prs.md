# Stacked pull requests

Keep each PR small and reviewable. Stack dependent work as a chain of PRs.

## Workflow

1. Open PR1 targeting `main`.
2. Branch PR2 from PR1's branch; open PR2 targeting PR1's branch (not `main` yet).
3. CI must run on every PR in the stack (`pull_request` with **no** `branches:` filter).
4. Merge **bottom-up** using a **merge commit** (never squash/rebase-merge).
5. After PR1 lands on `main`, retarget PR2 to `main` and merge with a merge commit.
6. Repeat for the rest of the stack.

## Checklist

- [ ] Each PR has a focused diff and a CHANGELOG entry (or `skip-changelog`).
- [ ] Commits include a DCO `Signed-off-by:` trailer.
- [ ] Base branch retargeted after the parent merges.
- [ ] No force-push; no rewriting of already-reviewed history on shared branches.
