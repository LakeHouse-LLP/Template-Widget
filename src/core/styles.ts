/**
 * Structural widget styles — semantic/component tokens only (no raw colors/sizes/fonts).
 * Values come from @lakehouse/design-contract themes applied as CSS custom properties.
 */
export function ensureStyles(): void {
  if (typeof document === "undefined") return;
  let style = document.getElementById("lh-widget-styles") as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = "lh-widget-styles";
    document.head.appendChild(style);
  }
  style.textContent = `
:root {
  font-family: var(--font-family-ui);
}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--color-surface-canvas);
  color: var(--color-text-primary);
}
.lh-widget {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  background:
    var(--comp-shell-gradient),
    var(--color-surface-panel);
  border: var(--size-hairline) solid var(--color-border-default);
  border-radius: var(--radius-control);
}
.lh-widget[data-sidebar="true"] {
  grid-template-columns: 1fr var(--size-sidebar);
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
.lh-slot-toolbar {
  grid-area: toolbar;
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  border-bottom: var(--size-hairline) solid var(--color-border-default);
  flex-wrap: wrap;
}
.lh-slot-main { grid-area: main; padding: var(--space-xl); }
.lh-slot-sidebar {
  grid-area: sidebar;
  padding: var(--space-lg);
  border-left: var(--size-hairline) solid var(--color-border-default);
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
}
.lh-slot-status {
  grid-area: status;
  padding: var(--space-xs) var(--space-lg);
  border-top: var(--size-hairline) solid var(--color-border-default);
  color: var(--color-text-muted);
  font-size: var(--font-size-caption);
}
.lh-slot-main h1 {
  margin: 0 0 var(--space-2xs);
  font-size: var(--font-size-title);
  letter-spacing: var(--font-letter-spacing-title);
}
.lh-slot-main p {
  margin: 0 0 var(--space-lg);
  color: var(--color-text-muted);
  line-height: var(--font-line-height-body);
  font-size: var(--font-size-body);
}
.lh-widget button {
  appearance: none;
  border: var(--size-hairline) solid var(--comp-button-border);
  background: var(--comp-button-bg);
  color: var(--comp-button-fg);
  padding: var(--space-xs) var(--space-md);
  cursor: pointer;
  font: inherit;
  border-radius: var(--radius-control);
}
.lh-widget button:hover {
  border-color: var(--comp-button-hover-border);
  color: var(--comp-button-hover-fg);
}
.lh-widget button:focus-visible {
  outline: var(--size-focus-ring) solid var(--comp-focus-ring);
  outline-offset: var(--size-focus-ring-offset);
}
.lh-widget button[disabled] { opacity: var(--state-disabled-opacity); cursor: not-allowed; }
`.trim();
}
