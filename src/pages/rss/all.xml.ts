import rss from '@astrojs/rss';

import {
	getBlogFeed,
	getCustomData,
	getPicturesFeed,
	title,
	xmlns
} from '@lib/rssData';

const items = [
	...await getBlogFeed(),
	...await getPicturesFeed(),
].sort((a, b) => {
	if (a.pubDate > b.pubDate) return -1;
	if (a.pubDate < b.pubDate) return 1;
	return 0;
});

const customData = await getCustomData();

export const get = () => {
	return rss({
		title: `${title}: All posts`,
		description: "Jay's recent writing and drawings.",
		site: import.meta.env.SITE,
		stylesheet: '/rss/styles.xsl',
		xmlns,
		customData,
		items,
	});
};
