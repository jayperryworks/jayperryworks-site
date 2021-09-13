import { PrismicLink } from 'apollo-link-prismic'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'
import accessToken from '@root/prismic.config.js'

const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://jpw-api.cdn.prismic.io/graphql",
    accessToken
  }),
  cache: new InMemoryCache()
})

export default async function (queryString) {
	return await client.query({
		query: gql`${queryString}`
	})
}