// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const orgPath = path.join(root, ".lakehouse", "org.json");
const org = existsSync(orgPath) ? JSON.parse(readFileSync(orgPath, "utf8")) : {};
const domainPending =
  !org.domain || org.domain === "REPLACE_WITH_CUSTOM_DOMAIN";
/** Canonical site URL — never *.github.io; placeholder until Sen sets domain. */
const site = domainPending ? undefined : `https://${org.domain}`;

export default defineConfig({
  site,
  // When domain is pending, build still works; canonical/OG activate once site is set.
  integrations: [
    starlight({
      title: `${org.brand || "LakeHouse"} Studio Docs`,
      description:
        "LakeHouse Studio documentation for AEC open-source templates — Revit, Rhino, Grasshopper, BIM, and design tools.",
      defaultLocale: "en",
      // Dark mode only (LakeHouse Studio).
      expressiveCode: {
        themes: ["github-dark"],
      },
      customCss: ["./src/styles/lakehouse.css"],
      head: [
        {
          tag: "meta",
          attrs: { name: "theme-color", content: "#0a0a0a" },
        },
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          content: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "LakeHouse Studio",
                url: site || undefined,
              },
              {
                "@type": "SoftwareApplication",
                name: "Template-Widget",
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Windows, macOS, Linux",
                description:
                  "LakeHouse Studio public template for AEC open-source tools with OpenSSF-aligned CI.",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              },
            ],
          }),
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/zsenarchitect",
        },
      ],
      sidebar: [
        {
          label: "Start",
          items: [
            { label: "Overview", slug: "index" },
            { label: "Discoverability", slug: "guides/discoverability" },
            { label: "Releasing", slug: "guides/releasing" },
          ],
        },
        {
          label: "Reference",
          items: [{ label: "SEO metadata", slug: "reference/seo" }],
        },
      ],
    }),
    ...(site ? [sitemap()] : []),
  ],
});
