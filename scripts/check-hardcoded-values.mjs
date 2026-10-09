#!/usr/bin/env node
/**
 * Fail when widget/app UI sources hardcode colors, sizes, or fonts.
 * Raw values belong in @lakehouse/design-contract theme packs only.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./lib/repo.mjs";

const SCAN_ROOTS = ["src", "apps/site", "preview"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".html"]);

/** Paths relative to ROOT that may hold raw design values. */
const ALLOW_PATH_PREFIXES = [
  "stubs/design-contract/",
  "overlays/",
  "docs/",
  "site/", // Starlight brand marketing (dark-only) — separate from widget contract
];

const HEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;
const RGB_HSL = /\b(?:rgb|rgba|hsl|hsla)\s*\(/i;
/** Hardcoded font-family (tokenized `font-family: var(--…)` is allowed). */
const FONT_FAMILY_LINE = /font-family\s*:/i;
const FONT_FAMILY_TOKENIZED = /font-family\s*:\s*var\s*\(/i;
/** Bare lengths in CSS-ish property values (px/rem/em), not inside var(--…). */
const BARE_LENGTH =
  /(?<!var\(--[a-z0-9-]*):\s*[^;\n]*?\b\d+(?:\.\d+)?(?:px|rem|em)\b/i;

function walk(dir, out = []) {
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return out;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === "dist") continue;
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (EXTENSIONS.has(path.extname(name))) out.push(full);
  }
  return out;
}

function isAllowed(rel) {
  return ALLOW_PATH_PREFIXES.some((p) => rel.startsWith(p));
}

function stripStringsAndComments(text, ext) {
  // Cheap strip of // and /* */ comments; keep code for pattern scan
  let s = text.replace(/\/\*[\s\S]*?\*\//g, "");
  if (ext !== ".html" && ext !== ".css") {
    s = s.replace(/(^|[^:])\/\/.*$/gm, "$1");
  }
  return s;
}

function findOffenses(rel, text) {
  const ext = path.extname(rel);
  const body = stripStringsAndComments(text, ext);
  const hits = [];
  const lines = body.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Media queries cannot use custom properties portably — skip length checks there.
    const inMedia = /^\s*@media\b/i.test(line);
    if (HEX.test(line)) hits.push({ line: i + 1, kind: "hex-color", sample: line.trim().slice(0, 120) });
    if (RGB_HSL.test(line)) hits.push({ line: i + 1, kind: "rgb/hsl", sample: line.trim().slice(0, 120) });
    if (FONT_FAMILY_LINE.test(line) && !FONT_FAMILY_TOKENIZED.test(line)) {
      hits.push({ line: i + 1, kind: "font-family", sample: line.trim().slice(0, 120) });
    }
    if (
      !inMedia &&
      (ext === ".css" || ext === ".ts" || ext === ".js" || ext === ".html") &&
      BARE_LENGTH.test(line)
    ) {
      const withoutVars = line.replace(/var\(--[^)]+\)/g, "");
      if (/\b\d+(?:\.\d+)?(?:px|rem|em)\b/.test(withoutVars)) {
        hits.push({ line: i + 1, kind: "bare-length", sample: line.trim().slice(0, 120) });
      }
    }
  }
  return hits;
}

function main() {
  const files = [];
  for (const root of SCAN_ROOTS) {
    walk(path.join(ROOT, root), files);
  }

  const offenders = [];
  for (const file of files) {
    const rel = path.relative(ROOT, file).replaceAll("\\", "/");
    if (isAllowed(rel)) continue;
    const text = readFileSync(file, "utf8");
    for (const hit of findOffenses(rel, text)) {
      offenders.push(`${rel}:${hit.line}: ${hit.kind} — ${hit.sample}`);
    }
  }

  if (offenders.length) {
    console.error("hardcoded-values: use semantic/component tokens from @lakehouse/design-contract:");
    for (const item of offenders) console.error(`  - ${item}`);
    process.exit(1);
  }

  console.log(`OK hardcoded-values: scanned ${files.length} file(s) under ${SCAN_ROOTS.join(", ")}`);
}

main();
