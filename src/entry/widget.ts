/**
 * Widget entry — loaded into LakeHouse desktop (Tauri) and web app hosts.
 * `widget.json` → entry.path points here (bundled as dist/widget.js).
 */
import type { WidgetModule } from "@lakehouse/widget-sdk";
import { mountCore } from "../core/mount.js";

const widget: WidgetModule = {
  mount: mountCore,
};

export default widget;
