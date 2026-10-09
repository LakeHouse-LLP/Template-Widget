/**
 * TODO(widget-sdk): Temporary local stub — not the real SDK.
 * Replace dependency in root package.json with the published
 * `@lakehouse/widget-sdk` and delete stubs/widget-sdk/.
 */

/**
 * @param {Window} [targetWindow]
 */
export function createBridgeFromWindow(targetWindow = window) {
  const listeners = new Map();

  function onMessage(type, handler) {
    if (!listeners.has(type)) listeners.set(type, new Set());
    listeners.get(type).add(handler);
    return () => listeners.get(type)?.delete(handler);
  }

  function postMessage(type, payload) {
    targetWindow.parent?.postMessage(
      { source: "lakehouse-widget", type, payload },
      "*",
    );
  }

  targetWindow.addEventListener("message", (event) => {
    const data = event.data;
    if (!data || data.source !== "lakehouse-host") return;
    const set = listeners.get(data.type);
    if (!set) return;
    for (const handler of set) handler(data.payload);
  });

  return {
    postMessage,
    onMessage,
    getSettings() {
      return {};
    },
    reportReady() {
      postMessage("widget.ready", { ok: true });
    },
  };
}

/**
 * Minimal caret/comparator SemVer range check for `>=x.y.z <a.b.c`.
 * @param {string} hostVersion
 * @param {string} range
 */
export function isHostCompatible(hostVersion, range) {
  const parsedHost = parseSemver(hostVersion);
  if (!parsedHost) return false;

  const ge = range.match(/>=\s*(\d+\.\d+\.\d+)/);
  const lt = range.match(/<\s*(\d+\.\d+\.\d+)/);
  if (ge) {
    const min = parseSemver(ge[1]);
    if (!min || cmp(parsedHost, min) < 0) return false;
  }
  if (lt) {
    const max = parseSemver(lt[1]);
    if (!max || cmp(parsedHost, max) >= 0) return false;
  }
  return Boolean(ge || lt || range.trim() === "*");
}

function parseSemver(v) {
  const m = String(v).trim().match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!m) return null;
  return { major: Number(m[1]), minor: Number(m[2]), patch: Number(m[3]) };
}

function cmp(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}
