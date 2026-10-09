# Repository metadata standard

Apply in the GitHub UI (Sen / owners only — agents never change settings).

| Field | Guidance |
| --- | --- |
| Description | One line: product purpose + “(tier: public)” when a template |
| Homepage | `https://` + real `domain` from `.lakehouse/org.json` once set (not `REPLACE_WITH_CUSTOM_DOMAIN`; never `*.github.io`) |
| Topics | `opensource`, brand token, stack tags (`nodejs`, `github-actions`, …); avoid client names |
| Social preview | 1280×640 PNG from `docs/media/social-preview.png` or org `.github/brand/` |
| Releases | Immutable releases on; draft-first workflow |
| Features | Discussions on for announcements; Wikis off unless needed |

Template repos keep the `Template-` prefix; projects created from them use **plain** names.
