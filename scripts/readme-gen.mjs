#!/usr/bin/env node
/**
 * Fill <!-- AUTO:name --> ... <!-- /AUTO:name --> blocks in README.md
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT, expectedRemoteFromEnvOrGit, readText } from "./lib/repo.mjs";

const README = path.join(ROOT, "README.md");
const BLOCK_RE = /<!-- AUTO:([a-z0-9_-]+) -->[\s\S]*?<!-- \/AUTO:\1 -->/g;

function tier() {
  try {
    return readText(".lakehouse/tier").trim();
  } catch {
    return "unknown";
  }
}

function licenseStatus() {
  const license = readText("LICENSE");
  if (/License pending/i.test(license)) {
    return {
      spdx: "pending",
      badgeLabel: "license%20pending",
      notice:
        "License is **pending** owner selection. Suggested default: [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0). See [docs/license.md](./docs/license.md).",
    };
  }
  if (/Apache License/i.test(license)) {
    return {
      spdx: "Apache-2.0",
      badgeLabel: "Apache--2.0",
      notice: "Licensed under the [Apache License 2.0](./LICENSE).",
    };
  }
  return {
    spdx: "see-LICENSE",
    badgeLabel: "see%20LICENSE",
    notice: "See [LICENSE](./LICENSE) for terms.",
  };
}

function generators(remote) {
  const owner = remote?.owner ?? "LakeHouse-LLP";
  const name = remote?.name ?? "Template-OpenSource";
  const repo = `${owner}/${name}`;
  const lic = licenseStatus();
  const t = tier();

  return {
    badges: [
      `[![CI](https://github.com/${repo}/actions/workflows/ci.yml/badge.svg)](https://github.com/${repo}/actions/workflows/ci.yml)`,
      `[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/${repo}/badge)](https://scorecard.dev/viewer/?uri=github.com/${repo})`,
      `[![CodeQL](https://github.com/${repo}/actions/workflows/codeql.yml/badge.svg)](https://github.com/${repo}/actions/workflows/codeql.yml)`,
      `[![tier](https://img.shields.io/badge/tier-${encodeURIComponent(t)}-0B6E4F)](./.lakehouse/tier)`,
      `[![license](https://img.shields.io/badge/license-${lic.badgeLabel}-lightgrey)](./LICENSE)`,
    ].join("\n"),

    "repo-meta": [
      `| | |`,
      `| --- | --- |`,
      `| Org | \`${owner}\` |`,
      `| Repository | \`${name}\` |`,
      `| Tier | \`${t}\` |`,
      `| License | \`${lic.spdx}\` (suggested: Apache-2.0) |`,
      `| Code owner | [@zsenarchitect](https://github.com/zsenarchitect) |`,
      `| Runners | GitHub-hosted only |`,
      `| Merge style | Merge commits only |`,
    ].join("\n"),

    "license-notice": lic.notice,

    toc: [
      "- [About](#about)",
      "- [Quick start](#quick-start)",
      "- [Agent rules](#agent-rules)",
      "- [Contributing](#contributing)",
      "- [Security](#security)",
      "- [License](#license)",
    ].join("\n"),
  };
}

function applyBlocks(source, values) {
  return source.replace(BLOCK_RE, (_full, name) => {
    if (!(name in values)) {
      throw new Error(`README references unknown AUTO block: ${name}`);
    }
    return `<!-- AUTO:${name} -->\n${values[name]}\n<!-- /AUTO:${name} -->`;
  });
}

function main() {
  const check = process.argv.includes("--check");
  const remote = expectedRemoteFromEnvOrGit();
  const values = generators(remote);
  const current = readFileSync(README, "utf8");
  const next = applyBlocks(current, values);

  if (check) {
    if (next !== current) {
      console.error("readme-check: README.md AUTO blocks are stale. Run: npm run readme:gen");
      process.exit(1);
    }
    console.log("OK readme: AUTO blocks up to date");
    return;
  }

  writeFileSync(README, next);
  console.log("readme-gen: wrote README.md");
}

main();
