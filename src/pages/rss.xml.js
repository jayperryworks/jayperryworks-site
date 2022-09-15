import rss from '@astrojs/rss';

import {
	blogPost,
	fetchLinks,
	picture,
} from '@lib/routes';

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

function pictureDescription

const pictureItems = pictures.map(({ uid, data, tags }) => ({
	link: `${import.meta.env.SITE}${picture({ data, uid })}`,
	title: prismicHelpers.asText(data.title),
	pubDate: prismicHelpers.asDate(data.date_completed),
	description: `A new ${tags.include('painting') ? 'painting' : 'drawing'}${data.series?.data?.title ? `Part of the ${data.series.data.title} series.`: ''}. ${data.editions ? 'Print editions available.' : ''}`,
}));

console.log(pictureItems);

export const get = () => rss({
	// `<title>` field in output xml
	title: 'Jay Perry',
	// `<description>` field in output xml
	description: "Jay's recent writing and drawings",
	// base URL for RSS <item> links
	// SITE will use "site" from your project's astro.config.
	site: import.meta.env.SITE,
	// list of `<item>`s in output xml
	// simple example: generate items for every md file in /src/pages
	// see "Generating items" section for required frontmatter and advanced use cases
	items: blogPosts.map(({ uid, data }) => ({
		link: `${import.meta.env.SITE}${blogPost({ data, uid })}`,
		title: prismicHelpers.asText(data.title),
		pubDate: prismicHelpers.asDate(data.date),
		description: data.description ? prismicHelpers.asText(data.description) : undefined,
	})),
	// (optional) inject custom xml
	customData: '<language>en-us</language>',
	stylesheet: '/rss/styles.xsl',
});
