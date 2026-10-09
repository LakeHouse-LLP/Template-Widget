/**
 * Theme packs as data (no fs). Raw values live only here; widgets must use CSS vars.
 * TODO(design-contract): replace with DTCG JSON compiled by the real package.
 *
 * LakeHouse Studio default skin follows brand kit v0.3 (canonical:
 * {owner}/.github/brand). Keep this as the default skin only under the
 * design contract; user skins may diverge.
 */

export const lakehouseStudio = {
  id: "lakehouse-studio",
  name: "LakeHouse Studio",
  contractVersion: "0.1.0",
  colorScheme: "dark",
  description:
    "Brand default theme (kit v0.3): graphite ramp #161616-#383838, accent #7DFFFF, Geist / Geist Mono. Marketing stays dark-only; user skins may diverge.",
  cssVars: {
    "--color-surface-sunken": "#161616",
    "--color-surface-canvas": "#1E1E1E",
    "--color-surface-panel": "#262626",
    "--color-surface-raised": "#2E2E2E",
    "--color-surface-overlay": "#383838",
    "--color-text-primary": "#F2EFE9",
    "--color-text-secondary": "#C7C5C0",
    "--color-text-muted": "#AAA8A4",
    "--color-accent": "#7DFFFF",
    "--color-border-subtle": "#474747",
    "--color-border-default": "#8F8F8F",
    "--font-family-ui":
      '"Geist", "Segoe UI Variable", "SF Pro Text", system-ui, sans-serif',
    "--font-family-mono":
      '"Geist Mono", ui-monospace, "Cascadia Code", "SF Mono", monospace',
    "--font-size-title": "1.35rem",
    "--font-size-body": "1rem",
    "--font-size-small": "0.9rem",
    "--font-size-caption": "0.8rem",
    "--space-2xs": "0.35rem",
    "--space-xs": "0.45rem",
    "--space-sm": "0.5rem",
    "--space-md": "0.75rem",
    "--space-lg": "1rem",
    "--space-xl": "1.25rem",
    "--radius-control": "8px",
    "--size-sidebar": "200px",
    "--size-hairline": "1px",
    "--size-focus-ring": "2px",
    "--size-focus-ring-offset": "2px",
    "--size-shell-widget-min": "420px",
    "--size-shell-lead-max": "52rem",
    "--size-preview-aside": "280px",
    "--size-preview-main-min": "calc(100vh - 5rem)",
    "--size-preview-log-max": "50vh",
    "--breakpoint-preview-stack": "800px",
    "--font-letter-spacing-title": "-0.01em",
    "--font-letter-spacing-label": "0.02em",
    "--font-letter-spacing-caps": "0.04em",
    "--font-line-height-body": "1.5",
    "--state-disabled-opacity": "0.45",
    "--comp-button-bg":
      "color-mix(in srgb, var(--color-accent) 16%, var(--color-surface-panel))",
    "--comp-button-border":
      "color-mix(in srgb, var(--color-accent) 55%, var(--color-border-default))",
    "--comp-button-fg": "var(--color-text-primary)",
    "--comp-button-hover-border": "var(--color-accent)",
    "--comp-button-hover-fg": "var(--color-accent)",
    "--comp-focus-ring": "var(--color-accent)",
    "--comp-shell-gradient":
      "radial-gradient(120% 80% at 10% 0%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 55%)",
  },
};

export const lakeMorning = {
  id: "lake-morning",
  name: "Lake Morning",
  contractVersion: "0.1.0",
  colorScheme: "light",
  description:
    "Example light skin proving a full runtime reskin without rebuild. Not the brand default.",
  cssVars: {
    "--color-surface-sunken": "#E8EEF2",
    "--color-surface-canvas": "#F4F7FA",
    "--color-surface-panel": "#FFFFFF",
    "--color-surface-raised": "#FFFFFF",
    "--color-surface-overlay": "#FFFFFF",
    "--color-text-primary": "#1A2330",
    "--color-text-secondary": "#3D4D5F",
    "--color-text-muted": "#5A6B7D",
    "--color-accent": "#0B7A7A",
    "--color-border-subtle": "#D5DEE7",
    "--color-border-default": "#C9D3DE",
    "--font-family-ui":
      '"Geist", "Segoe UI Variable", "SF Pro Text", system-ui, sans-serif',
    "--font-family-mono":
      '"Geist Mono", ui-monospace, "Cascadia Code", "SF Mono", monospace',
    "--font-size-title": "1.35rem",
    "--font-size-body": "1rem",
    "--font-size-small": "0.9rem",
    "--font-size-caption": "0.8rem",
    "--space-2xs": "0.35rem",
    "--space-xs": "0.45rem",
    "--space-sm": "0.5rem",
    "--space-md": "0.75rem",
    "--space-lg": "1rem",
    "--space-xl": "1.25rem",
    "--radius-control": "8px",
    "--size-sidebar": "200px",
    "--size-hairline": "1px",
    "--size-focus-ring": "2px",
    "--size-focus-ring-offset": "2px",
    "--size-shell-widget-min": "420px",
    "--size-shell-lead-max": "52rem",
    "--size-preview-aside": "280px",
    "--size-preview-main-min": "calc(100vh - 5rem)",
    "--size-preview-log-max": "50vh",
    "--breakpoint-preview-stack": "800px",
    "--font-letter-spacing-title": "-0.01em",
    "--font-letter-spacing-label": "0.02em",
    "--font-letter-spacing-caps": "0.04em",
    "--font-line-height-body": "1.5",
    "--state-disabled-opacity": "0.45",
    "--comp-button-bg":
      "color-mix(in srgb, var(--color-accent) 12%, var(--color-surface-panel))",
    "--comp-button-border":
      "color-mix(in srgb, var(--color-accent) 45%, var(--color-border-default))",
    "--comp-button-fg": "var(--color-text-primary)",
    "--comp-button-hover-border": "var(--color-accent)",
    "--comp-button-hover-fg": "var(--color-accent)",
    "--comp-focus-ring": "var(--color-accent)",
    "--comp-shell-gradient":
      "radial-gradient(120% 80% at 10% 0%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 55%)",
  },
};
