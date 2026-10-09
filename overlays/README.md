# Per-user overlays

Declared customization for **dynamic UI/UX** without forking.

- Defaults live in `widget.json` → `customization`.
- Agents (and the LakeHouse host) should prefer writing/merging a user overlay over changing source.
- Fork the repo only when overlays cannot express the change (new slots, new capabilities, new backend).

Example: [`example.user.json`](./example.user.json) — load in the public shell with `apps/site/?overlay=example`.
