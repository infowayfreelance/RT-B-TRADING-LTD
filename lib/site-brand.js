import * as site from "./site.js";

const LOGO_DARK = "/brand/rtb-logo-960.webp";
const LOGO_LIGHT = "/brand/rtb-logo-light-960.webp";
const OG_IMAGE = site.SITE_URL + "/brand/og-home.jpg";
const LOGO_URL = site.SITE_URL + LOGO_DARK;

function applyApprovedLogos(html) {
  if (!html) return html;
  return html
    .replace(
      /<a class="brand"[^>]*>[\s\S]*?<\/a>/i,
      '<a class="brand" href="/" aria-label="RT&B Trading Ltd"><img class="brand-logo" src="' + LOGO_DARK + '" width="960" height="315" alt="RT&B Trading Ltd" /></a>'
    )
    .replace(
      /<a class="brand footer-brand"[^>]*>[\s\S]*?<\/a>/i,
      '<a class="brand footer-brand" href="/" aria-label="RT&B Trading Ltd"><img class="brand-logo" src="' + LOGO_LIGHT + '" width="960" height="315" alt="RT&B Trading Ltd" /></a>'
    );
}

export const services = site.services;
export const routes = site.routes;
export const localBusinessSchema = {
  ...site.localBusinessSchema,
  logo: LOGO_URL
};

export function buildMetadata(path) {
  const metadata = site.buildMetadata(path);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "RT&B Trading Ltd" }]
    },
    twitter: {
      ...metadata.twitter,
      images: [{ url: OG_IMAGE, alt: "RT&B Trading Ltd" }]
    }
  };
}

export function renderHomepage() {
  return applyApprovedLogos(site.renderHomepage());
}

export function renderPage(slugs) {
  return applyApprovedLogos(site.renderPage(slugs));
}
