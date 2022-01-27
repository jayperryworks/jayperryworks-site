import { format } from 'date-fns';
import convertColor from 'color-convert';
import errors from '@/utils/errorMessages.js'
import { query, getImageVersions, getString } from '@/utils/prismicQuery.js';
import render from '@/utils/renderMarkdown.js'
import { query_selector_all } from 'svelte/internal';

export async function get(req, res) {
	const header = { 'Content-Type': 'application/json' };

	const { slug, year } = req.params;

	const projectData = await query(`
		query{
			longform(uid: "${slug}", lang: "en-us") {
				title
				subtitle
				date
				cover_image
				highlight_color
				primary_foreground_color
				secondary_foreground_color
				background_color
				chapter_label
				chapters {
					chapter {
						...on Longform_chapter {
							title
							subtitle
							background_color
							primary_foreground_color
							highlight_color
							_meta {
								uid
							}
						}
					}
				}
			}
		}
	`);

	if (!projectData) {
		res.writeHead(404, header);
		res.end(JSON.stringify({
			message: errors.general
		}));
		return;
	}

	const { longform } = projectData.data;
	const project = {};

	project.title = longform.title && getString(longform.title);
	project.subtitle = longform.subtitle && getString(longform.subtitle);

	res.writeHead(200, header);
	res.end(JSON.stringify(project));
}
