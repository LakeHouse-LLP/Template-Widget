/**
 * TODO(design-contract): Temporary local stub — not the real design contract.
 * Replace root dependency with the published `@lakehouse/design-contract` and
 * delete stubs/design-contract/. Do not vendor the monorepo package here.
 */
import { lakeMorning, lakehouseStudio } from "./themes.js";

/** SemVer of this stub contract surface (themes target this). */
export const CONTRACT_VERSION = "0.1.0";

export const DEFAULT_THEME_ID = "lakehouse-studio";

const THEMES = new Map([
  [lakehouseStudio.id, lakehouseStudio],
  [lakeMorning.id, lakeMorning],
]);

/**
 * Overlay key → semantic CSS custom property.
 * Widgets map customization.themeTokens through this table.
 */
export const THEME_TOKEN_VARS = {
  accent: "--color-accent",
  bg: "--color-surface-canvas",
  panel: "--color-surface-panel",
  text: "--color-text-primary",
  muted: "--color-text-muted",
  border: "--color-border-default",
};

export function listThemes() {
  return [...THEMES.values()].map((t) => ({
    id: t.id,
    name: t.name,
    colorScheme: t.colorScheme,
    contractVersion: t.contractVersion,
  }));
}

export function getTheme(id = DEFAULT_THEME_ID) {
  const theme = THEMES.get(id) ?? THEMES.get(DEFAULT_THEME_ID);
  if (!theme) throw new Error("design-contract: no themes registered");
  return structuredClone(theme);
}

export function themeToCssVars(theme) {
  return { ...(theme?.cssVars ?? {}) };
}

/**
 * Apply a theme pack onto an element (usually document.documentElement).
 * @param {Element | Document} target
 * @param {object} theme
 */
export function applyTheme(target, theme) {
  const el =
    target && "documentElement" in target ? target.documentElement : target;
  if (!el?.style) return;
  const scheme = theme.colorScheme || "dark";
  el.style.colorScheme = scheme;
  el.dataset.lhTheme = theme.id;
  for (const [name, value] of Object.entries(theme.cssVars ?? {})) {
    el.style.setProperty(name, value);
  }
}

/**
 * Apply overlay themeTokens as CSS variable overrides (semantic vars only).
 * Values that are bare `--token` or `var(--token)` refs are skipped (theme pack wins).
 * @param {Element | Document} target
 * @param {Record<string, string> | null | undefined} themeTokens
 */
export function applyThemeTokenOverrides(target, themeTokens) {
  if (!themeTokens) return;
  const el =
    target && "documentElement" in target ? target.documentElement : target;
  if (!el?.style) return;
  for (const [key, value] of Object.entries(themeTokens)) {
    const cssVar = THEME_TOKEN_VARS[key];
    if (!cssVar || typeof value !== "string" || !value.trim()) continue;
    const v = value.trim();
    if (v.startsWith("--") || v.startsWith("var(")) continue;
    el.style.setProperty(cssVar, v);
  }
}

/**
 * Minimal caret/comparator SemVer range check for `>=x.y.z <a.b.c`.
 * @param {string} version
 * @param {string} range
 */
export function isContractCompatible(version, range) {
  const parsed = parseSemver(version);
  if (!parsed) return false;

  const ge = range.match(/>=\s*(\d+\.\d+\.\d+)/);
  const lt = range.match(/<\s*(\d+\.\d+\.\d+)/);
  if (ge) {
    const min = parseSemver(ge[1]);
    if (!min || cmp(parsed, min) < 0) return false;
  }
  if (lt) {
    const max = parseSemver(lt[1]);
    if (!max || cmp(parsed, max) >= 0) return false;
  }
  return Boolean(ge || lt || range.trim() === "*");
}

function parseSemver(v) {
  const m = String(v).trim().match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!m) return null;
  return { major: Number(m[1]), minor: Number(m[2]), patch: Number(m[3]) };
}

function cmp(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}
