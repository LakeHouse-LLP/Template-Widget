import type { WidgetCustomization } from "./types.js";

/** Defaults aligned with widget.json → customization (keep in sync). */
export const DEFAULT_CUSTOMIZATION: WidgetCustomization = {
  themeTokens: {
    accent: "#7DFFFF",
    bg: "#0b0f14",
    panel: "#121821",
    text: "#e8eef5",
    muted: "#9aa7b5",
    border: "#243041",
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
