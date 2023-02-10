import rss from '@astrojs/rss';

import {
	getCustomData,
	getPicturesFeed,
	title,
	xmlns,
} from '@lib/rssData';

const items = await getPicturesFeed();
const customData = await getCustomData();

export const get = () => rss({
	title: `${title}: Pictures`,
	description: "Jay's recent drawings, paintings, and prints.",
	site: import.meta.env.SITE,
	stylesheet: '/rss/styles.xsl',
	xmlns,
	customData,
	items,
});
