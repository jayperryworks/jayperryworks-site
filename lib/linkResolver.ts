import { format } from 'date-fns';
import * as prismicHelpers from '@prismicio/helpers';

type Period = 'year' | 'month' | 'day';

function getDateParams(value, periods: Period[]): string {
	const date = prismicHelpers.asDate(value);

	const formats = {
		year: 'yyyy',
		month: 'MM',
		day: 'dd',
	};

	return periods
		.map((period) => {
			if (formats[period]) {
				return format(date, formats[period]);
			}

			throw new Error(`Time period '${period}' was not found.`);
		})
		.join('/');
}

export function blogPost({ data, uid }): string {
	return `/blog/${getDateParams(data.date, ['year', 'month', 'day'])}/${uid}/`;
}

export function picture({ data, uid }): string {
	return `/pictures/${getDateParams(data.date, ['year'])}/${uid}/`;
}

export function designProject({ data, uid }): string {
	return `/design/${getDateParams(data.date, ['year'])}/${uid}/`;
}

export function longform({ data, uid }): string {
	return `/longform/${getDateParams(data.date, ['year'])}/${uid}/1`;
}

export default function linkResolver(doc): string {
	const { type, uid, data } = doc;

	console.log(doc)

	const types = {
		page: `/${uid}/`,
		index_page: `/${uid}/`,
		blog: '/blog/page/1/',
		blog_post: blogPost({ uid, data }),
		longform: longform({ data, uid }),
		design_project: designProject({ uid, data }),
		picture: picture({ uid, data }),
	};

	return types[type];
}
