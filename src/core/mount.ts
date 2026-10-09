import {
  applyTheme,
  applyThemeTokenOverrides,
  DEFAULT_THEME_ID,
  getTheme,
} from "@lakehouse/design-contract";
import type { WidgetMountContext } from "@lakehouse/widget-sdk";
import { applyOverlay } from "./apply-overlay.js";
import { ensureStyles } from "./styles.js";
import type { UserOverlay } from "./types.js";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

type HostSettings = {
  title?: string;
  overlay?: UserOverlay;
  /** Active design-contract theme id (host injects; preview can switch). */
  themeId?: string;
};

/**
 * Shared widget core used by:
 * - LakeHouse host entry (`src/entry/widget.ts`)
 * - Standalone public site (`src/entry/standalone.ts` → `apps/site`)
 * - Preview mock host
 */
export function mountCore(ctx: WidgetMountContext): () => void {
  const { root, bridge, inputs } = ctx;
  const settings = bridge.getSettings<HostSettings>();
  const customization = applyOverlay(settings.overlay ?? null);

  const themeId = settings.themeId?.trim() || DEFAULT_THEME_ID;
  const theme = getTheme(themeId);
  applyTheme(document, theme);
  applyThemeTokenOverrides(document, customization.themeTokens);
  ensureStyles();

  const greeting =
    typeof inputs.greeting === "string" && inputs.greeting.trim()
      ? inputs.greeting.trim()
      : "Hello";
  const overlayTitle =
    typeof settings.overlay?.settings?.title === "string"
      ? settings.overlay.settings.title
      : "";
  const title = settings.title?.trim() || overlayTitle.trim() || "Hello Widget";
  const showSidebar = Boolean(customization.featureFlags.showSidebar);
  const showStatus = Boolean(customization.featureFlags.showStatusBar);

  const actionsHtml = customization.toolbar.actions
    .map((action) => {
      const enabled =
        action.enabled !== false &&
        (action.id !== "ping" || customization.featureFlags.enablePing) &&
        (action.id !== "export" || customization.featureFlags.enableExport);
      return `<button type="button" data-action="${escapeHtml(action.id)}" ${enabled ? "" : "disabled"}>${escapeHtml(action.label)}</button>`;
    })
    .join("");

  root.innerHTML = `
    <section class="lh-widget" data-widget="hello" data-sidebar="${showSidebar}" data-theme="${escapeHtml(theme.id)}">
      <div class="lh-slot-toolbar" data-slot="toolbar">${actionsHtml}</div>
      <div class="lh-slot-main" data-slot="main">
        <h1>${escapeHtml(String(title))}</h1>
        <p>${escapeHtml(greeting)} from LakeHouse Studio. One codebase → public site, in-app widget, and agent customization reference.</p>
        <p>Theme <code data-theme-label>${escapeHtml(theme.name)}</code> · accent token <code>--color-accent</code> · slots: ${escapeHtml(customization.layoutSlots.join(", "))}</p>
      </div>
      ${
        showSidebar
          ? `<aside class="lh-slot-sidebar" data-slot="sidebar">Sidebar slot — toggle via featureFlags.showSidebar or a user overlay.</aside>`
          : ""
      }
      ${
        showStatus
          ? `<footer class="lh-slot-status" data-slot="status">Hooks: ${escapeHtml(customization.extensionHooks.join(", "))}</footer>`
          : ""
      }
    </section>
  `;

  bridge.postMessage("hook", { name: "onMount", at: new Date().toISOString() });

  const onTheme = bridge.onMessage("host.theme", (payload) => {
    const nextId =
      payload && typeof payload === "object" && "themeId" in payload
        ? String((payload as { themeId?: string }).themeId ?? DEFAULT_THEME_ID)
        : DEFAULT_THEME_ID;
    const nextTheme = getTheme(nextId);
    applyTheme(document, nextTheme);
    applyThemeTokenOverrides(document, customization.themeTokens);
    const section = root.querySelector(".lh-widget");
    if (section) section.setAttribute("data-theme", nextTheme.id);
    const label = root.querySelector("[data-theme-label]");
    if (label) label.textContent = nextTheme.name;
  });

  const onClick = (event: Event) => {
    const target = event.target as HTMLElement | null;
    const action = target?.closest<HTMLButtonElement>("[data-action]")?.dataset.action;
    if (!action) return;
    bridge.postMessage("hook", { name: "onAction", action });
    if (action === "ping") {
      bridge.postMessage("ping", { at: new Date().toISOString() });
    }
  };
  root.addEventListener("click", onClick);
  bridge.reportReady();

  return () => {
    onTheme();
    bridge.postMessage("hook", { name: "onUnmount" });
    root.removeEventListener("click", onClick);
    root.replaceChildren();
  };
}
