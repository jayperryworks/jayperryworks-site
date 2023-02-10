import rss from '@astrojs/rss';

import { getPicturesFeed, title } from '@lib/rssData';

const items = await getPicturesFeed();

export const get = () => rss({
	// `<title>` field in output xml
	title: `${title}: Pictures`,
	// `<description>` field in output xml
	description: "Jay's recent drawings, paintings, and prints.",
	// base URL for RSS <item> links
	// SITE will use "site" from your project's astro.config.
	site: import.meta.env.SITE,
	// list of `<item>`s in output xml
	items,
	// (optional) inject custom xml
	customData: '<language>en-us</language>',
	stylesheet: '/rss/styles.xsl',
});
