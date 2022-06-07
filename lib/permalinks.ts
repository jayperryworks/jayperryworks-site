import { format } from 'date-fns';

export function blog({ data, uid }): string {
	const date = new Date(data.date);
	const year = format(date, 'yyyy');
	const month = format(date, 'MM');
	const day = format(date, 'dd');

	return `/blog/${year}/${month}/${day}/${uid}/`;
}

export function picture(): string {
	return '/pictures/year/uid/';
}
