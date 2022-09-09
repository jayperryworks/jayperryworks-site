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
import prismic from './prismic.ts';

// link/relationship data to fetch from Prismic to resolve page routes
// -> use in the config on the original query, e.g. prismic.getByUID(... { fetchLinks })
export const fetchLinks = [
	'blog_post.date',
	'design_project.start_date',
	'longform.date',
	'picture.date_completed',
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

	const formatString = periods.map((period: string): string[] => {
		if (!formats[period]) throw new Error(`Time period '${period}' was not found.`);
		return formats[period];
	}).join('/');

	return format(date, formatString);
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
export function blogPost({ data, uid }: Partial<PrismicDocumentWithUID>): string {
	return `/blog/${getDateParams(data.date, ['year', 'month', 'day'])}/${uid}/`;
}

// pictures
export function picture({ data, uid }: Partial<PrismicDocumentWithUID>): string {
	return `/pictures/${getDateParams(data.date_completed, ['year', 'month'])}/${uid}/`;
}

// design
export function designProject({ data, uid }: Partial<PrismicDocumentWithUID>): string {
	return `/design/${data.start_date}/${uid}/`;
}

// longform
export function longform({ data, uid }: Partial<PrismicDocumentWithUID>): string {
	return `/longform/${getDateParams(data.date, ['year'])}/${uid}/1/`;
}

// --- link resolver for Prismic ---
export function linkResolverSync(doc: Partial<PrismicDocument>): string {
	const { type } = doc;

	const contentTypes = {
		homepage,
		longform,
		page,
		picture,
		blog_post: blogPost,
		design_project: designProject,
		index_page: indexPage,
	};

	return contentTypes[type](doc) || null;
}

// DEPRECATED: async version of linkResolver that fetches custom data as needed
// -> use fetchLinks in the original query to reduce round trips and async headaches
export async function linkResolver(doc: Partial<PrismicDocument>): Promise<string> {
	const { id, type } = doc;

	// describe each content type
	// -> needsData: boolean - does the route require document data, e.g. a date field?
	// -> getter: function - the getter function, defined above, returns a url string
	const contentTypes = {
		homepage: {
			getter: homepage,
			needsData: false,
		},
		page: {
			getter: page,
			needsData: false,
		},
		index_page: {
			getter: indexPage,
			needsData: false,
		},
		longform: {
			getter: longform,
			needsData: true,
		},
		design_project: {
			getter: designProject,
			needsData: true,
		},
		picture: {
			getter: picture,
			needsData: true,
		},
		blog_post: {
			getter: blogPost,
			needsData: true,
		},
	};

	// if there is no data prop on the document object, fetch that doc from Prismic
	if (contentTypes[type].needsData && !doc.data) {
		const response = await prismic.getByID(id);
		const { data } = response;
		return contentTypes[type].getter({ ...doc, data });
	}

	return contentTypes[type].getter(doc);
}
