import { DEFAULT_CUSTOMIZATION } from "./defaults.js";
import type { UserOverlay, WidgetCustomization } from "./types.js";

/**
 * Merge declared defaults with a per-user overlay.
 * Prefer overlays for dynamic UI/UX; fork only when structure must change.
 */
export function applyOverlay(
  overlay: UserOverlay | null | undefined,
  base: WidgetCustomization = DEFAULT_CUSTOMIZATION,
): WidgetCustomization {
  if (!overlay) return structuredClone(base);

  return {
    themeTokens: { ...base.themeTokens, ...overlay.themeTokens },
    layoutSlots: overlay.layoutSlots?.length ? [...overlay.layoutSlots] : [...base.layoutSlots],
    featureFlags: { ...base.featureFlags, ...overlay.featureFlags },
    toolbar: {
      actions: overlay.toolbar?.actions?.length
        ? overlay.toolbar.actions.map((a) => ({ ...a }))
        : base.toolbar.actions.map((a) => ({ ...a })),
    },
    extensionHooks: overlay.extensionHooks?.length
      ? [...overlay.extensionHooks]
      : [...base.extensionHooks],
  };
}
