// utils
import { camelCase } from "change-case";
import * as prismicHelpers from "@prismicio/helpers";

// types
import type { Block as BlockType, Prominence } from "@shared/lib/types";

import type {
	ImageField,
	LinkField,
	RichTextField,
	SelectField,
	Slice,
	TitleField,
} from "@prismicio/types";

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
		display_mode: displayMode = "flow",
		include_in_excerpt: includeInExcerpt,
	} = slice.primary;

	return {
		displayMode: (displayMode as string).toLowerCase(),
		includeInExcerpt: Boolean(includeInExcerpt),
		prominence: prominence as Prominence,
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

function bibliography(slice: Slice): BlockType {
	return {
		items: slice.items.map(
			({
				link,
				media_type: media,
				series_title: series,
				source_author: author,
				source_title: title,
			}) => ({
				author,
				link,
				media,
				series,
				title,
			}),
		),
		...sharedBlockFields(slice),
		prominence: "Large",
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
		preset_color_theme,
		use_color_theme,
	} = slice.primary;

	const images = slice.items.reduce((result, item) => {
		const {
			frame = "None",
			priority = "1",
			relative_size: relativeSize,
			cover_image: source,
			dark_mode_cover_image: darkModeSource,
			use_image_aspect_ratio: useImageAspectRatio = false,
		} = item;

		if ((source as ImageField).url === "") return result;

		result.push({
			frame,
			priority,
			relativeSize,
			source,
			darkModeSource,
			useImageAspectRatio,
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
		displayMode: "slide",
		subtitle: headingText(subtitle as TitleField),
		title: headingText(title1 as TitleField),
		theme: {
			name: preset_color_theme || undefined,
			link: prismicHelpers.isFilled.contentRelationship(use_color_theme)
				? use_color_theme.id
				: undefined,
		},
	};
}

function blockQuote(slice: Slice): BlockType {
	const { structured_text: prismicText, attribution, markdown } = slice.primary;

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
	const { caption, attribution, gutter } = slice.primary;

	const images = slice.items.map((item) => {
		const {
			frame = "None",
			priority = "1",
			relative_size: relativeSize,
			image: source,
			use_image_aspect_ratio: useImageAspectRatio = false,
		} = item;

		return {
			frame,
			priority,
			relativeSize,
			source,
			useImageAspectRatio,
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
		preset_color_theme,
		use_color_theme,
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
		displayMode: "slide",
		subtitle: headingText(subtitle as TitleField),
		title: headingText(title as TitleField),
		theme: {
			name: preset_color_theme || undefined,
			link: prismicHelpers.isFilled.contentRelationship(use_color_theme)
				? use_color_theme.id
				: undefined,
		},
	};
}

function figure(slice: Slice): BlockType {
	const {
		attribution,
		caption,
		image,
		image_dark_mode,
		border = false,
		frame = "None",
		use_image_aspect_ratio = false,
	} = slice.primary;

	const output = {
		border,
		frame,
		source: image,
		darkModeSource: image_dark_mode,
		attribution: undefined,
		caption: undefined,
		useImageAspectRatio: use_image_aspect_ratio,
		...sharedBlockFields(slice),
	};

	if (prismicHelpers.isFilled.richText(attribution as RichTextField)) {
		output.attribution = {
			markdown: markdownText(attribution as RichTextField),
		};
	}

	if (prismicHelpers.isFilled.richText(caption as RichTextField)) {
		output.caption = { markdown: markdownText(caption as RichTextField) };
	}

	return output;
}

function heading(slice: Slice): BlockType {
	const { id, level, size, subheading, title1: text } = slice.primary;

	return {
		...sharedBlockFields(slice),
		level: level || 2,
		id,
		size,
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
		frame = "None",
		use_image_aspect_ratio: useImageAspectRatio = false,
	} = slice.primary;

	return {
		attribution: markdownText(attribution as RichTextField),
		caption: markdownText(caption as RichTextField),
		columnSize,
		frame,
		gutter: gutterSize(gutter as string),
		images: slice.items.map((item) => ({
			image: item.image,
			darkModeImage: item.dark_mode_image,
		})),
		useImageAspectRatio,
		...sharedBlockFields(slice),
	};
}

function passage(slice: Slice): BlockType {
	const { structured_text: prismicText, markdown } = slice.primary;

	return {
		text: {
			prismicText,
			markdown: markdownText(markdown as RichTextField),
		},
		...sharedBlockFields(slice),
	};
}

function pullquote(slice: Slice): BlockType {
	const { image, structured_text: prismicText, markdown } = slice.primary;

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
	const { title, subtitle, description: prismicText } = slice.primary;

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
	const { csv_file: CSVFile, key_columns: keyColumns, footer } = slice.primary;

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
		output.attribution = {
			markdown: markdownText(attribution as RichTextField),
		};
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
	bibliography,
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
