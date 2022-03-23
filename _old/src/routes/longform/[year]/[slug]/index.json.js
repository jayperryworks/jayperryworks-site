import errors from '@/utils/errorMessages.js'
import { query, getImageVersions, getString, convertColorToHSL } from '@/utils/prismicQuery.js';

export async function get(req, res) {
	const header = { 'Content-Type': 'application/json' };

	const { slug } = req.params;

	const projectData = await query(`
		query{
			longform(uid: "${slug}", lang: "en-us") {
				title
				subtitle
				date
				cover_image
				chapter_label
				chapters {
					chapter {
						...on Longform_chapter {
							title
							subtitle
							background_color
							primary_foreground_color
							secondary_foreground_color
							highlight_color
							_meta {
								id
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

	const {
		title,
		subtitle,
		date,
		cover_image: cover,
		chapter_label: chapterLabel,
		chapters
	} = projectData.data.longform;

	const project = {
		title: title && getString(title),
		subtitle: subtitle && getString(subtitle),
		chapterLabel,
		date,
		cover: cover && {
			image: getImageVersions(cover),
			alt: cover.alt
		},
		chapters: chapters.map(({ chapter }) => {
			const {
				_meta,
				title,
				subtitle,
				background_color: background,
				highlight_color:highlight,
				primary_foreground_color: primary,
				secondary_foreground_color: secondary
			} = chapter;

			return {
				uid: _meta.uid,
				id: _meta.id,
				title: title && getString(title),
				subtitle: subtitle && getString(subtitle),
				theme: {
					background: background && convertColorToHSL(background),
					highlight: highlight && convertColorToHSL(highlight),
					primary: primary && convertColorToHSL(primary),
					secondary: secondary && convertColorToHSL(secondary)
				}
			}
		})
	};


	res.writeHead(200, header);
	res.end(JSON.stringify(project));
}
