#!/usr/bin/env node
/**
 * Build release artifacts: widget bundle + widget.json + npm pack + SHA256SUMS.
 */
import { createHash } from "node:crypto";
import {
  createReadStream,
  readFileSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
  rmSync,
  copyFileSync,
  existsSync,
} from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT } from "./lib/repo.mjs";

const OUT = path.join(ROOT, "release-assets");

async function sha256File(filePath) {
  const hash = createHash("sha256");
  await pipeline(createReadStream(filePath), hash);
  return hash.digest("hex");
}

async function main() {
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  execFileSync("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit" });

  const distWidget = path.join(ROOT, "dist", "widget.js");
  const distStandalone = path.join(ROOT, "dist", "standalone.js");
  const distManifest = path.join(ROOT, "dist", "widget.json");
  if (!existsSync(distWidget) || !existsSync(distManifest)) {
    console.error("release-build: missing dist/widget.js or dist/widget.json");
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(distManifest, "utf8"));
  const bundleName = `${manifest.id.replace(/[^a-zA-Z0-9._-]+/g, "-")}-${manifest.version}.js`;
  const standaloneName = `${manifest.id.replace(/[^a-zA-Z0-9._-]+/g, "-")}-${manifest.version}.standalone.js`;
  copyFileSync(distWidget, path.join(OUT, bundleName));
  if (existsSync(distStandalone)) {
    copyFileSync(distStandalone, path.join(OUT, standaloneName));
  }
  copyFileSync(distManifest, path.join(OUT, "widget.json"));
  if (existsSync(path.join(ROOT, "dist", "widget.js.map"))) {
    copyFileSync(path.join(ROOT, "dist", "widget.js.map"), path.join(OUT, `${bundleName}.map`));
  }

  execFileSync("npm", ["pack", "--pack-destination", OUT], {
    cwd: ROOT,
    stdio: "inherit",
  });

  const files = readdirSync(OUT).filter((n) => !n.endsWith(".md") && n !== "SHA256SUMS");
  if (files.length === 0) {
    console.error("release-build: no artifacts produced");
    process.exit(1);
  }

  const lines = [];
  for (const name of files.sort()) {
    const digest = await sha256File(path.join(OUT, name));
    lines.push(`${digest}  ${name}`);
  }

  writeFileSync(path.join(OUT, "SHA256SUMS"), `${lines.join("\n")}\n`, "utf8");
  console.log(`release-build: ${files.length} artifact(s) + SHA256SUMS`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
