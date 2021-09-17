<script context="module">
	export async function preload({ params, query }) {
		const { year, slug } = params
		const response = await this.fetch(`design/${year}/${slug}.json`)
		const data = await response.json()

		if (response.status !== 200) {
			this.error(response.status, data.message)
			return
		}

		// grab the list of projects for the next/prev nav
		// -> TODO get this from the store after the index page populates it?
		const list = await this.fetch('design.json')
		const listData = await list.json()
		const currentPost = listData.toc.items.indexOf(
			listData.toc.items.find(item => item.slug === slug)
		)

		if (list.status !== 200) {
			this.error(list.status, listData.message)
			return
		}

		let prevPage, nextPage
		if (listData.toc.items[currentPost - 1]) {
			const project = listData.toc.items[currentPost - 1]
			prevPage = {
				direction: 'previous',
				label: project.title,
				...project
			}
		}

		if (listData.toc.items[currentPost + 1]) {
			const project = listData.toc.items[currentPost + 1]
			nextPage = {
				direction: 'next',
				label: project.title,
				...project
			}
		}

		return {
			post: data,
			date: { year },
			prevPage,
			nextPage
		}
	}
</script>

<script>
	import { format } from 'date-fns'
	import { titleize } from '@/utils/stringHelpers.js'
	import index from 'icons/index.svg'
	import Icon from '@/components/Icon.svelte'
	import MainNav from '@/components/MainNav.svelte'
	import Metadata from '@/components/Metadata.svelte'
	import PageTheme from '@/components/PageTheme.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import PaginationNav from '@/components/PaginationNav.svelte'
	import PostBody from '@/components/PostBody.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let post, prevPage, nextPage

	// format the credits content for the Metadata component below
	$: credits = Object.keys(post.metadata).map((label) => {
		let value = post.metadata[label]

		// if the metadata item has more than one value, capitalize the first
		if (Array.isArray(value)) {
			value = Object.values(value)
			value[0] = titleize(value[0])
		// otherwise, capitalize the string
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

<main>
	<article>
		<header class="padding-x-outside padding-top-xwide type-align-center">
			<Wrapper width="xwide">
				<h1>{post.title}</h1>
				{#if post.client}
					<p class="type-subheading type-scale-gamma">
						{post.client}
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

	<!-- pagination nav -->
	{#if prevPage || nextPage}
		<nav class="border-seam-top padding-x-outside padding-y-xwide">
			<header class="padding-bottom-wide hide-overflow">
			  <div class="footer-nav-header gutter-wrapper">
			    <h2 class="gutter">More design work</h2>
			    <a
			      href="design"
			      class="gutter | type-font-accent type-link-undecorated type-weight-light | color-fg-secondary"
			    >
			      See all
			      <Icon
			        margin="left"
			        size="large"
			        svg={index}
			      />
			    </a>
			  </div>
			</header>
			<PaginationNav items="{[ prevPage, nextPage ]}" itemWidth="{25}" />
		</nav>
	{/if}
</main>

<style>
	@supports (display: flex) {
		.footer-nav-header {
		  display: flex;
		  justify-content: space-between;
		  flex-wrap: wrap;
		  align-items: center;
		}
	}
</style>