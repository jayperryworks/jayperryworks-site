const { InMemoryCache, IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');
const { PrismicLink } = require('apollo-link-prismic');
const ApolloClient = require('apollo-client');
const fragmentTypes = require('./prismicFragments.json');
const gql = require('graphql-tag');

const accessToken = process.env.PRISMIC_TOKEN;

const fragmentMatcher = new IntrospectionFragmentMatcher(
  { introspectionQueryResultData: fragmentTypes },
);

const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://jpw-api.cdn.prismic.io/graphql",
    accessToken
  }),
  cache: new InMemoryCache({ fragmentMatcher })
});

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

// set width and height depending on Landscape/Portrait orientation
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

const blockQueries = {
  heading: (typename = 'PageBodyHeading') => `
    ...on ${typename} {
      type
      primary {
        title1
        level
        subheading
      }
    }
  `,
  passage: (typename = 'PageBodyPassage') => `
    ... on ${typename} {
      type
      primary {
        markdown
        include_in_excerpt
      }
    }
  `,
  figure: (typename = 'PageBodyFigure') => `
    ... on ${typename} {
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
  imageGallery: (typename = 'PageBodyImage_gallery') => `
    ... on ${typename} {
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

async function query (queryString) {
	return await client.query({
		query: gql`${queryString}`
	})
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
	getEditionDimensions,
	getImageVersions,
	query,
	queryAll
}
