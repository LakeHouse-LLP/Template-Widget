import type { WidgetCustomization } from "./types.js";

/**
 * Defaults aligned with widget.json → customization (keep in sync).
 * themeTokens values are semantic CSS variable *names* from @lakehouse/design-contract
 * (not raw colors). Host themes supply the values; overlays may override with concrete values.
 */
export const DEFAULT_CUSTOMIZATION: WidgetCustomization = {
  themeTokens: {
    accent: "--color-accent",
    bg: "--color-surface-canvas",
    panel: "--color-surface-panel",
    text: "--color-text-primary",
    muted: "--color-text-muted",
    border: "--color-border-default",
  },
  layoutSlots: ["toolbar", "main", "sidebar", "status"],
  featureFlags: {
    showSidebar: true,
    showStatusBar: true,
    enablePing: true,
    enableExport: false,
  },
  toolbar: {
    actions: [
      { id: "ping", label: "Ping host", enabled: true },
      { id: "export", label: "Export", enabled: false },
    ],
  },
  extensionHooks: ["onMount", "onAction", "onUnmount"],
};
