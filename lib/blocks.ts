// utils
import { camelCase } from 'change-case';
import * as prismicHelpers from '@prismicio/helpers';

// types
import type {
	Block as BlockType,
	Device,
} from '@lib/types';

import type {
	ImageField,
	LinkField,
	RichTextField,
	SelectField,
	Slice,
	TitleField,
} from '@prismicio/types';

// --- block fields ---
function headingText(text: TitleField): string {
	if (prismicHelpers.isFilled.title(text)) {
		return prismicHelpers.asText(text);
	}

	return undefined;
}

function gutterSize(size: SelectField): string {
	if (prismicHelpers.isFilled.select(size)) {
		return size.toLowerCase();
	}

	return undefined;
}

function markdownText(text: RichTextField): string {
	if (prismicHelpers.isFilled.richText(text)) {
		return prismicHelpers.asText(text);
	}

	return undefined;
}

function sharedBlockFields(slice: Slice): BlockType {
	const {
		prominence,
		display_mode: displayMode = 'flow',
		include_in_excerpt: includeInExcerpt,
	} = slice.primary;

	return {
		displayMode: (displayMode as string).toLowerCase(),
		prominence: prominence as BlockType['prominence'],
		includeInExcerpt: Boolean(includeInExcerpt),
		type: camelCase(slice.slice_type),
	};
}

// --- block types ---
function aside(slice: Slice): BlockType {
	const {
		border,
		label,
		markdown,
		structured_text: prismicText,
		type_size: typeSize,
	} = slice.primary;

	return {
		border,
		label,
		text: {
			prismicText,
			markdown: markdownText(markdown as RichTextField),
		},
		typeSize,
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
		subtitle: headingText(subtitle as TitleField),
		title: headingText(title1 as TitleField),
	};
}

function blockQuote(slice: Slice): BlockType {
	const {
		structured_text: prismicText,
		attribution,
		markdown,
	} = slice.primary;

	return {
		text: {
			prismicText,
			markdown: markdownText(markdown as RichTextField),
		},
		attribution,
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
		images,
		attribution: markdownText(attribution as RichTextField),
		caption: markdownText(caption as RichTextField),
		gutter: gutterSize(gutter as SelectField),
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
		subtitle: headingText(subtitle as TitleField),
		title: headingText(title as TitleField),
	};
}

function figure(slice: Slice): BlockType {
	const {
		attribution,
		caption,
		image,
		device = 'None',
		border = false,
	} = slice.primary;

	const output = {
		border,
		device: device as Device,
		source: image,
		attribution: undefined,
		caption: undefined,
		...sharedBlockFields(slice),
	};

	if (prismicHelpers.isFilled.richText(attribution as RichTextField)) {
		output.attribution = { markdown: markdownText(attribution as RichTextField) };
	}

	if (prismicHelpers.isFilled.richText(caption as RichTextField)) {
		output.caption = { markdown: markdownText(caption as RichTextField) };
	}

	return output;
}

function heading(slice: Slice): BlockType {
	const {
		level,
		subheading,
		title1: text,
		id,
	} = slice.primary;

	return {
		...sharedBlockFields(slice),
		level: level || 2,
		id,
		subheading,
		text,
	};
}

function imageGallery(slice: Slice): BlockType {
	const {
		attribution,
		caption,
		column_size: columnSize,
		gutter,
	} = slice.primary;

	return {
		attribution: markdownText(attribution as RichTextField),
		caption: markdownText(caption as RichTextField),
		columnSize,
		gutter: gutterSize(gutter as string),
		images: slice.items.map((item) => ({
			...item.image as ImageField,
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

function pullquote(slice: Slice): BlockType {
	const {
		image,
		structured_text: prismicText,
		markdown,
	} = slice.primary;

	return {
		image,
		text: {
			prismicText,
			markdown: markdownText(markdown as RichTextField),
		},
		...sharedBlockFields(slice),
	};
}

function stickyNoteGallery(slice: Slice): BlockType {
	const {
		title,
		subtitle,
		description: prismicText,
	} = slice.primary;

	return {
		title,
		subtitle,
		description: { prismicText },
		notes: slice.items.map((item) => ({
			shortStatement: markdownText(item.short_statement as RichTextField),
			extendedStatement: markdownText(item.extended_statement as RichTextField),
		})),
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
		CSVFile: prismicHelpers.asLink(CSVFile as LinkField),
		keyColumns,
		footer,
		...sharedBlockFields(slice),
	};
}

function video(slice: Slice): BlockType {
	const {
		aspect_ratio: aspectRatio,
		attribution,
		border,
		caption,
		id,
		title1: title,
	} = slice.primary;

	const output = {
		aspectRatio,
		border,
		id,
		title,
		attribution: undefined,
		caption: undefined,
		...sharedBlockFields(slice),
	};

	if (prismicHelpers.isFilled.richText(attribution as RichTextField)) {
		output.attribution = { markdown: markdownText(attribution as RichTextField) };
	}

	if (prismicHelpers.isFilled.richText(caption as RichTextField)) {
		output.caption = { markdown: markdownText(caption as RichTextField) };
	}

	return output;
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
	pullquote,
	sticky_note_grid: stickyNoteGallery,
	table,
	video,
};
