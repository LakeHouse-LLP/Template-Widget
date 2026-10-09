# Contributing

Thanks for helping improve LakeHouse-LLP public projects.

## Before you start

- Read [AGENTS.md](./AGENTS.md) (especially **Never do**).
- Use GitHub-hosted runners only; keep the project **zero-cost** on GitHub Free.
- Sign off every commit (DCO). Example:

  ```bash
  git commit -s -m "Explain the change"
  ```

## Development setup

```bash
npm install
npm run hooks:install
npm run check:remote
```

## Changelog

Update `CHANGELOG.md` under `[Unreleased]` in the same PR, unless a maintainer applies the `skip-changelog` label.

## Stacked PRs (short guide)

Prefer **small stacked PRs**:

1. Merge the bottom of the stack first, onto `main`, with a **merge commit**.
2. Retarget the next PR to `main`.
3. Continue upward until the stack is landed.

Do not squash-merge or rebase-merge. Full notes: [docs/stacked-prs.md](./docs/stacked-prs.md).

## Pull requests

Use the PR template. Include:

- Stack position (base PR / dependent PRs).
- Test evidence (commands + outcomes).
- DCO sign-off confirmation.
- Reminder that the merge method is **Create a merge commit**.

## License

Contributions are accepted under the license that will be finalized in `LICENSE` (suggested: Apache-2.0). See [docs/license.md](./docs/license.md).

## Security

Report vulnerabilities privately as described in [SECURITY.md](./SECURITY.md).
