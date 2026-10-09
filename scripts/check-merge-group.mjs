#!/usr/bin/env node
/**
 * Ensure required PR workflows also trigger on merge_group (merge queue).
 * Skips comment-only / pull_request_target workflows (e.g. welcome).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./lib/repo.mjs";

const WORKFLOWS = path.join(ROOT, ".github", "workflows");

/** Workflows that must not require merge_group (no required checks / unsafe combo). */
const SKIP = new Set(["welcome.yml"]);

function listYamlFiles(dir) {
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(".yml") || name.endsWith(".yaml"))
    .map((name) => path.join(dir, name));
}

function stripCommentLines(text) {
  return text
    .split("\n")
    .map((line) => (line.trimStart().startsWith("#") ? "" : line))
    .join("\n");
}

/** True if `on:` includes a bare or mapped pull_request trigger. */
function hasPullRequestTrigger(text) {
  const body = stripCommentLines(text);
  // `pull_request:` as a key under on: (with or without nested mapping)
  return /^\s*pull_request\s*:/m.test(body);
}

function hasMergeGroupTrigger(text) {
  const body = stripCommentLines(text);
  return /^\s*merge_group\s*:/m.test(body);
}

/** Reject pull_request.branches filters (stacked PRs need CI on every base). */
function pullRequestHasBranchesFilter(text) {
  const lines = stripCommentLines(text).split("\n");
  let inPullRequest = false;
  let prIndent = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = /^(\s*)pull_request\s*:/.exec(line);
    if (m) {
      inPullRequest = true;
      prIndent = m[1].length;
      // Inline empty `pull_request:` is fine
      continue;
    }
    if (!inPullRequest) continue;
    const indent = /^(\s*)/.exec(line)?.[1].length ?? 0;
    if (line.trim() && indent <= prIndent) {
      inPullRequest = false;
      // re-process this line as possible next top-level key
      i -= 1;
      continue;
    }
    if (/^\s*branches\s*:/.test(line)) return true;
  }
  return false;
}

function main() {
  const files = listYamlFiles(WORKFLOWS);
  if (files.length === 0) {
    console.error("merge-group-guard: no workflows found under .github/workflows");
    process.exit(1);
  }

  const offenders = [];
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const name = path.basename(file);
    if (SKIP.has(name)) continue;
    const text = readFileSync(file, "utf8");
    if (!hasPullRequestTrigger(text)) continue;
    if (pullRequestHasBranchesFilter(text)) {
      offenders.push(`${rel}: pull_request must not use branches: filter (stacked PRs)`);
    }
    if (!hasMergeGroupTrigger(text)) {
      offenders.push(`${rel}: missing merge_group: (required for merge queue CI)`);
    }
  }

  if (offenders.length) {
    console.error("merge-group-guard: workflow trigger policy failed:");
    for (const item of offenders) console.error(`  - ${item}`);
    process.exit(1);
  }

  console.log(`OK merge-group: ${files.length} workflow(s) checked`);
}

main();
