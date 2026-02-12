import rss from '@astrojs/rss';

import {
	getBlogFeed,
	getCustomData,
	title,
	xmlns,
} from '@lib/rssData';

const items = await getBlogFeed();
const customData = await getCustomData('blog.xml');

export async function GET(context) {
	return rss({
		title: `${title}: Blog posts`,
		description: "Jay's recent writing.",
		site: context.site,
		stylesheet: '/rss/styles.xsl',
		xmlns,
		customData,
		items,
	});
}
