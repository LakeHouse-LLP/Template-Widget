# Sen-only SEO verification & analytics

Agents never change domain DNS, Search Console, or analytics ownership.

## Search verification

1. **Google Search Console** — add the custom domain property (from `.lakehouse/org.json` when real); DNS or HTML file verify; submit sitemap (`/sitemap-index.xml` from the Starlight site).
2. **Bing Webmaster Tools** — import GSC or verify the same domain; submit the same sitemap.

Do this only after `REPLACE_WITH_CUSTOM_DOMAIN` is replaced and DNS points at GitHub Pages or Vercel.

## Analytics choice: GoatCounter

**Pick: [GoatCounter](https://www.goatcounter.com/)** (free tier / open-source self-host).

Justification (also in `.lakehouse/discoverability.json`):

- Privacy-friendly; typically no cookie consent banner for basic pageview counts
- Zero cost on the free hosted tier for open-source style traffic, or self-host
- No dependency on Cloudflare plan tiers
- Tiny script; fits dark-only docs without layout shift

Wire the script into `site/` only after Sen creates the GoatCounter site. Until then, ship the scaffold without tracking.

**Not chosen:** Cloudflare Web Analytics — excellent, but couples analytics to Cloudflare DNS/proxy setup; GoatCounter stays portable across GitHub Pages or Vercel free.

## Checklist

- [ ] Domain purchased; `org.json` updated; DNS ready
- [ ] GSC verified + sitemap submitted
- [ ] Bing verified + sitemap submitted
- [ ] GoatCounter site created; env/site id stored as Sen-managed secret if needed
- [ ] Confirm no analytics fire on placeholder domain
