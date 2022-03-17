const { camelCase, paramCase } = require('change-case');
const { createPrismicLink } = require('apollo-link-prismic');
const { InMemoryCache, IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');
const ApolloClient = require('apollo-client');
const convertColor = require('color-convert');
const fetch = require('node-fetch');
const fragmentTypes = require('./prismicFragments.json');
const gql = require('graphql-tag');
const markdown = require('./renderMarkdown.js');
const prismicHelpers = require('@prismicio/helpers');

const accessToken = process.env.PRISMIC_TOKEN;

const fragmentMatcher = new IntrospectionFragmentMatcher(
  { introspectionQueryResultData: fragmentTypes },
);

const client = new ApolloClient({
	link: createPrismicLink({
    repositoryName: 'jpw-api',
    accessToken,
		fetch
  }),
  cache: new InMemoryCache({ fragmentMatcher })
});

async function query(queryString) {
	return await client.query({
		query: gql`${queryString}`
	})
}

function getImageVersions (
  imageField,
  versions = ['Small', 'Medium', 'Large']
) {
  if (imageField[versions[0]]) {
    return versions.map((version) => {
      return {
        path: imageField[version].url,
        width: imageField[version].dimensions.width,
        height: imageField[version].dimensions.height
      }
    })
  }

  // if the image doesn't have versions, return the original
  return [
    {
      path: imageField.url,
      size: imageField.dimensions.width
    }
  ]
}

// set width and height of a Picture Print Edition depending on Landscape/Portrait orientation
function getEditionDimensions (orientation, { long_side, short_side }) {
	if (orientation === 'Portrait') {
		return {
			height: long_side,
			width: short_side
		};
	}

	return {
		width: long_side,
		height: short_side
	};
}

// return the literal text from a Prismic Title or Key Text field
// -> the API response is an array of objects with 'text' props
function getString(field) {
	return field.map(({ text }) => text).join('');
}

function renderMarkdown(field) {
	return markdown(getString(field));
}

function htmlSerializer(type, element, content, children) {
	if (element.data?.label === 'note') {
		//  remove the parentheses and add a period so it reads as a sentence.
		const label = children.toString().replace('(', '').replace(')', '').concat('.');
		// capitalize the first letter
		label.charAt(0).toUpperCase();
		return `
				<button class="note">
					<svg class="note-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke-width="2"><line x1="16" y1="8" x2="0" y2="8" stroke="currentColor"></line><line x1="8" y1="0" x2="8" y2="16" stroke="currentColor"></line></g></svg>
					<span class="note-flyout center">${label}</span>
				</button>
			`
	}

	return null
}

const blockQueries = {
  heading: (contentTypeName = 'PageBody', blockName = 'Heading') => `
    ...on ${contentTypeName}${blockName} {
      type
      primary {
        title1
        level
        subheading
      }
    }
  `,
  passage: (contentTypeName = 'PageBody', blockName = 'Passage') => `
    ... on ${contentTypeName}${blockName} {
      type
      primary {
        markdown
				structured_text
        include_in_excerpt
      }
    }
  `,
  quote: (contentTypeName = 'PageBody', blockName = 'Quote') => `
    ... on ${contentTypeName}${blockName} {
      type
      primary {
        markdown
				attribution
				include_in_excerpt
      }
    }
  `,
  figure: (contentTypeName = 'PageBody', blockName = 'Figure') => `
    ... on ${contentTypeName}${blockName} {
      type
      primary {
        image
        prominence
        caption
        attribution
        include_in_excerpt
      }
    }
  `,
  imageGallery: (contentTypeName = 'PageBody', blockName = 'Image_gallery') => `
    ... on ${contentTypeName}${blockName} {
      type
      primary {
        caption
        attribution
        prominence
        column_size
      }
      fields {
        image
      }
    }
  `
}

function getSliceWidth(prominence) {
	const widths = {
		Small: 'small',
		Medium: 'medium',
		Large: 'large'
	}

	return widths[prominence] || 'default'
}

function getSharedSliceFields (slice) {
	return {
		includeInExcerpt: slice.primary.include_in_excerpt || false,
		prominence: getSliceWidth(slice.primary.prominence),
		type: camelCase(slice.type)
	}
}

function renderBlockContent (blocks) {
	return blocks.map((slice) => {
		switch (slice.type) {
			case 'passage': {
				slice = {
					html: slice.primary.structured_text
						? prismicHelpers.asHTML(slice.primary.structured_text, null, htmlSerializer)
						: renderMarkdown(slice.primary.markdown),
					...getSharedSliceFields(slice)
				};
				break;
			}
			case 'quote': {
				slice = {
					html: renderMarkdown(slice.primary.markdown),
					attribution: slice.primary.attribution,
					...getSharedSliceFields(slice)
				}
				break;
			}
			case 'figure': {
				slice = {
					alt: slice.primary.image.alt,
					attribution: slice.primary.attribution,
					border: slice.primary.border || false,
					caption: slice.primary.caption
						? renderMarkdown(slice.primary.caption)
						: null,
					image: getImageVersions(slice.primary.image),
					...getSharedSliceFields(slice)
				};
				break;
			}
			case 'image_gallery': {
				slice = {
					caption: slice.primary.caption
						? renderMarkdown(slice.primary.caption)
						: null,
					attribution: slice.primary.attribution,
					columnSize: paramCase(slice.primary.column_size),
					images: slice.fields.map((item) => {
						return {
							image: getImageVersions(item.image),
							alt: item.image.alt
						}
					}),
					...getSharedSliceFields(slice)
				}
			}
		}

		return slice;
	})
}

function convertColorToHSL (hex) {
	// convert the color from a hex to hsl (array)...
	const hsl = convertColor.hex.hsl(hex);

	// ...and then to an object, so we can use each for CSS variables
	// -> e.g. --color-highlight-h
	return hsl.reduce((result, value, index) => {
		const key = Object.keys(result)[index];
		result[key] = value;
		return result;
	}, { h: null, s: null, l: null });
}

// Query all documents of a certain type from Prismic
// -> prismic returns a max of 20 docs for any "all[TYPE]" query, so we need to make additional calls to get the rest if there are more than 20
// -> the below is recursive and continues calling itself if `previousResponse` is true, combining the results into a single object it returns when it's done.
async function queryAll ({
	cursor = null,
	fieldString = '',
	previousResponse = null,
	sortBy = 'date_completed_DESC',
	type = 'allPictures'
} = {}) {

	// set up the arguments for the graphql query, including the 'cursor' if this is not the first call
	// the 'cursor' is retrieved from the previous query and marks where the new query should start
	const queryArguments = cursor
		? `sortBy: ${sortBy}, after: "${cursor}"`
		: `sortBy: ${sortBy}`;

	// construct a graphql query string from the parameters object, including `pageInfo` metadata fields to tell us where we are in the sequence
	let response = await query(`
    query{
			${type}(${queryArguments}) {
				pageInfo {
					hasNextPage
					endCursor
				}
				edges {
					node {
						${fieldString}
					}
				}
			}
		}
	`);

	// make a reference to the 'edges' and page info props of the response object
	// -> the edges are the actual content we need
	let { edges, pageInfo } = await response.data[type];

	// if a previous response was passed in, append it to our current response (edges array)
	if (previousResponse) {
		edges = [...previousResponse, ...edges];
	}

	// if we're done, stop and return the data
	if (!pageInfo.hasNextPage) {
		return edges;
	}

	// otherwise, recursively run this function again to fetch the next batch of data
	return await queryAll({
		cursor: pageInfo.endCursor,
		fieldString,
		previousResponse: edges,
		sortBy,
		type
	});
}

module.exports = {
	blockQueries,
	convertColorToHSL,
	getEditionDimensions,
	getImageVersions,
	getString,
	renderBlockContent,
	query,
	queryAll
}
