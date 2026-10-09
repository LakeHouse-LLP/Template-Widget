/**
 * TODO(widget-sdk): Delete this stub when @lakehouse/widget-sdk is published.
 * Canonical types live in the private monorepo at packages/widget-sdk.
 * This file is a minimal stand-in so Template-Widget can typecheck and preview.
 */

export type WidgetPermission = string;

export interface WidgetHostBridge {
  postMessage(type: string, payload?: unknown): void;
  onMessage(type: string, handler: (payload: unknown) => void): () => void;
  getSettings<T extends Record<string, unknown> = Record<string, unknown>>(): T;
  reportReady(): void;
}

export interface WidgetMountContext {
  root: HTMLElement;
  bridge: WidgetHostBridge;
  inputs: Record<string, unknown>;
}

export interface WidgetModule {
  mount(ctx: WidgetMountContext): void | (() => void);
}

export declare function createBridgeFromWindow(
  targetWindow?: Window,
): WidgetHostBridge;

/** SemVer-range check for engines.lakehouse (host version). */
export declare function isHostCompatible(
  hostVersion: string,
  range: string,
): boolean;
