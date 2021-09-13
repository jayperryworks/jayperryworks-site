<script context="module">
	import prismic from '@/utils/prismicQuery.js'

	export async function preload() {
		try {
			const response = await prismic(`
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
			)

			const { title, subtitle, body } = await response.data.page

			return {
				title: title[0].text,
				subtitle: subtitle?.[0]?.text || null,
				body
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

	export let title, subtitle, body
	export let highlight = null

</script>

<PageTitle title="Profile" />
<PageTheme color="{highlight}" />

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
			</Wrapper>
		</header>

		<!-- <PostBody blocks={content.body} /> -->
	</article>
</main>

<style>
	@media screen and (min-width: 40em) {
		h1, .subtitle {
			text-align: center;
		}
	}
</style>
