import errors from '@/utils/errorMessages.js'
import prismic, { blockQueries, getImageVersions } from '@/utils/prismicQuery.js';
import render from '@/utils/renderMarkdown.js'
import { camelCase, paramCase } from 'change-case';

export async function get(req, res, next) {
	const { year, slug } = req.params

	let response = await prismic(`
	  query{
	    picture(uid: "${slug}", lang: "en-us") {
	      _linkType
	      title
	      cover
	      description
	      media
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

	let data = await response.data.picture;

	if (!data) {
		res.writeHead(404, header);
		res.end(JSON.stringify({
			message: errors.general
		}));
		return;
	}

	// create an empty object for the cleaned-up data we'll send to the client
	let content = {};

	content.title = data.title?.[0]?.text;
	content.tags = data._meta.tags;
	content.media = data.media;

	if (data.cover) {
		content.cover = {
			image: getImageVersions(data.cover),
			alt: data.alt
		};
	}

	// render the markdown bits
	if (data.description) {
		content.description = render(data.description?.[0]?.text);
	}

	// grab info about the print editions, if there are any
	if (data.body?.length > 0) {
		let printDescriptions = [];

		// get the resized versions of the edition images
		content.editions = data.body.map((edition) => {
			const { name, photo, size } = edition.primary
			
			printDescriptions.push({
				type: size.print_type?.name?.[0].text,
				description: render(size.print_type?.description?.[0]?.text)
			});
			
			return {
				name: name?.[0]?.text,
				photo: getImageVersions(photo),
				width: size.width,
				height: size.height,
				border: size.border,
				price: size.base_price
			};

		});

		// get unique edition types for this picture, e.g. 'giclee'
		// -> https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#14438954
		content.printDescriptions = [...new Set(printDescriptions.map(JSON.stringify))]
	}

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(content));
}
