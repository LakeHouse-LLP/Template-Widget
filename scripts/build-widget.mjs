#!/usr/bin/env node
/**
 * Bundle widget + standalone entries → dist/
 */
import { mkdirSync, writeFileSync, copyFileSync, readFileSync } from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";
import { ROOT } from "./lib/repo.mjs";

async function bundle(entryRel, outfileRel) {
  await esbuild.build({
    entryPoints: [path.join(ROOT, entryRel)],
    outfile: path.join(ROOT, outfileRel),
    bundle: true,
    format: "esm",
    platform: "browser",
    target: ["es2022"],
    sourcemap: true,
    logLevel: "info",
  });
}

async function main() {
  const outdir = path.join(ROOT, "dist");
  mkdirSync(outdir, { recursive: true });

  await bundle("src/entry/widget.ts", "dist/widget.js");
  await bundle("src/entry/standalone.ts", "dist/standalone.js");

  copyFileSync(path.join(ROOT, "widget.json"), path.join(outdir, "widget.json"));

  const manifest = JSON.parse(readFileSync(path.join(ROOT, "widget.json"), "utf8"));
  writeFileSync(
    path.join(outdir, "BUILD_INFO.json"),
    `${JSON.stringify(
      {
        id: manifest.id,
        version: manifest.version,
        entry: "widget.js",
        standalone: "standalone.js",
        site: manifest.standalone?.site ?? "apps/site",
        builtAt: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );

  console.log("build-widget: wrote dist/widget.js + dist/standalone.js + dist/widget.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
