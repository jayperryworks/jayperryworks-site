import rss from "@astrojs/rss";

import {
	getCustomData,
	getPicturesFeed,
	title,
	xmlns,
} from "@shared/lib/rssData";

const items = await getPicturesFeed();
const customData = await getCustomData("pictures.xml");

export function GET(context) {
	return rss({
		title: `${title}: Pictures`,
		description: "Jay's recent drawings, paintings, and prints.",
		site: context.site,
		stylesheet: "/rss/styles.xsl",
		xmlns,
		customData,
		items,
	});
}
