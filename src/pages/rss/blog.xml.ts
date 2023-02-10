import rss from '@astrojs/rss';

import {
	getCustomData,
	getBlogFeed,
	title,
} from '@lib/rssData';

const items = await getBlogFeed();
const customData = await getCustomData();

export const get = () => rss({
	// `<title>` field in output xml
	title: `${title}: Blog posts`,
	// `<description>` field in output xml
	description: "Jay's recent writing.",
	// base URL for RSS <item> links
	// SITE will use "site" from your project's astro.config.
	site: import.meta.env.SITE,
	// list of `<item>`s in output xml
	items,
	// (optional) inject custom xml
	customData,
	stylesheet: '/rss/styles.xsl',
});
