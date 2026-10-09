#!/usr/bin/env node
/**
 * Cheap LakeHouse writing-style lint (brand kit WRITING-STYLE.md §3 / §7).
 * Canonical guide: {owner}/.github/brand/WRITING-STYLE.md
 *
 * Scans a small allowlist of agent/contributor-facing docs so CI stays fast.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./lib/repo.mjs";

/** Paths relative to repo root. */
const SCAN_FILES = [
  "AGENTS.md",
  "CONTRIBUTING.md",
  "README.md",
  "docs/brand.md",
];

const EM_DASH = /\u2014/; // —
const EN_DASH = /\u2013/; // –

/** AI filler / hype words from WRITING-STYLE §7 (word-boundary, case-insensitive). */
const BANNED = [
  "revolutionary",
  "game-changing",
  "game-changer",
  "disruptive",
  "next-gen",
  "next-level",
  "cutting-edge",
  "seamless",
  "seamlessly",
  "effortless",
  "effortlessly",
  "leverage",
  "utilizes?",
  "synergy",
  "empower",
  "unlock",
  "unleash",
  "elevate",
  "delve",
  "tapestry",
  "best-in-class",
  "world-class",
  "robust",
  "powerful",
  "ai-powered",
];

const BANNED_RE = new RegExp(`\\b(?:${BANNED.join("|")})\\b`, "i");

function main() {
  const offenses = [];

  for (const rel of SCAN_FILES) {
    const full = path.join(ROOT, rel);
    if (!existsSync(full)) {
      offenses.push({ rel, line: 0, kind: "missing-file", sample: rel });
      continue;
    }
    const lines = readFileSync(full, "utf8").split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip fenced code examples that document the ban itself.
      if (/em dash|en dash|U\+201[34]|WRITING-STYLE/i.test(line) && /ban|avoid|zero|never/i.test(line)) {
        continue;
      }
      if (EM_DASH.test(line)) {
        offenses.push({ rel, line: i + 1, kind: "em-dash", sample: line.trim().slice(0, 100) });
      }
      if (EN_DASH.test(line)) {
        offenses.push({ rel, line: i + 1, kind: "en-dash", sample: line.trim().slice(0, 100) });
      }
      const banned = line.match(BANNED_RE);
      if (banned) {
        // Allow lines that document the ban list itself.
        if (
          /^\|?\s*Avoid\b/i.test(line) ||
          /\bavoid banned\b/i.test(line) ||
          /\bbanned (words?|filler)\b/i.test(line) ||
          /WRITING-STYLE\s*§?\s*7/i.test(line) ||
          /\bavoid\b.*\buse instead\b/i.test(line)
        ) {
          continue;
        }
        offenses.push({
          rel,
          line: i + 1,
          kind: `banned:${banned[0].toLowerCase()}`,
          sample: line.trim().slice(0, 100),
        });
      }
    }
  }

  if (offenses.length) {
    console.error("check-copy: writing-style violations:");
    for (const o of offenses) {
      console.error(`  ${o.rel}:${o.line} [${o.kind}] ${o.sample}`);
    }
    console.error(
      "Hint: no em/en dashes; avoid hype words (see AGENTS.md Writing style). Ranges use a plain hyphen.",
    );
    process.exit(1);
  }

  console.log(`OK copy: ${SCAN_FILES.length} file(s), no em/en dashes or banned filler words`);
}

main();
