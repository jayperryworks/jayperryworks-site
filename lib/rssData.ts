import * as prismicHelpers from '@prismicio/helpers';
import type { PrismicDocument, PrismicDocumentWithUID } from '@prismicio/types';

import {
	blogPost,
	fetchLinks,
	picture,
} from './routes.ts';

import { arrayToSentence } from './stringHelpers.ts';
import prismic from './prismic.ts';

// types
type FeedItem = {
	link: string,
	pubDate: Date,
	title: string,
	description?: string,
};

function getBlogDescription({ data }: Partial<PrismicDocument>): string {
	if (prismicHelpers.isFilled.keyText(data.description)) return data.description;
	if (prismicHelpers.isFilled.title(data.subtitle)) return prismicHelpers.asText(data.subtitle);
	return undefined;
}

function pictureMediaString({ data }: Partial<PrismicDocument>): string {
	const {
		height,
		media,
		substrate,
		width,
	} = data;

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

/* eslint-disable max-len */
// Create a sentence describing the picture
// -> A new painting: acrylic on triptych panels, 6' x 4'. Print editions available.
// -> A new drawing: ink and digital composite on paper. Part of my Inventory series. Print editions available.
/* eslint-enable max-len */
function pictureDescription({ data, tags }: Partial<PrismicDocumentWithUID>): string {
	const series = data.series?.data?.title;

	const strings = [
		`A new ${tags.includes('painting') ? 'painting' : 'drawing'}:`,
	];

	strings.push(pictureMediaString({ data }));

	if (series) {
		strings.push(`Part of my ${prismicHelpers.asText(series)} series.`);
	}

	if (data.editions.length > 0) {
		strings.push('Print editions available.');
	}

	return strings.join(' ');
}

export async function getPicturesFeed(): Promise<FeedItem[]> {
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

	return pictures.map(({ uid, data, tags }: Partial<PrismicDocumentWithUID>) => ({
		link: `${import.meta.env.SITE}${picture({ data, uid })}`,
		title: prismicHelpers.asText(data.title),
		pubDate: prismicHelpers.asDate(data.date_completed),
		description: pictureDescription({ data, tags }),
	}));
}

export async function getBlogFeed(): Promise<FeedItem[]> {
	const posts = await prismic.getAllByType('blog_post', {
		fetchLinks,
		orderings: {
			field: 'my.blog_post.date',
			direction: 'desc',
		},
	});

	return posts.map(({ uid, data }: Partial<PrismicDocumentWithUID>) => ({
		description: getBlogDescription({ data }),
		link: `${import.meta.env.SITE}${blogPost({ data, uid })}`,
		pubDate: prismicHelpers.asDate(data.date),
		title: prismicHelpers.asText(data.title),
	}));
}

export const title = 'Jay Perry';
