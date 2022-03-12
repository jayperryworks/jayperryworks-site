import errors from '@/utils/errorMessages.js'
import { query, getString, convertColorToHSL, renderBlockContent, blockQueries } from '@/utils/prismicQuery.js';

export async function get ({ params }, res) {
	const { id } = params;

	const header = { 'Content-Type': 'application/json' };

	const response = await query(`
		query{
			allLongform_chapters(id: "${id}") {
				edges {
					node {
						title
						subtitle
						highlight_color
						primary_foreground_color
						secondary_foreground_color
						background_color
						test_text
						body {
							${Object.keys(blockQueries).map((name) => {
								return blockQueries[name]('Longform_chapterBody');
							})}
						}
					}
				}
			}
		}
	`);

	if (!response) {
		res.writeHead(404, header);
		res.end(JSON.stringify({
			message: errors.general
		}));
		return;
	}

	// clean up field names in the response data
	const {
		title,
		subtitle,
		highlight_color: highlight,
		primary_foreground_color: primary,
		secondary_foreground_color: secondary,
		background_color: bg,
		test_text: testText,
		body
	} = response.data.allLongform_chapters.edges[0].node;

	let chapter = {};

	chapter.title = title && getString(title);
	chapter.subtitle = subtitle && getString(subtitle);
	chapter.testText = testText;

	// consolidate color fields into a single theme object
	const theme = {
		bg,
		primary,
		secondary,
		highlight
	};

	// add the theme object to the chapter data
	// -> assign to chapter.theme only the color values that have been set
	// -> and convert each to HSL objects
	// -> e.g. if only 'bg' is set, then chapter.theme = { bg: {h, s, l} }
	chapter.theme = Object.keys(theme).reduce((result, role) => {
		if (theme[role]) {
			result[role] = convertColorToHSL(theme[role]);
		}

		return result;
	}, {});

	// if these colors aren't specified in the Prismic data, derive each from the bg color
	const themeFallbacks = {
		primary: 25,
		secondary: 45,
		border: (chapter.theme?.bg?.l - 20) || 40,
		shadow: (chapter.theme?.bg?.l - 10) || 10
	};

	Object.keys(themeFallbacks).forEach((role) => {
		if (!chapter.theme[role]) {
			chapter.theme[role] = chapter.theme.bg && {
				...chapter.theme.bg,
				l: themeFallbacks[role]
			}
		}
	});

	chapter.body = renderBlockContent(body);

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(chapter));
}
