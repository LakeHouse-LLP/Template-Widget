/**
 * Minimal mock LakeHouse host for local preview.
 * Serve repo root (`npm run preview`) so /preview/frame.html can import /dist/widget.js.
 */
const frame = document.getElementById("widget-frame");
const logEl = document.getElementById("log");

function log(line) {
  const stamp = new Date().toISOString().slice(11, 19);
  logEl.textContent = `[${stamp}] ${line}\n` + logEl.textContent;
}

frame.src = "./frame.html";

window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.source !== "lakehouse-widget") return;
  log(`${data.type} ${JSON.stringify(data.payload ?? {})}`);
  if (data.type === "widget.ready") {
    frame.contentWindow?.postMessage(
      { source: "lakehouse-host", type: "host.hello", payload: { version: "0.1.0" } },
      "*",
    );
  }
});

log("iframe sandbox pointed at frame.html");
