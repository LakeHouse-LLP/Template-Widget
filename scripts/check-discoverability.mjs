#!/usr/bin/env node
/**
 * CI check: README keyword paragraph + GitHub description/topics standard.
 * Description/topics are read via GitHub API (GITHUB_TOKEN). Agents never set them.
 *
 * DISCOVERABILITY_STRICT=1 (e.g. on main) fails when GitHub metadata mismatches,
 * unless the repo description is still the TEMPLATE placeholder (Sen-only UI pending).
 * On PRs, metadata mismatches warn so Sen can apply topics without blocking drafts.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./lib/repo.mjs";
import { loadOrg, resolveOrgOwner, isDomainPlaceholder } from "./lib/org.mjs";

const CONFIG_PATH = path.join(ROOT, ".lakehouse", "discoverability.json");

function loadConfig() {
  if (!existsSync(CONFIG_PATH)) {
    throw new Error("missing .lakehouse/discoverability.json");
  }
  return JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
}

function extractFirstParagraph(readme) {
  // Skip title, HTML picture/AUTO blocks, badges, TOC — first prose paragraph.
  const lines = readme.split(/\r?\n/);
  const prose = [];
  let inAuto = false;
  let inFence = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (/<!--\s*AUTO:/.test(line)) {
      inAuto = true;
      continue;
    }
    if (/<!--\s*\/AUTO:/.test(line)) {
      inAuto = false;
      continue;
    }
    if (inAuto) continue;
    if (/^#\s/.test(line)) continue;
    if (/^<!|^<picture|^<source|^<img|^<\/picture/.test(line.trim())) continue;
    if (/^\[!\[/.test(line.trim())) continue;
    if (/^⚠/.test(line.trim())) continue;
    if (/^[-*]\s+\[/.test(line.trim())) continue;
    if (/^\|/.test(line.trim())) continue;
    if (/^<\/?picture|^<source|^<img/i.test(line.trim())) continue;
    if (/^##\s/.test(line)) {
      if (prose.length) break;
      continue;
    }
    if (!line.trim()) {
      if (prose.length) break;
      continue;
    }
    prose.push(line.trim());
  }
  return prose.join(" ");
}

function checkReadme(cfg) {
  const readme = readFileSync(path.join(ROOT, "README.md"), "utf8");
  const para = extractFirstParagraph(readme);
  const words = para.split(/\s+/).filter(Boolean);
  const errors = [];
  if (words.length < cfg.readme.minFirstParagraphWords) {
    errors.push(
      `README first paragraph has ${words.length} words; need ≥ ${cfg.readme.minFirstParagraphWords}`,
    );
  }
  for (const kw of cfg.readme.requiredKeywords || []) {
    if (!para.toLowerCase().includes(kw.toLowerCase())) {
      errors.push(`README first paragraph missing keyword: ${kw}`);
    }
  }
  if (!existsSync(path.join(ROOT, cfg.socialPreview || "docs/media/social-preview.svg"))) {
    errors.push(`missing social preview at ${cfg.socialPreview}`);
  }
  return { errors, para };
}

async function fetchRepoMeta(owner, name, token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "lakehouse-discoverability-check",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  }
  const body = await res.json();
  // topics may need preview — also on body.topics when Accept includes mercy-preview historically; nowadays topics is standard
  let topics = body.topics || [];
  if (topics.length === 0) {
    const tRes = await fetch(`https://api.github.com/repos/${owner}/${name}/topics`, {
      headers: { ...headers, Accept: "application/vnd.github+json" },
    });
    if (tRes.ok) {
      const tBody = await tRes.json();
      topics = tBody.names || [];
    }
  }
  return {
    description: body.description || "",
    homepage: body.homepage || "",
    topics,
  };
}

function checkTopicsAndDescription(cfg, meta) {
  const errors = [];
  const warnings = [];
  const { expected, minLength, maxLength } = cfg.description;
  const desc = (meta.description || "").trim();
  if (!desc) {
    errors.push("GitHub description is empty (Sen sets in repo settings UI)");
  } else {
    if (desc.length < minLength || desc.length > maxLength) {
      errors.push(
        `GitHub description length ${desc.length} outside ${minLength}-${maxLength}`,
      );
    }
    // Soft match: expected should be used; allow exact or high overlap
    if (desc !== expected && !desc.includes("LakeHouse")) {
      warnings.push(`GitHub description should match discoverability.json expected (got: ${desc})`);
      errors.push(`GitHub description must match .lakehouse/discoverability.json description.expected`);
    } else if (desc !== expected) {
      errors.push(
        `GitHub description must equal discoverability.json description.expected exactly`,
      );
    }
  }

  const topics = meta.topics || [];
  const { min, max, expected: expectedTopics } = cfg.topics;
  if (topics.length < min || topics.length > max) {
    errors.push(`GitHub topics count ${topics.length} outside ${min}-${max}`);
  }
  const missing = expectedTopics.filter((t) => !topics.includes(t));
  const extra = topics.filter((t) => !expectedTopics.includes(t));
  if (missing.length) {
    errors.push(`GitHub topics missing (add via Sen UI): ${missing.join(", ")}`);
  }
  if (extra.length) {
    warnings.push(`GitHub topics not in expected list: ${extra.join(", ")}`);
  }

  if (cfg.homepage?.neverGithubIo && /\.github\.io$/i.test(meta.homepage || "")) {
    errors.push("GitHub homepage must not be *.github.io");
  }
  const org = loadOrg();
  if (!isDomainPlaceholder(org.domain) && meta.homepage) {
    if (!meta.homepage.includes(org.domain)) {
      warnings.push(`homepage should use org.json domain ${org.domain}`);
    }
  }

  return { errors, warnings };
}

async function main() {
  const cfg = loadConfig();
  const strict =
    process.env.DISCOVERABILITY_STRICT === "1" ||
    process.env.DISCOVERABILITY_STRICT === "true" ||
    process.env.GITHUB_REF === "refs/heads/main";

  const { errors: readmeErrors, para } = checkReadme(cfg);
  for (const e of readmeErrors) console.error(`discoverability: ${e}`);
  if (!readmeErrors.length) {
    console.log(`OK discoverability README (${para.split(/\s+/).length} words)`);
  }

  const org = loadOrg();
  const owner = resolveOrgOwner(org);
  const repo =
    process.env.GITHUB_REPOSITORY?.split("/")[1] ||
    "Template-Widget";
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

  let metaErrors = [];
  let metaWarnings = [];
  let metaPending = false;
  try {
    const meta = await fetchRepoMeta(owner, repo, token);
    const result = checkTopicsAndDescription(cfg, meta);
    metaErrors = result.errors;
    metaWarnings = result.warnings;
    // Agents must not edit repo Settings. TEMPLATE placeholder means Sen UI pending.
    metaPending = /^\s*⚠?\s*TEMPLATE\b/i.test(meta.description || "");
    console.log(
      `discoverability: GitHub description=${JSON.stringify(meta.description)} topics=${meta.topics.length} homepage=${meta.homepage || "(empty)"}`,
    );
    console.log(
      `discoverability: Sen should set description + topics to match .lakehouse/discoverability.json (${cfg.topics.expected.length} topics)`,
    );
  } catch (err) {
    metaErrors.push(`API: ${err.message}`);
  }

  for (const w of metaWarnings) console.warn(`discoverability warn: ${w}`);
  for (const e of metaErrors) console.error(`discoverability: ${e}`);

  if (readmeErrors.length) process.exit(1);

  if (metaErrors.length) {
    if (strict && !metaPending) {
      console.error("discoverability: STRICT mode - GitHub metadata must match standard");
      process.exit(1);
    }
    console.warn(
      metaPending
        ? "discoverability: GitHub description still TEMPLATE placeholder (Sen-only UI). README OK; not failing until Sen sets description + topics."
        : "discoverability: GitHub description/topics not yet compliant (Sen-only UI). README check passed; not failing this non-strict run.",
    );
  } else {
    console.log("OK discoverability: GitHub description + topics match standard");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
