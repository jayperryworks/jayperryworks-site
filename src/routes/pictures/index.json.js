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
				totalCount
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
								title
								description
								_meta {
									uid
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
		// need to figure this out
		// https://medium.com/@voiceofreason3141/practical-asynchronous-recursion-in-javascript-b0bfc1dde702
		return new Promise((resolve, reject) => { resolve(edges) });
	}

	// otherwise, recursively run this function again to fetch the next batch of data
	await query(pageInfo.endCursor, edges);
}

export async function get(req, res) {
	// run the first request to see if the results are paginated
  let listData = await query();
	console.log(listData);

  if (!listData) {
    res.writeHead(404, header);
    res.end(JSON.stringify({
      message: errors.general
    }));
    return;
  }

	// if the results are paginated, do more requests to get the rest of the picture data
	// if (pageInfo.hasNextPage) {
	// 	let cursor = pageInfo.endCursor;

	// 	for (let i = 0; i < Math.floor(totalCount / maxItemsPerResponse); i++) {
	// 		let response = await query(cursor);
	// 		listData = [...listData, ...response.edges];
	// 		cursor = response.pageInfo.endCursor;
	// 	}
	// }

  // loop through pictures and clean up the data
  // so it's easier to work with on the client
  let series = []; // empty array that we'll populate in the loop below
  let pictures = listData.map(({ node: pictureData }) => {
    let picture = {};

    picture.title = pictureData.title?.[0]?.text;
		picture.yearCompleted = format(new Date(pictureData.date_completed), 'yyyy');
    picture.path = `/pictures/${picture.yearCompleted}/${pictureData._meta.uid}/`;

    // cover image
    if (pictureData.cover) {
      picture.cover = {
        image: getImageVersions(pictureData.cover),
        alt: pictureData.cover.alt
      };
			picture.ratio = calculateAspectRatio(picture.cover.image[0].width, picture.cover.image[0].height).split(':').join('/');
    }

    // series data
    if (pictureData.series) {
      const { title, description, _meta } = pictureData.series;

      picture.series = _meta.uid;
      // add to the separate series array
      series.push({
        title: title?.[0]?.text,
        description: description?.[0]?.text,
        uid: _meta.uid
      });
    }

    return picture;
  });

	// create an array of series, removing duplicate values
  series = [...new Set(series.map(JSON.stringify))].map(JSON.parse);

	res.writeHead(200, header);

	res.end(JSON.stringify({ pictures, series }));
}
