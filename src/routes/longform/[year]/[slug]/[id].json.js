import errors from '@/utils/errorMessages.js'
import { query, getString, convertColorToHSL, renderBlockContent, blockQueries } from '@/utils/prismicQuery.js';

export async function get ({ params }, res) {
	const { id } = params;
	const header = { 'Content-Type': 'application/json' };

	// do this on the client/preload:
	// query the project and get list of chapters
	// populate nav with chapters list
	// find the current chapter in the list and get it's ID
	// -> (chapters[number - 1].id)
	// get the chapter server route for for page content

	const contentType = 'Longform_chapter'

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
		display_title: displayTitle,
		highlight_color: highlight,
		primary_foreground_color: primary,
		secondary_foreground_color: secondary,
		background_color: background,
		body
	} = response.data.allLongform_chapters.edges[0].node;

	let chapter = {};

	if (displayTitle) {
		chapter.title = title && getString(title);
		chapter.subtitle = subtitle && getString(subtitle);
	}

	chapter.theme = {
		highlight: highlight && convertColorToHSL(highlight),
		primary: primary && convertColorToHSL(primary),
		secondary: secondary && convertColorToHSL(secondary),
		background: background && convertColorToHSL(background)
	}

	chapter.body = renderBlockContent(body);

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(chapter));
}
