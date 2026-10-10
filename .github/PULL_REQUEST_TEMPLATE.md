## Summary

<!-- What changed and why (2-5 sentences). -->

## Stack

| | |
| --- | --- |
| Position | <!-- e.g. 1/3 bottom, 2/3 middle, 3/3 top --> |
| Base PR | <!-- link or "targets main" --> |
| Depends on | <!-- PR links, or "none" --> |
| Blocks | <!-- downstream PR links, or "none" --> |

After the parent merges: retarget this PR to `main`, then merge with a **merge commit**.

## What did we learn?

<!-- Required. Friction from this task: wrong docs, flaky CI, missing scripts, etc. -->
<!-- Fix it in this PR when small, or add a dated entry in docs/lessons.md and link it here. -->
<!-- Status reminder: open / fixed / promoted. Repeating lessons get promoted to a rule, script, or CI check. -->

-

## Test evidence

```text
<!-- Commands run and outcomes. Example:
npm run check:all
/tmp/actionlint -color .github/workflows/*.yml
-->
```

## Checklist

- [ ] CHANGELOG.md / changeset updated, **or** `skip-changelog` label applied
- [ ] DCO: every commit has `Signed-off-by:` (`git commit -s`)
- [ ] No self-hosted runners introduced
- [ ] No secrets, client names, CAD binaries, or `.env` files
- [ ] README AUTO blocks regenerated if meta changed (`npm run readme:gen`)
- [ ] Friction noted above and/or logged in [docs/lessons.md](../docs/lessons.md)
- [ ] Maintainer will merge with **Create a merge commit** (not squash / rebase)
