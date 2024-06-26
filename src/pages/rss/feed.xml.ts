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

export function GET(context) {
	return rss({
		title,
		description: "Jay's recent writing and drawings.",
		site: context.site,
		stylesheet: '/rss/styles.xsl',
		xmlns,
		customData,
		items,
	});
}
