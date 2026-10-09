#!/usr/bin/env node
/**
 * Validate widget.json against the local schema + host engines range.
 * TODO(widget-sdk): Prefer schema + helpers from published @lakehouse/widget-sdk.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./lib/repo.mjs";
import { isHostCompatible } from "@lakehouse/widget-sdk";

const HOST_VERSION = process.env.LAKEHOUSE_HOST_VERSION || "0.1.0";

function loadJson(rel) {
  return JSON.parse(readFileSync(path.join(ROOT, rel), "utf8"));
}

function typeOf(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function validateAgainstSchema(data, schema, pathLabel = "$") {
  const errors = [];
  if (schema.type && typeOf(data) !== schema.type) {
    errors.push(`${pathLabel}: expected ${schema.type}, got ${typeOf(data)}`);
    return errors;
  }
  if (schema.type === "object" && data && typeof data === "object") {
    for (const key of schema.required ?? []) {
      if (!(key in data)) errors.push(`${pathLabel}: missing required "${key}"`);
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(data)) {
        if (!schema.properties?.[key]) {
          errors.push(`${pathLabel}: unexpected property "${key}"`);
        }
      }
    }
    for (const [key, propSchema] of Object.entries(schema.properties ?? {})) {
      if (key in data) {
        errors.push(...validateAgainstSchema(data[key], propSchema, `${pathLabel}.${key}`));
      }
    }
  }
  if (schema.type === "array" && Array.isArray(data)) {
    if (typeof schema.minItems === "number" && data.length < schema.minItems) {
      errors.push(`${pathLabel}: expected minItems ${schema.minItems}`);
    }
    if (schema.items) {
      data.forEach((item, i) => {
        errors.push(...validateAgainstSchema(item, schema.items, `${pathLabel}[${i}]`));
      });
    }
  }
  if (schema.type === "string" && typeof data === "string") {
    if (typeof schema.minLength === "number" && data.length < schema.minLength) {
      errors.push(`${pathLabel}: minLength ${schema.minLength}`);
    }
    if (schema.pattern && !new RegExp(schema.pattern).test(data)) {
      errors.push(`${pathLabel}: does not match pattern ${schema.pattern}`);
    }
  }
  return errors;
}

function main() {
  const manifest = loadJson("widget.json");
  const schema = loadJson("widget.schema.json");
  const errors = validateAgainstSchema(manifest, schema);
  if (errors.length) {
    console.error("check-widget: schema validation failed:");
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }

  const range = manifest.engines?.lakehouse;
  if (!range || !isHostCompatible(HOST_VERSION, range)) {
    console.error(
      `check-widget: host ${HOST_VERSION} incompatible with engines.lakehouse="${range}"`,
    );
    process.exit(1);
  }

  const pkg = loadJson("package.json");
  if (pkg.version !== manifest.version) {
    console.error(
      `check-widget: package.json version (${pkg.version}) != widget.json version (${manifest.version})`,
    );
    process.exit(1);
  }

  console.log(
    `OK widget: ${manifest.id}@${manifest.version}; host ${HOST_VERSION} matches ${range}`,
  );
}

main();
