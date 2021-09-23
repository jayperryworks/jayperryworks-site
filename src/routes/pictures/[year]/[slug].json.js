import errors from '@/utils/errorMessages.js'
import prismic, { blockQueries, getImageVersions } from '@/utils/prismicQuery.js';
import render from '@/utils/renderMarkdown.js'
import { camelCase, paramCase } from 'change-case';

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
	      media
	      series {
	      	...on Picture_series {
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
	            size {
	              __typename
	              ... on Print_size {
	                width
	                height
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
	content.media = pageData.media;

	if (pageData.cover) {
		content.cover = {
			image: getImageVersions(pageData.cover),
			alt: pageData.alt
		};
	}

	// render the markdown bits
	if (pageData.description) {
		content.description = render(pageData.description?.[0]?.text);
	}

	// grab info about the print editions, if there are any
	if (pageData.body?.length > 0) {
		let printDescriptions = [];

		// get the resized versions of the edition images
		content.editions = pageData.body.map((edition) => {
			const { name, photo, size } = edition.primary
			
			printDescriptions.push({
				type: size.print_type?.name?.[0].text,
				description: render(size.print_type?.description?.[0]?.text)
			});
			
			return {
				border: size.border,
				height: size.height,
				name: name?.[0]?.text,
				photo: getImageVersions(photo),
				price: size.base_price,
				type: size.print_type?.name?.[0].text,
				width: size.width
			};

		});

		// get unique edition types for this picture, e.g. 'giclee'
		// -> https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#14438954
		content.printDescriptions = [...new Set(printDescriptions.map(JSON.stringify))].map(JSON.parse);
	}

	const currentPageIndex = listData.indexOf(
		listData.find(item => item.node._meta.uid === slug)
	)
	content.prevPage = currentPageIndex >= 0
		? listData[currentPageIndex - 1]
		: null;
	content.nextPage = currentPageIndex <= listData.length - 1
		? listData[currentPageIndex + 1]
		: null;

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(content));
}
