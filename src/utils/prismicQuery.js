import { PrismicLink } from 'apollo-link-prismic'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'
import fragmentTypes from '@/utils/prismicFragments.json'

const accessToken = process.env.PRISMIC_TOKEN

const fragmentMatcher = new IntrospectionFragmentMatcher(
  { introspectionQueryResultData: fragmentTypes },
)

const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://jpw-api.cdn.prismic.io/graphql",
    accessToken
  }),
  cache: new InMemoryCache({ fragmentMatcher })
})

export function getImageVersions (
  imageField,
  versions = ['Small', 'Medium', 'Large']
) {
  if (imageField[versions[0]]) {
    return versions.map((version) => {
      return {
        path: imageField[version].url,
        size: imageField[version].dimensions.width
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

export const blockQueries = {
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

export default async function (queryString) {
	return await client.query({
		query: gql`${queryString}`
	})
}