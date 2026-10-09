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

  ensureStyles(customization.themeTokens);

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
    <section class="lh-widget" data-widget="hello" data-sidebar="${showSidebar}">
      <div class="lh-slot-toolbar" data-slot="toolbar">${actionsHtml}</div>
      <div class="lh-slot-main" data-slot="main">
        <h1>${escapeHtml(String(title))}</h1>
        <p>${escapeHtml(greeting)} from LakeHouse Studio. One codebase → public site, in-app widget, and agent customization reference.</p>
        <p>Accent token <code>${escapeHtml(customization.themeTokens.accent)}</code> · slots: ${escapeHtml(customization.layoutSlots.join(", "))}</p>
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
    bridge.postMessage("hook", { name: "onUnmount" });
    root.removeEventListener("click", onClick);
    root.replaceChildren();
  };
}
