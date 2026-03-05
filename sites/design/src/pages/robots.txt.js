import bots from '@shared/lib/bots';

export async function GET({ site }) {
	const sitemapURL = new URL('sitemap-index.xml', site);
	const licenseURL = new URL('license.xml', site);

	// prettier-ignore
	return new Response(
`${bots.trim()}
Disallow: /

Sitemap: ${sitemapURL.href}
License: ${licenseURL.href}
`,
	);
}
