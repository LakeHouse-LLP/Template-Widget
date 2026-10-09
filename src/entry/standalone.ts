/**
 * Standalone entry — used by apps/site (public free website).
 * Same widget core; thin shell provides marketing chrome around #widget-root.
 */
import { createBridgeFromWindow } from "@lakehouse/widget-sdk";
import { mountCore } from "../core/mount.js";
import type { UserOverlay } from "../core/types.js";

export type StandaloneOptions = {
  root?: HTMLElement;
  greeting?: string;
  title?: string;
  overlay?: UserOverlay;
  /** design-contract theme id (default LakeHouse Studio). */
  themeId?: string;
};

export function mountStandalone(options: StandaloneOptions = {}): () => void {
  const root =
    options.root ??
    document.getElementById("widget-root") ??
    document.body;

  const overlay = options.overlay;
  const bridge = {
    ...createBridgeFromWindow(window),
    getSettings() {
      return {
        title: options.title ?? "Hello Widget",
        overlay,
        themeId: options.themeId,
      };
    },
  };

  return (
    mountCore({
      root,
      bridge,
      inputs: { greeting: options.greeting ?? "Hello" },
    }) ?? (() => {})
  );
}

export default { mountStandalone };
