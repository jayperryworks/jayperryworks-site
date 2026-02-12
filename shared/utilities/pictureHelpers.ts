// types
import type { PrismicDocument, PrismicDocumentWithUID } from '@prismicio/types';

// utilities
import * as prismicHelpers from '@prismicio/helpers';
import { arrayToSentence } from './stringHelpers.ts';

// helper functions
export function pictureMediaString({ data }: Partial<PrismicDocument>): string {
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
export function pictureDescription({ data, tags }: Partial<PrismicDocumentWithUID>): string {
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
