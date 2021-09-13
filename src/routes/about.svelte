<script context="module">
	import { PrismicLink } from 'apollo-link-prismic'
	import { InMemoryCache } from 'apollo-cache-inmemory'
	import ApolloClient from 'apollo-client'
	import gql from 'graphql-tag'
	import accessToken from '@root/prismic.config.js'

	export async function preload() {
		const client = new ApolloClient({
		  link: PrismicLink({
		    uri: "https://jpw-api.cdn.prismic.io/graphql",
		    accessToken
		  }),
		  cache: new InMemoryCache()
		})

		try {
			const response = await client.query({
				query: gql`
					query{
						page(uid: "about", lang: "en-us") {
					    title
					    subtitle
					    body {
					      __typename
					    }
					  }
					}
				`
			})

			return {
				content: await response.data.page
			}
		} catch (error) {
			this.error(error)
		}
	}
</script>

<script>
	import Cover from '@/components/Cover.svelte'
	import MainNav from '@/components/MainNav.svelte'
	import PageTheme from '@/components/PageTheme.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import PostBody from '@/components/PostBody.svelte'
	import ResponsiveImage from '@/components/ResponsiveImage.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let content

	$: title = content.title[0].text
	$: subtitle = content.subtitle?.[0]?.text || null

</script>

<PageTitle title="Profile" />
<PageTheme color="{content.highlight}" />

<MainNav segment="about" />
<main>
	<article class="
		padding-x-outside
		padding-y-xwide
	">
		<header>
			<Wrapper width="wide"class="padding-bottom-wide">
				<h1>{title}</h1>
				{#if subtitle}
					<p class="subtitle padding-top-xxnarrow type-font-accent type-weight-xlight color-fg-secondary type-scale-beta">
						{subtitle}
					</p>
				{/if}
				{#if content.cover}
					<Cover
						class="padding-top-wide"
						sources={content.cover.image}
						alt={content.cover.alt}
						caption={content.cover.caption}
						credit={content.cover.credit}
					/>
				{/if}
			</Wrapper>
		</header>

		<PostBody blocks={content.body} />
	</article>
</main>

<style>
	@media screen and (min-width: 40em) {
		h1, .subtitle {
			text-align: center;
		}
	}
</style>
