/**
 * Thin public-site shell. Loads the standalone entry (same core as the host widget).
 * Optional: ?overlay=example applies overlays/example.user.json for a demo persona.
 */
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

const overlay = await loadOverlay();
mountStandalone({
  root: document.getElementById("widget-root"),
  title: "Hello Widget",
  greeting: "Hello",
  overlay,
});
