<script context="module">
	export async function preload({ params, query }) {
		const { year, month, day, slug } = params
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const response = await this.fetch(`blog/${year}/${month}/${day}/${slug}.json`);
		const data = await response.json()

		if (response.status !== 200) {
			this.error(response.status, data.message)
			return
		}

		return {
			post: data,
			date: {
				year: Number(year),
				month: (Number(month) - 1),
				day: Number(day)
			}
		}
	}
</script>

<script>
	import { format } from 'date-fns'
	import Cover from '@/components/Cover.svelte'
	import Figure from '@/components/Figure.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import PostBody from '@/components/PostBody.svelte'
	import ResponsiveImage from '@/components/ResponsiveImage.svelte'
	import Wrapper from '@/components/Wrapper.svelte'
	import PaginationNav from '@/components/PaginationNav.svelte'

	export let post
	export let date

	$: prevPost = post.previous && {
		direction: 'previous',
		path: post.previous.path
	}
	$: nextPost = post.next && {
		direction: 'next',
		path: post.next.path
	}
	$: paginationNavItems = [ prevPost, nextPost ].filter(Boolean)

	function formatDate(formatString) {
		return format(new Date(date.year, date.month, date.day), formatString)
	}
</script>

<PageTitle title="{post.title}" />

<article class="padding-x-outside padding-y-xwide">
	<header>
		<Wrapper
			width="wide"
			class="blog-heading"
		>
			<h1>{post.title}</h1>
			{#if post.subtitle}
				<p class="type-subheading type-scale-beta">
					{post.subtitle}
				</p>
			{/if}

			{#if post.cover && post.cover.image}
				<Cover
					class="padding-top-wide"
					sources={post.cover.image}
					alt={post.cover.alt}
					caption={post.cover.caption}
					credit={post.cover.credit}
					border={post.cover.border}
				/>
			{/if}
		</Wrapper>
		<Wrapper class="border-bottom margin-bottom padding-bottom-xnarrow padding-top-xwide">
			<time
				class="color-fg-secondary type-font-accent type-scale-zeta type-weight-light"
				datetime={formatDate('yyyy-M-dd')}
			>
				{formatDate('MMMM d, yyyy')}
			</time>
		</Wrapper>
	</header>

	<PostBody blocks={post.body} />
</article>
<nav class="border-seam-top padding-y-wide padding-x-outside">
	<PaginationNav items="{paginationNavItems}" />
</nav>

<style>
	@media screen and (min-width: 43em) {
		:global(.blog-heading) {
			text-align: center;
		}
	}
</style>