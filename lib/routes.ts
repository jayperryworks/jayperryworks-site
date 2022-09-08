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

// create a url string from a date object, e.g. year/month/day
function getDateParams(
	value: DateField,
	periods: Array<'year' | 'month' | 'day'>,
): string {
	const date = prismicHelpers.asDate(value);

	const formats = {
		year: 'yyyy',
		month: 'MM',
		day: 'dd',
	};

	return periods.map((period: string): string => {
		if (!formats[period]) throw new Error(`Time period '${period}' was not found.`);
		return format(date, formats[period]);
	}).join('/');
}

// --- main pages
export function homepage() {
	return '/';
}

export function page({ uid }: PrismicDocument) {
	return `/${uid}/`;
}

export function indexPage({ uid }: PrismicDocumentWithUID) {
	if (uid === 'blog') return '/blog/page/1';
	return `/${uid}/`;
}

// --- blog
export function blogPost({ data, uid }: PrismicDocumentWithUID): string {
	return `/blog/${getDateParams(data.date, ['year', 'month', 'day'])}/${uid}/`;
}

// --- pictures
export function picture({ data, uid }: PrismicDocumentWithUID): string {
	return `/pictures/${getDateParams(data.date_completed, ['year', 'month'])}/${uid}/`;
}

// --- design
export function designProject({ data, uid }: PrismicDocumentWithUID): string {
	return `/design/${data.start_date}/${uid}/`;
}

// --- longform
export function longform({ data, uid }: PrismicDocumentWithUID): string {
	return `/longform/${getDateParams(data.date, ['year'])}/${uid}/1`;
}

// --- link resolver for Prismic
export async function linkResolver(doc: PrismicDocument): Promise<string> {
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
