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
	import PageTheme from '@/components/PageTheme.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import PostBody from '@/components/PostBody.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let post
</script>

<PageTitle title="{post.title}" />
<PageTheme color="{post.highlight}" />

<article class="padding-x-outside padding-y-xwide">
	<header>
		<Wrapper>
			<h1>{post.title}</h1>
			{#if post.subtitle}
				<p class="type-subheading type-scale-beta">
					{post.subtitle}
				</p>
			{/if}
		</Wrapper>
	</header>
	<aside>
		<dl>
			{#each Object.keys(post.metadata) as label}
				<div>
					<dt>{label}</dt>
					{#if Array.isArray(post.metadata[label])}
						{#each Object.values(post.metadata[label]) as value}
							<dd>{value}</dd>
						{/each}
					{:else}
						<dd>{post.metadata[label]}</dd>
					{/if}
				</div>
			{/each}
		</dl>
	</aside>
	<!-- <PostBody blocks={post.body} /> -->
</article>