# Org profile & pinned repos (for `{owner}/.github`)

This document is the strategy to place in the organization **`.github`** repository (profile README + org docs). Agents do not change org settings.

## Profile README (`profile/README.md` in `.github`)

- Lead with **LakeHouse Studio** (dark visual, accent `#7DFFFF` when HTML/img allowed).
- One paragraph: AEC open-source — Revit, Rhino, Grasshopper, BIM, design tools.
- Link the custom domain hub (from `org.json` once set), never `*.github.io`.
- Link flagship templates and the docs site.
- Short “how we release” pointer (merge commits, changesets, draft releases).

## Pinned repositories (Sen UI)

Pin 6 repos that tell the story:

1. Flagship public template (this repo)
2. Highest-traffic AEC tool
3. Docs / examples
4. Rhino/Grasshopper utility
5. Revit/BIM utility
6. Org `.github` (standards)

Prefer public, actively released repos. Revisit pins quarterly.

## Topics & descriptions

Every public repo follows [discoverability.md](./discoverability.md) / `.lakehouse/discoverability.json` pattern (8–20 topics, keyword description).
