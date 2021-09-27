import errors from '@/utils/errorMessages.js'
import prismic, { blockQueries, getImageVersions } from '@/utils/prismicQuery.js';
import render from '@/utils/renderMarkdown.js'

import arrayToSentence from 'array-to-sentence';
import calculateAspectRatio from 'calculate-aspect-ratio';
import { camelCase, paramCase, noCase, sentenceCase } from 'change-case';

// set width and height depending on Landscape/Portrait orientation
function getEditionDimensions (orientation, { long_side, short_side }) {
	if (orientation === 'Portrait') {
		return {
			height: long_side,
			width: short_side
		}
	}

	return {
		width: long_side,
		height: short_side
	}
}

function paginationData (page, direction) {
	const versions = getImageVersions(page.cover)

	return {
		direction,
		thumbnail: versions,
		label: page.title[0].text,
		path: `pictures/${page.year_completed}/${page._meta.uid}/`,
		aspectRatio: calculateAspectRatio(versions[0].width, versions[0].height)
	}
}

export async function get(req, res, next) {
	const { year, slug } = req.params

	// query the data for this page
	let pageResponse = await prismic(`
	  query{
		  picture(uid: "${slug}", lang: "en-us") {
		    _linkType
		    title
		    cover
		    description
		    width
		    height
		    media {
		      medium
		    }
		    substrate
		    series {
		      ... on Picture_series {
		        title
		        _meta {
		          uid
		        }
		      }
		    }
		    _meta {
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
		          orientation
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

	// queries a list of all pictures for the previous/next links
	let listResponse = await prismic(`
		query{
	    allPictures(sortBy: year_completed_DESC) {
	      edges {
	        node {
	          title
	          cover
	          year_completed
	          _meta {
	            uid
	          }
	          series {
	            _linkType
	            ... on Picture_series {
	              title
	              _meta {
	                uid
	              }
	            }
	          }
	          _linkType
	        }
	      }
	    }
		}
	`);

	let pageData = await pageResponse.data.picture;
	let listData = await listResponse.data.allPictures.edges;

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
	content.width = pageData.width;
	content.height = pageData.height;

	if (pageData.cover) {
		const versions = getImageVersions(pageData.cover)

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

	if (pageData.media && pageData.substrate) {
		const media = arrayToSentence(pageData.media.map(item => item.medium));
		content.format = sentenceCase(`${media} on ${pageData.substrate}`);
		console.log(content.format)
	}

	// grab info about the print editions, if there are any
	if (pageData.body?.length > 0) {
		let printDescriptions = [];

		// get the resized versions of the edition images
		content.editions = pageData.body.map((edition) => {
			const { name, photo, size, orientation, limit } = edition.primary
			
			printDescriptions.push({
				type: size.print_type?.name?.[0].text,
				description: render(size.print_type?.description?.[0]?.text)
			});
			
			return {
				...getEditionDimensions(orientation, size),
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
		listData.find(item => item.node._meta.uid === slug)
	)

	if (currentPageIndex >= 0) {
		content.prevPage = paginationData(
			listData[currentPageIndex - 1].node,
			'previous'
		)
	}

	if (currentPageIndex <= listData.length - 1) {
		content.nextPage = paginationData(
			listData[currentPageIndex + 1].node,
			'next'
		)
	}

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(content));
}
