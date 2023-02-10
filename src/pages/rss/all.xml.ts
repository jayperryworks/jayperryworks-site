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

export const get = () => {
	return rss({
		xmlns: {
			content: 'http://purl.org/rss/1.0/modules/content/',
			webfeeds: 'http://webfeeds.org/rss/1.0',
		},
		// `<title>` field in output xml
		title: `${title}: All posts`,
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
		customData: `
			<webfeeds:cover image="" />
			<webfeeds:icon>${import.meta.env.SITE}/icon.svg</webfeeds:icon>
			<webfeeds:logo>http://yoursite.com/logo-30px-height.svg</webfeeds:logo>
			<webfeeds:accentColor></webfeeds:accentColor>
			<language>en-us</language>
		`,
		stylesheet: '/rss/styles.xsl',
	});
};
