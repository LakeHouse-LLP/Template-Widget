/**
 * Thin public-site shell. Loads the standalone entry (same core as the host widget).
 * Optional: ?overlay=example applies overlays/example.user.json for a demo persona.
 * Optional: ?theme=lake-morning switches the design-contract skin.
 */
import {
  applyTheme,
  DEFAULT_THEME_ID,
  getTheme,
} from "../../stubs/design-contract/index.js";
import { mountStandalone } from "../../dist/standalone.js";

async function loadOverlay() {
  const params = new URLSearchParams(location.search);
  const name = params.get("overlay");
  if (!name) return undefined;
  try {
    const res = await fetch(`../../overlays/${name}.user.json`);
    if (!res.ok) return undefined;
    return await res.json();
  } catch {
    return undefined;
  }
}

const params = new URLSearchParams(location.search);
const themeId = params.get("theme") || DEFAULT_THEME_ID;
applyTheme(document, getTheme(themeId));

const overlay = await loadOverlay();
mountStandalone({
  root: document.getElementById("widget-root"),
  title: "Hello Widget",
  greeting: "Hello",
  overlay,
  themeId,
});
