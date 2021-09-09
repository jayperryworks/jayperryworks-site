<script context="module">
	export async function preload({ params, query }) {
		const { year, slug } = params
		const response = await this.fetch(`design/${year}/${slug}.json`)
		const data = await response.json()

		if (response.status !== 200) {
			this.error(response.status, data.message)
			return
		}

		return {
			post: data,
			date: { year }
		}
	}
</script>

<script>
	import { format } from 'date-fns'
	import { titleize } from '@/utils/stringHelpers.js'
	import MainNav from '@/components/MainNav.svelte'
	import Metadata from '@/components/Metadata.svelte'
	import PageTheme from '@/components/PageTheme.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import PostBody from '@/components/PostBody.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let post

	$: credits = Object.keys(post.metadata).map((label) => {
		let value = post.metadata[label]

		if (Array.isArray(value)) {
			value = Object.values(value)
			// console.log(value)
			value[0] = titleize(value[0])
		} else {
			value = titleize(String(value))
		}

		return {
			label: titleize(label),
			value
		}
	})
</script>

<PageTitle title="{post.title}" />
<PageTheme color="{post.highlight}" />

<MainNav segment="design" />

<article>
	<header class="padding-x-outside padding-top-xwide type-align-center">
		<Wrapper width="xwide">
			<h1>{post.title}</h1>
			{#if post.subtitle}
				<p class="type-subheading type-scale-gamma">
					{post.subtitle}
				</p>
			{/if}
		</Wrapper>
	</header>

	<PostBody blocks={post.body} class="padding-x-outside padding-y-wide" />
	
	<!-- credits -->
	<aside class="border-seam-top padding-x-outside padding-y-xwide">
		<h2 class="padding-bottom type-align-center">Credits</h2>
		<Wrapper width="xwide">
			<Metadata data="{credits}" gutter="medium" />
		</Wrapper>
	</aside>
</article>