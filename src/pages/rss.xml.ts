import rss from '@astrojs/rss';

import {
	blogPost,
	fetchLinks,
	picture,
} from '@lib/routes';

import { arrayToSentence } from '@lib/stringHelpers';
import * as prismicHelpers from '@prismicio/helpers';
import prismic from '@lib/prismic';

const blogPosts = await prismic.getAllByType('blog_post', {
	fetchLinks,
	orderings: {
		field: 'my.blog_post.date',
		direction: 'desc',
	},
});

const pictures = await prismic.getAllByType('picture', {
	orderings: {
		field: 'my.picture.date_completed',
		direction: 'desc',
	},
	graphQuery: `
		{
			picture {
				...pictureFields
				series {
					...on picture_series {
						uid
						title
					}
				}
				media {
					medium {
						...on picture_medium {
							...picture_mediumFields
						}
					}
				}
				substrate {
					...on picture_substrate {
						name
					}
				}
			}
		}
	`,
});

// A 6' x 4' painting, acrlyic on triptych panels.
// A new painting: acrylic on triptych panels, 6' x 4'. Print editions available.
// A new drawing: ink and digital composite on paper. Part of my Inventory series. Print editions available.

function pictureMediaString({ data }): string {
	const { media, substrate, width, height } = data;

	let string = '';

	// convert the list of media to a sentence
	string += arrayToSentence(
		media.map(({ medium }) => (medium.data.name.toLowerCase())),
		{
			period: false,
			capitalize: false,
		},
	);

	// add the substrate as a suffix
	if (prismicHelpers.isFilled.link(substrate)) {
		string += ` on ${substrate.data.name.toLowerCase()}`;
	}

	if (width && height) {
		string += `, ${width}" x ${height}"`;
	}

	string += '.';

	return string;
}

function pictureDescription({ data, tags }): string {
	const series = data.series?.data?.title;

	const strings = [
		`A new ${tags.includes('painting') ? 'painting' : 'drawing'}:`,
	];

	strings.push(pictureMediaString({ data }));

	if (series) {
		strings.push(`Part of my ${series} series.`);
	}

	if (data.editions.length > 0) {
		strings.push('Print editions available.');
	}

	return strings.join(' ');
}

const pictureItems = pictures.map(({ uid, data, tags }) => ({
	link: `${import.meta.env.SITE}${picture({ data, uid })}`,
	title: prismicHelpers.asText(data.title),
	pubDate: prismicHelpers.asDate(data.date_completed),
	description: pictureDescription({ data, tags }),
}));

const blogItems = blogPosts.map(({ uid, data }) => ({
	link: `${import.meta.env.SITE}${blogPost({ data, uid })}`,
	title: prismicHelpers.asText(data.title),
	pubDate: prismicHelpers.asDate(data.date),
	description: data.description ? prismicHelpers.asText(data.description) : undefined,
}));

const items = [
	...blogItems,
	...pictureItems
].sort((a, b) => {
	if (a.pubDate > b.pubDate) return -1;
	if (a.pubDate < b.pubDate) return 1;
	return 0;
});

export const get = () => rss({
	// `<title>` field in output xml
	title: 'Jay Perry',
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
