import rss from '@astrojs/rss';

import {
	getBlogFeed,
	getCustomData,
	title,
	xmlns,
} from '@lib/rssData';

const items = await getBlogFeed();
const customData = await getCustomData('blog.xml');

export const get = () => rss({
	title: `${title}: Blog posts`,
	description: "Jay's recent writing.",
	site: import.meta.env.SITE,
	stylesheet: '/rss/styles.xsl',
	xmlns,
	customData,
	items,
});
