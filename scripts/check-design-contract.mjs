#!/usr/bin/env node
/**
 * Validate widget.json designContract range + default theme contrast (fail).
 * Example skins: contrast warn only.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  CONTRACT_VERSION,
  getTheme,
  isContractCompatible,
  listThemes,
} from "@lakehouse/design-contract";
import { ROOT } from "./lib/repo.mjs";

function loadJson(rel) {
  return JSON.parse(readFileSync(path.join(ROOT, rel), "utf8"));
}

function parseHex(hex) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h.slice(0, 6);
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: Number.parseInt(full.slice(0, 2), 16) / 255,
    g: Number.parseInt(full.slice(2, 4), 16) / 255,
    b: Number.parseInt(full.slice(4, 6), 16) / 255,
  };
}

function channel(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

function contrastRatio(a, b) {
  const L1 = luminance(a);
  const L2 = luminance(b);
  if (L1 == null || L2 == null) return null;
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function themeContrast(theme) {
  const text = theme.cssVars["--color-text-primary"];
  const bg = theme.cssVars["--color-surface-panel"];
  return contrastRatio(text, bg);
}

function main() {
  const manifest = loadJson("widget.json");
  const range = manifest.engines?.designContract;
  if (!range) {
    console.error("check-design-contract: widget.json engines.designContract missing");
    process.exit(1);
  }
  if (!isContractCompatible(CONTRACT_VERSION, range)) {
    console.error(
      `check-design-contract: CONTRACT_VERSION ${CONTRACT_VERSION} incompatible with engines.designContract="${range}"`,
    );
    process.exit(1);
  }

  const pkg = loadJson("package.json");
  const dep = pkg.dependencies?.["@lakehouse/design-contract"];
  if (!dep) {
    console.error("check-design-contract: missing dependency @lakehouse/design-contract");
    process.exit(1);
  }
  if (!String(dep).includes("placeholder") && !String(dep).startsWith("file:")) {
    // published versions ok; placeholder/file stubs expected until monorepo publish
  }

  const defaultTheme = getTheme("lakehouse-studio");
  const defaultRatio = themeContrast(defaultTheme);
  if (defaultRatio == null || defaultRatio < 4.5) {
    console.error(
      `check-design-contract: default theme contrast ${defaultRatio?.toFixed(2) ?? "n/a"} < 4.5 (fail)`,
    );
    process.exit(1);
  }

  for (const meta of listThemes()) {
    if (meta.id === "lakehouse-studio") continue;
    const ratio = themeContrast(getTheme(meta.id));
    if (ratio != null && ratio < 4.5) {
      console.warn(
        `check-design-contract: WARN skin "${meta.id}" contrast ${ratio.toFixed(2)} < 4.5 (user skins warn only)`,
      );
    }
  }

  console.log(
    `OK design-contract: range ${range} matches ${CONTRACT_VERSION}; default contrast ${defaultRatio.toFixed(2)}; dep ${dep}`,
  );
}

main();
