// utils
import { camelCase } from 'change-case';
import * as prismicHelpers from '@prismicio/helpers';

// types
import type { Block as BlockType } from '@lib/types';
import type { Slice, ImageField, RichTextField } from '@prismicio/types';

// --- block fields ---
function sharedBlockFields(slice: Slice): BlockType {
	const {
		prominence,
		display_mode: displayMode = 'flow',
		include_in_excerpt: includeInExcerpt,
	} = slice.primary;

	return {
		displayMode,
		prominence: prominence as BlockType['prominence'],
		includeInExcerpt: Boolean(includeInExcerpt),
		type: camelCase(slice.slice_type),
	};
}

function markdownText(text: RichTextField): string {
	if (text?.length > 0) {
		return prismicHelpers.asText(text);
	}

	return undefined;
}

// --- block types ---
function aside(slice: Slice): BlockType {
	const {
		structured_text: prismicText,
		markdown,
		label,
	} = slice.primary;

	return {
		label,
		text: {
			prismicText,
			markdown: markdownText(markdown as RichTextField),
		},
		...sharedBlockFields(slice),
	};
}

function billboard(slice: Slice): BlockType {
	const {
		cover_images_gutter: imagesGutter,
		title1,
		subtitle,
		call_to_action_label: label,
		link,
		description: prismicText,
	} = slice.primary;

	const images = slice.items.reduce((result, item) => {
		const {
			device = 'None',
			priority = '1',
			relative_size: relativeSize,
			cover_image: source,
		} = item;

		if ((source as ImageField).url === '') return result;

		result.push({
			device,
			priority,
			relativeSize,
			source,
		});
		return result;
	}, []);

	return {
		...sharedBlockFields(slice),
		images,
		imagesGutter,
		cta: {
			link,
			label,
		},
		description: {
			prismicText,
		},
		displayMode: 'slide',
		subtitle: prismicHelpers.asText(subtitle),
		title: prismicHelpers.asText(title1),
	};
}

function blockQuote(slice: Slice): BlockType {
	const {
		structured_text: prismicText,
		markdown,
	} = slice.primary;

	return {
		text: {
			prismicText,
			markdown: markdownText(markdown as RichTextField),
		},
		...sharedBlockFields(slice),
	};
}

function collage(slice: Slice): BlockType {
	const {
		caption,
		attribution,
		gutter,
	} = slice.primary;

	const images = slice.items.map((item) => {
		const {
			device = 'None',
			priority = '1',
			relative_size: relativeSize,
			image: source,
		} = item;

		return {
			device,
			priority,
			relativeSize,
			source,
		};
	});

	return {
		...sharedBlockFields(slice),
		gutter,
		images,
		attribution: markdownText(attribution as RichTextField),
		caption: markdownText(caption as RichTextField),
	};
}

function feed(slice: Slice): BlockType {
	const {
		title,
		subtitle,
		call_to_action_label: label,
		call_to_action_link: link,
		description: prismicText,
		content_source: contentSource,
	} = slice.primary;

	return {
		...sharedBlockFields(slice),
		cta: {
			link,
			label,
		},
		contentSource,
		description: {
			prismicText,
		},
		displayMode: 'slide',
		subtitle: prismicHelpers.asText(subtitle),
		title: prismicHelpers.asText(title),
	};
}

function figure(slice: Slice): BlockType {
	const { image, caption, attribution } = slice.primary;

	return {
		source: image,
		attribution: markdownText(attribution as RichTextField),
		caption: markdownText(caption as RichTextField),
		...sharedBlockFields(slice),
	};
}

function heading(slice: Slice): BlockType {
	const { title1: title, level, subheading } = slice.primary;

	return {
		title: prismicHelpers.asText(title as RichTextField),
		level: level || 2,
		subheading,
		...sharedBlockFields(slice),
	};
}

function imageGallery(slice: Slice): BlockType {
	const {
		attribution,
		caption,
		column_size: columnSize,
	} = slice.primary;

	return {
		attribution: markdownText(attribution as RichTextField),
		caption: markdownText(caption as RichTextField),
		columnSize,
		images: slice.items.map((item) => ({
			...item.image,
			device: item.device || 'None',
		})),
		...sharedBlockFields(slice),
	};
}

function passage(slice: Slice): BlockType {
	const {
		structured_text: prismicText,
		markdown,
	} = slice.primary;

	return {
		text: {
			prismicText,
			markdown: markdownText(markdown as RichTextField),
		},
		...sharedBlockFields(slice),
	};
}

function table(slice: Slice): BlockType {
	const {
		csv_file: CSVFile,
		key_columns: keyColumns,
		footer,
	} = slice.primary;

	return {
		CSVFile: prismicHelpers.asLink(CSVFile),
		keyColumns,
		footer,
		...sharedBlockFields(slice),
	};
}

// list of block types with functions for each
export default {
	image_gallery: imageGallery,
	quote: blockQuote,
	aside,
	billboard,
	collage,
	feed,
	figure,
	heading,
	passage,
	table,
};
