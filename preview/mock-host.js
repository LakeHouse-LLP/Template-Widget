/**
 * Minimal mock LakeHouse host for local preview.
 * Serve repo root (`npm run preview`) so /preview/frame.html can import /dist/widget.js.
 * Theme switch: default LakeHouse Studio vs example Lake Morning skin.
 */
import {
  applyTheme,
  DEFAULT_THEME_ID,
  getTheme,
  listThemes,
} from "../stubs/design-contract/index.js";

const frame = document.getElementById("widget-frame");
const logEl = document.getElementById("log");
const themeSelect = document.getElementById("theme-select");

let themeId = DEFAULT_THEME_ID;

function log(line) {
  const stamp = new Date().toISOString().slice(11, 19);
  logEl.textContent = `[${stamp}] ${line}\n` + logEl.textContent;
}

function applyHostTheme() {
  applyTheme(document, getTheme(themeId));
}

function loadFrame() {
  frame.src = `./frame.html?theme=${encodeURIComponent(themeId)}`;
}

function postTheme() {
  frame.contentWindow?.postMessage(
    { source: "lakehouse-host", type: "host.theme", payload: { themeId } },
    "*",
  );
}

const themes = listThemes();
themeSelect.replaceChildren(
  ...themes.map((t) => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = `${t.name}${t.id === DEFAULT_THEME_ID ? " (default)" : " (example skin)"}`;
    return opt;
  }),
);
themeSelect.value = themeId;
applyHostTheme();
loadFrame();

themeSelect.addEventListener("change", () => {
  themeId = themeSelect.value || DEFAULT_THEME_ID;
  applyHostTheme();
  loadFrame();
  log(`theme → ${themeId}`);
});

window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.source !== "lakehouse-widget") return;
  log(`${data.type} ${JSON.stringify(data.payload ?? {})}`);
  if (data.type === "widget.ready") {
    frame.contentWindow?.postMessage(
      { source: "lakehouse-host", type: "host.hello", payload: { version: "0.1.0" } },
      "*",
    );
    postTheme();
  }
});

log("iframe sandbox pointed at frame.html");
log(`themes: ${themes.map((t) => t.id).join(", ")}`);
