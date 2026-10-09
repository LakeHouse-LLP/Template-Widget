import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  CONTRACT_VERSION,
  isContractCompatible,
  listThemes,
} from "@lakehouse/design-contract";
import { isHostCompatible } from "@lakehouse/widget-sdk";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function load(rel) {
  return JSON.parse(readFileSync(path.join(root, rel), "utf8"));
}

describe("widget contract", () => {
  it("widget.json matches package version and required identity fields", () => {
    const manifest = load("widget.json");
    const pkg = load("package.json");
    assert.equal(manifest.version, pkg.version);
    assert.match(manifest.id, /^[a-z0-9]+([._-][a-z0-9]+)*$/);
    assert.ok(manifest.entry?.path);
    assert.ok(manifest.ui?.surfaces?.length);
    assert.ok(manifest.engines?.lakehouse);
  });

  it("declares customization points for dynamic UI/UX", () => {
    const manifest = load("widget.json");
    const c = manifest.customization;
    assert.equal(c.preference, "overlay");
    assert.equal(c.forkFallback, true);
    assert.ok(c.themeTokens?.accent);
    assert.match(c.themeTokens.accent, /^--/);
    assert.ok(Array.isArray(c.layoutSlots) && c.layoutSlots.includes("main"));
    assert.equal(typeof c.featureFlags, "object");
    assert.ok(Array.isArray(c.toolbar?.actions));
    assert.ok(Array.isArray(c.extensionHooks) && c.extensionHooks.includes("onMount"));
  });

  it("declares designContract engine range compatible with the stub", () => {
    const manifest = load("widget.json");
    assert.ok(manifest.engines?.designContract);
    assert.equal(
      isContractCompatible(CONTRACT_VERSION, manifest.engines.designContract),
      true,
    );
    const ids = listThemes().map((t) => t.id);
    assert.ok(ids.includes("lakehouse-studio"));
    assert.ok(ids.includes("lake-morning"));
  });

  it("engines.lakehouse accepts the default CI host version", () => {
    const manifest = load("widget.json");
    assert.equal(isHostCompatible("0.1.0", manifest.engines.lakehouse), true);
    assert.equal(isHostCompatible("1.0.0", manifest.engines.lakehouse), false);
    assert.equal(isHostCompatible("0.0.1", manifest.engines.lakehouse), false);
  });

  it("schema file is present and declares temporary TODO provenance", () => {
    const schema = load("widget.schema.json");
    assert.equal(schema.type, "object");
    assert.match(String(schema.description ?? ""), /TODO\(widget-sdk\)/);
    assert.ok(schema.required.includes("customization"));
  });
});
