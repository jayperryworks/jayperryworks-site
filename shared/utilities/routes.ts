// Routes
// -> global resolvers for page routes on this site
// -> transforms Prismic data into front-end page routes using their Link Resolver
// -> docs: https://prismic.io/docs/technologies/link-resolver-route-resolver#link-resolver

// types
import {
	DateField,
	PrismicDocument,
	PrismicDocumentWithUID,
} from '@prismicio/types';

// utils
import { format } from 'date-fns';
import * as prismicHelpers from '@prismicio/helpers';

// link/relationship data to fetch from Prismic to resolve page routes
// -> use in the config on the original query, e.g. prismic.getByUID(... { fetchLinks })
export const fetchLinks = [
	'blog_post.date',
	'design_project.start_date',
	'longform.date',
	'picture.date_completed',
	'use_color_theme',
	'home.site',
];

// create a url string from a date object, e.g. year/month/day
export function getDateParams(
	value: DateField,
	periods: Array<'year' | 'month' | 'day'>,
): string {
	const date = prismicHelpers.asDate(value);

	const formats = {
		year: 'yyyy',
		month: 'MM',
		day: 'dd',
	};

	const formatString = periods
		.map((period: string): string[] => {
			if (!formats[period])
				throw new Error(`Time period '${period}' was not found.`);
			return formats[period];
		})
		.join('/');

	return format(date, formatString);
}

// --- main pages
// -> export each route as an individual function so it can be called individually as needed
export function home({ uid, data }): string {
	const { site } = data;

	if (site === 'Design') return 'https://design.jayperry.works/';
	return '/';
}

// --- main pages
// -> export each route as an individual function so it can be called individually as needed
export function homepage(): string {
	return '/';
}

// top-level pages
export function page({ uid }: Partial<PrismicDocumentWithUID>): string {
	return `/${uid}/`;
}

export function indexPage({ uid }: Partial<PrismicDocumentWithUID>): string {
	if (uid === 'blog') return '/blog/page/1/';
	return `/${uid}/`;
}

// blog posts
export function blogPost({
	data,
	uid,
}: Partial<PrismicDocumentWithUID>): string {
	return `/blog/${getDateParams(data.date, ['year', 'month', 'day'])}/${uid}/`;
}

// development stage page
// -> note this does not included in the linkResolver below
// 		because there are no equivalent docs in Prismic, just a list of names
export function blogDevelopmentStage({
	uid,
}: Partial<PrismicDocumentWithUID>): string {
	return `/blog/stages/${uid}`;
}

// pictures
export function picture({
	data,
	uid,
}: Partial<PrismicDocumentWithUID>): string {
	return `/pictures/${getDateParams(data.date_completed, ['year', 'month'])}/${uid}/`;
}

// design
export function designProject({
	data,
	uid,
}: Partial<PrismicDocumentWithUID>): string {
	return `/work/${data.start_date}/${uid}/`;
}

// longform
export function longform({
	data,
	uid,
}: Partial<PrismicDocumentWithUID>): string {
	return `/longform/${getDateParams(data.date, ['year'])}/${uid}/1/`;
}

// picture series
export function pictureSeries({
	uid,
}: Partial<PrismicDocumentWithUID>): string {
	return `/pictures#${uid}`;
}

// --- link resolver for Prismic ---
export function linkResolver(doc: Partial<PrismicDocument>): string {
	const { type } = doc;

	const contentTypes = {
		home,
		homepage,
		longform,
		page,
		picture,
		blog_post: blogPost,
		design_project: designProject,
		index_page: indexPage,
		picture_series: pictureSeries,
	};

	return contentTypes[type](doc) || null;
}
