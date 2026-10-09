/**
 * Runtime customization shape (defaults from widget.json + optional per-user overlay).
 */
export type ThemeTokens = {
  accent: string;
  bg: string;
  panel: string;
  text: string;
  muted: string;
  border: string;
};

export type ToolbarAction = {
  id: string;
  label: string;
  enabled?: boolean;
};

export type WidgetCustomization = {
  themeTokens: ThemeTokens;
  layoutSlots: string[];
  featureFlags: Record<string, boolean>;
  toolbar: { actions: ToolbarAction[] };
  extensionHooks: string[];
};

export type UserOverlay = {
  /** Optional display name for this user's customization */
  label?: string;
  themeTokens?: Partial<ThemeTokens>;
  featureFlags?: Record<string, boolean>;
  toolbar?: { actions?: ToolbarAction[] };
  layoutSlots?: string[];
  extensionHooks?: string[];
  settings?: Record<string, unknown>;
};
