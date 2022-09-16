import rss from '@astrojs/rss';

import {
	getBlogFeed,
	getPicturesFeed,
	title
} from '@lib/rssData';

const items = [
	...await getBlogFeed(),
	...await getPicturesFeed(),
].sort((a, b) => {
	if (a.pubDate > b.pubDate) return -1;
	if (a.pubDate < b.pubDate) return 1;
	return 0;
});

export const get = () => rss({
	// `<title>` field in output xml
	title,
	// `<description>` field in output xml
	description: "Jay's recent writing and drawings.",
	// base URL for RSS <item> links
	// SITE will use "site" from your project's astro.config.
	site: import.meta.env.SITE,
	// list of `<item>`s in output xml
	// simple example: generate items for every md file in /src/pages
	// see "Generating items" section for required frontmatter and advanced use cases
	items,
	// (optional) inject custom xml
	customData: '<language>en-us</language>',
	stylesheet: '/rss/styles.xsl',
});
