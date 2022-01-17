import { sentenceCase } from 'change-case';
import { format } from 'date-fns';
import arrayToSentence from 'array-to-sentence';
import calculateAspectRatio from 'calculate-aspect-ratio';
import convertColor from 'color-convert';
import errors from '@/utils/errorMessages.js'
import { query, getImageVersions, getEditionDimensions } from '@/utils/prismicQuery.js';
import render from '@/utils/renderMarkdown.js'
import generatePictureList from '@/utils/generatePictureList.js'

// build an object for the previous and next pages nav
function getPaginationData (page, direction) {
	return {
		direction,
		thumbnail: page.cover.image,
		label: page.title[0].text,
		path: `pictures/${page.yearCompleted}/${page.slug}/`,
		ratio: calculateAspectRatio(page.cover.image[0].width, page.cover.image[0].height).split(':').join('/')
	};
}

export async function get(req, res, next) {
	const { year, slug } = req.params;

	// query the data for this page
	let pageResponse = await query(`
	  query{
			picture(uid: "${slug}", lang: "en-us") {
				title
				cover
				highlight
				description
				orientation
				width
				height
				media {
					medium {
						...on Picture_medium {
							name
						}
					}
				}
				substrate {
					...on Picture_substrate {
						name
					}
				}
				series {
					... on Picture_series {
						title
						_meta {
							id
						}
					}
				}
				_meta {
					id
					tags
				}
				body {
					__typename
					... on PictureBodyEdition {
						type
						primary {
							name
							photo
							limit
							size {
								__typename
								... on Print_size {
									long_side
									short_side
									border
									base_price
									print_type {
										_linkType
										__typename
										... on Print_type {
											name
											description
											_meta {
												id
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`);

	let pageData = await pageResponse.data.picture;

	// query a list of all pictures for the previous/next links
	let listData = await generatePictureList();

	if (!pageData) {
		res.writeHead(404, header);
		res.end(JSON.stringify({
			message: errors.general
		}));
		return;
	}

	// create an empty object for the cleaned-up data we'll send to the client
	let content = {};

	content.title = pageData.title?.[0]?.text;
	content.tags = pageData._meta.tags;

	if (content.width) {
		content.width = pageData.width;
		content.height = pageData.height;
		content.aspect = (pageData.width/pageData.height);
	}

	// highlight color
	if (pageData.highlight) {
		// convert the color from a hex to hsl (array)...
		const highlightHSL = convertColor.hex.hsl(pageData.highlight);

		// ...and then to an object, so we can use each for CSS variables
		// -> e.g. --color-highlight-h
		content.highlight = highlightHSL.reduce((result, value, index) => {
			const key = Object.keys(result)[index];
			result[key] = value;
			return result;
		}, { h: null, s: null, l: null });
	}

	// cover image
	if (pageData.cover) {
		const versions = getImageVersions(pageData.cover);

		content.cover = {
			image: versions,
			alt: pageData.alt,
			aspectRatio: calculateAspectRatio(versions[0].width, versions[0].height)
		};
	}

	// render the markdown bits
	if (pageData.description) {
		content.description = render(pageData.description?.[0]?.text);
	}

	// picture format (media and substrate)
	if (pageData.media && pageData.substrate) {
		const media = arrayToSentence(pageData.media.map(item => item.medium.name));
		content.format = sentenceCase(`${media} on ${pageData.substrate.name}`);
	}

	// grab info about the print editions, if there are any
	if (pageData.body?.length > 0) {
		let printDescriptions = [];

		// get the resized versions of the edition images
		content.editions = pageData.body.map((edition) => {
			const { name, photo, size, limit } = edition.primary
			const dimensions = getEditionDimensions(pageData.orientation, size);

			if (!content.aspect) {
				content.aspect = dimensions.width / dimensions.height;
			}

			printDescriptions.push({
				type: size.print_type?.name?.[0].text,
				description: render(size.print_type?.description?.[0]?.text)
			});

			return {
				...dimensions,
				limit,
				border: size.border,
				name: name?.[0]?.text,
				photo: getImageVersions(photo),
				price: size.base_price,
				type: size.print_type?.name?.[0].text
			};
		});

		// get unique edition types for this picture, e.g. 'giclee'
		// -> https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#14438954
		content.printDescriptions = [...new Set(printDescriptions.map(JSON.stringify))].map(JSON.parse);
	}

	const currentPageIndex = listData.indexOf(
		listData.find(item => item.slug === slug)
	);

	if (currentPageIndex > 0) {
		content.prevPage = getPaginationData(
			listData[currentPageIndex - 1],
			'previous'
		);
	}

	if (currentPageIndex < listData.length - 1) {
		content.nextPage = getPaginationData(
			listData[currentPageIndex + 1],
			'next'
		);
	}

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(content));
}
