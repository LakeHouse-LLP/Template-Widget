import type { ThemeTokens } from "./types.js";

export function ensureStyles(tokens: ThemeTokens): void {
  if (typeof document === "undefined") return;
  let style = document.getElementById("lh-widget-styles") as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = "lh-widget-styles";
    document.head.appendChild(style);
  }
  style.textContent = `
:root {
  color-scheme: dark;
  --lh-accent: ${tokens.accent};
  --lh-bg: ${tokens.bg};
  --lh-panel: ${tokens.panel};
  --lh-text: ${tokens.text};
  --lh-muted: ${tokens.muted};
  --lh-border: ${tokens.border};
  font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--lh-bg); color: var(--lh-text); }
.lh-widget {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  background:
    radial-gradient(120% 80% at 10% 0%, color-mix(in srgb, var(--lh-accent) 18%, transparent), transparent 55%),
    var(--lh-panel);
  border: 1px solid var(--lh-border);
}
.lh-widget[data-sidebar="true"] {
  grid-template-columns: 1fr 200px;
  grid-template-areas:
    "toolbar toolbar"
    "main sidebar"
    "status status";
}
.lh-widget[data-sidebar="false"] {
  grid-template-areas:
    "toolbar"
    "main"
    "status";
}
.lh-slot-toolbar { grid-area: toolbar; display: flex; gap: 0.5rem; padding: 0.75rem 1rem; border-bottom: 1px solid var(--lh-border); flex-wrap: wrap; }
.lh-slot-main { grid-area: main; padding: 1.25rem; }
.lh-slot-sidebar { grid-area: sidebar; padding: 1rem; border-left: 1px solid var(--lh-border); color: var(--lh-muted); font-size: 0.9rem; }
.lh-slot-status { grid-area: status; padding: 0.45rem 1rem; border-top: 1px solid var(--lh-border); color: var(--lh-muted); font-size: 0.8rem; }
.lh-slot-main h1 { margin: 0 0 0.35rem; font-size: 1.35rem; letter-spacing: 0.02em; }
.lh-slot-main p { margin: 0 0 1rem; color: var(--lh-muted); line-height: 1.45; }
.lh-widget button {
  appearance: none;
  border: 1px solid color-mix(in srgb, var(--lh-accent) 55%, var(--lh-border));
  background: color-mix(in srgb, var(--lh-accent) 16%, var(--lh-panel));
  color: var(--lh-text);
  padding: 0.45rem 0.8rem;
  cursor: pointer;
  font: inherit;
}
.lh-widget button:hover { border-color: var(--lh-accent); color: var(--lh-accent); }
.lh-widget button:focus-visible { outline: 2px solid var(--lh-accent); outline-offset: 2px; }
.lh-widget button[disabled] { opacity: 0.45; cursor: not-allowed; }
`.trim();
}
