// types
import type { PrismicDocument, PrismicDocumentWithUID } from '@prismicio/types';

// utilities
import * as prismicHelpers from '@prismicio/helpers';
import { pictureDescription } from './pictureHelpers.ts';
import { truncate } from './stringHelpers.ts';
import prismic from './prismic.ts';

import {
	blogPost,
	fetchLinks,
	picture,
} from './routes.ts';

type FeedItem = {
	link: string,
	pubDate: Date,
	title: string,
	description?: string,
};

function getBlogTitle({ data }: Partial<PrismicDocument>): string {
	if (prismicHelpers.isFilled.title(data.title)) return prismicHelpers.asText(data.title);
	if (prismicHelpers.isFilled.keyText(data.description)) return truncate(data.description);
	return undefined;
}

function getBlogDescription({ data }: Partial<PrismicDocument>): string {
	if (prismicHelpers.isFilled.keyText(data.description)) return data.description;
	if (prismicHelpers.isFilled.title(data.subtitle)) return prismicHelpers.asText(data.subtitle);
	return undefined;
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
		title: getBlogTitle({ data }),
	}));
}

// additional tags for accessibility, discoverability on Feedly, etc.
export async function getCustomData(filename = 'feed.xml'): Promise<string> {
	const { data } = await prismic.getSingle('rss_feed_assets');
	const {
		accent_color: accentColor,
		cover_image: coverImage,
		icon,
		logo,
	} = data;

	return `
		<author><name>Jay Perry</name></author>
		<id>${import.meta.env.SITE}</id>
		<webfeeds:cover image="${coverImage.url}" />
		<webfeeds:icon>${icon.url}</webfeeds:icon>
		<webfeeds:logo>${logo.url}</webfeeds:logo>
		<webfeeds:accentColor>${accentColor.replace('#', '')}</webfeeds:accentColor>
		<webfeeds:related layout="card" target="browser" />
		<language>en-us</language>
		<atom:link href="${import.meta.env.SITE}/rss/${filename}" rel="self" type="application/rss+xml" />
	`;
}

export const title = 'Jay Perry';

export const xmlns = {
	content: 'http://purl.org/rss/1.0/modules/content/',
	webfeeds: 'http://webfeeds.org/rss/1.0',
	atom: 'http://www.w3.org/2005/Atom',
};
