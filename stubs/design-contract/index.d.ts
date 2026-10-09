/**
 * TODO(design-contract): Delete this stub when @lakehouse/design-contract is published.
 */

export const CONTRACT_VERSION: string;
export const DEFAULT_THEME_ID: string;

export const THEME_TOKEN_VARS: Record<string, string>;

export type ThemePack = {
  id: string;
  name: string;
  contractVersion: string;
  colorScheme: "dark" | "light" | string;
  description?: string;
  cssVars: Record<string, string>;
};

export function listThemes(): Array<{
  id: string;
  name: string;
  colorScheme: string;
  contractVersion: string;
}>;

export function getTheme(id?: string): ThemePack;

export function themeToCssVars(theme: ThemePack): Record<string, string>;

export function applyTheme(
  target: Element | Document,
  theme: ThemePack,
): void;

export function applyThemeTokenOverrides(
  target: Element | Document,
  themeTokens: Record<string, string> | null | undefined,
): void;

export function isContractCompatible(version: string, range: string): boolean;
