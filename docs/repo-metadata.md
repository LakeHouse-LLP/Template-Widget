# Repository metadata standard

Apply in the GitHub UI (Sen / owners only — agents never change settings).

Canonical expected values: [`.lakehouse/discoverability.json`](../.lakehouse/discoverability.json). Full guide: [discoverability.md](./discoverability.md).

| Field | Guidance |
| --- | --- |
| Description | Exact `description.expected` from discoverability.json (keyword-rich, 80–350 chars, include `(tier: public)` for templates) |
| Homepage | `https://` + real `domain` from `.lakehouse/org.json` once set (not `REPLACE_WITH_CUSTOM_DOMAIN`; never `*.github.io`) |
| Topics | 8–20 from `topics.expected` — include `revit`, `rhino`, `grasshopper`, `bim`, `aec`, `architecture`, `indesign`, `design-tools` as relevant |
| Social preview | Upload 1280×640 from `docs/media/social-preview.svg` (or PNG export) |
| Releases | Immutable releases on; draft-first; release regularly for ranking |
| Features | Discussions on for announcements; Wikis off unless needed |

Template repos keep the `Template-` prefix; projects created from them use **plain** names.
