// types
import { PrismicDocument } from '@prismicio/types';

// utils
import { format } from 'date-fns';
import * as prismicHelpers from '@prismicio/helpers';
import prismic from './prismic.ts';

// create a url string from a date object, e.g. year/month/day
function getDateParams(value, periods: Array<'year' | 'month' | 'day'>): string {
	const date = prismicHelpers.asDate(value);

	const formats = {
		year: 'yyyy',
		month: 'MM',
		day: 'dd',
	};

	return periods
		.map((period) => {
			if (!formats[period]) throw new Error(`Time period '${period}' was not found.`);
			return format(date, formats[period]);
		})
		.join('/');
}

export const mainNav = [
	{
		label: 'Home',
		path: '/',
		show: 'small',
	},
	{
		label: 'Patapsco essay',
		path: '/longform/2022/patapsco/1',
		slug: 'patapsco',
	},
	{
		label: 'Prints &amp; paintings',
		path: '/pictures',
		slug: 'pictures',
	},
	{
		label: 'Design',
		path: '/design',
		slug: 'design',
	},
	{
		label: 'Blog',
		path: '/blog/page/1',
		slug: 'blog',
	},
	{
		label: 'About',
		path: '/about',
		slug: 'about',
	},
];

// --- main pages
export function homepage() {
	return '/';
}

export function page({ uid }: PrismicDocument) {
	return `/${uid}/`;
}

export function indexPage({ uid }: PrismicDocument) {
	if (uid === 'blog') return '/blog/page/1';
	return `/${uid}/`;
}

// --- blog
export function blogPost({ data, uid }: PrismicDocument): string {
	return `/blog/${getDateParams(data.date, ['year', 'month', 'day'])}/${uid}/`;
}

// --- pictures
export function picture({ data, uid }: PrismicDocument): string {
	return `/pictures/${getDateParams(data.date, ['year'])}/${uid}/`;
}

// --- design
export function designProject({ data, uid }: PrismicDocument): string {
	return `/design/${getDateParams(data.date, ['year'])}/${uid}/`;
}

// --- longform
export function longform({ data, uid }: PrismicDocument): string {
	return `/longform/${getDateParams(data.date, ['year'])}/${uid}/1`;
}

// --- link resolver for Prismic
export async function linkResolver(doc): Promise<string> {
	const { id, type } = doc;

	const types = {
		homepage,
		longform,
		page,
		picture,
		blog_post: blogPost,
		design_project: designProject,
		index_page: indexPage,
	};

	// if there is no data prop on the document object, fetch that doc from Prismic
	if (!doc.data) {
		const response = await prismic.getByID(id);
		const { data } = response;
		return types[type]({ ...doc, data });
	}

	return types[type](doc);
}
