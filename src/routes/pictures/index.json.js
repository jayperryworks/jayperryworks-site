import { format } from 'date-fns';
import { getEditionDimensions } from '../../utils/prismicQuery';
import calculateAspectRatio from 'calculate-aspect-ratio';
import errors from '@/utils/errorMessages.js';
import prismic, { getImageVersions, maxItemsPerResponse } from '@/utils/prismicQuery.js';

const header = { 'Content-Type': 'application/json' };

async function query(cursor = null, previousResponse = null) {
	const queryArguments = cursor
		? `sortBy: date_completed_DESC, after: "${cursor}"`
		: 'sortBy: date_completed_DESC';

	let response = await prismic(`
    query{
			allPictures(${queryArguments}) {
				pageInfo {
					hasNextPage
					endCursor
				}
				edges {
					node {
						title
						cover
						date_completed
						_meta {
							uid
						}
						series {
							... on Picture_series {
								_meta {
									id
								}
							}
						}
					}
				}
			}
		}
	`);

	// make a reference to the 'edges' and page info props of the response object
	// -> the edges are the actual content we need, page info is metadata
	let { edges, pageInfo } = await response.data.allPictures;

	// if a previous response was passed in, append it to our current response (edges array)
	if (previousResponse) {
		edges = [...previousResponse, ...edges];
	}

	// if we're done, stop and return the data
	if (!pageInfo.hasNextPage) {
		return edges;
	}

	// otherwise, recursively run this function again to fetch the next batch of data
	return await query(pageInfo.endCursor, edges);
}

export async function get(req, res) {
	// run the first request to see if the results are paginated
  const listData = await query();

  if (!listData) {
    res.writeHead(404, header);
    res.end(JSON.stringify({
      message: errors.general
    }));
    return;
  }

	// clean up listData to build an array of pictures
	let pictures = listData.map(({ node }) => {
		let picture = {};

		picture.title = node.title?.[0]?.text;
		picture.yearCompleted = format(new Date(node.date_completed), 'yyyy');
		picture.path = `/pictures/${picture.yearCompleted}/${node._meta.uid}/`;

		if (node.series) {
			picture.series = node.series._meta.id;
		}

		// cover image
		if (node.cover) {
			picture.cover = {
				image: getImageVersions(node.cover),
				alt: node.cover.alt
			};
			picture.ratio = calculateAspectRatio(picture.cover.image[0].width, picture.cover.image[0].height).split(':').join('/');
		}

		return picture;
	});

  // loop through pictures and clean up the data
  // so it's easier to work with on the client
	let seriesData = await prismic(`
		query{
			allPicture_seriess {
				edges {
					node {
						title
						description
						_meta {
							id
						}
					}
				}
			}
		}
	`);

	const picturesBySeries = seriesData.data.allPicture_seriess.edges.map(({ node }) => {
		const { title, description, _meta } = node;
		const seriesPictures = pictures.filter(picture => picture.series === _meta.id);

		return {
			title: title?.[0]?.text,
			description: description?.[0]?.text,
			ratio: seriesPictures?.[0]?.ratio,
			pictures: seriesPictures
		}
	});

	// add pictures to the array that aren't part of a series
	picturesBySeries.push({ pictures: pictures.filter(picture => !picture.series)});

	res.writeHead(200, header);

	res.end(JSON.stringify(picturesBySeries));
}
