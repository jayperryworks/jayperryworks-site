<script context="module">
	export async function preload() {
		const response = await this.fetch('index.json')
		const data = await response.json()

		if (response.status !== 200) {
			this.error(response.status, data.message)
			return
		}

		return { content: data }
	}
</script>

<script>
	import { onDestroy } from 'svelte'
	import { format } from 'date-fns'
	import arrow from 'icons/arrow-right.svg'
	import Button from '@/components/Button.svelte'
	import Card from '@/components/HomeTOCCard.svelte'
	import Gallery from '@/components/Gallery.svelte'
	import Icon from '@/components/Icon.svelte'
	import MainNav from '@/components/MainNav.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import ResponsivePicture from '@/components/ResponsivePicture.svelte'
	import TocPanel from '@/components/TocPanel.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let content

	// --- "Favorite things" (I like ... ) rotating subheading ---
	let favoriteThings = []

	function randomFavorites () {
		favoriteThings = Object.keys(content.favoriteThings).map((type) => {
			const list = content.favoriteThings[type]
			return list[Math.floor(Math.random() * list.length)]
		})
	}

	$: favoriteThingsSubhead = `I like ${
		favoriteThings.map((thing, index) => {
			if (index == (favoriteThings.length - 1)) {
				return `and ${thing}`
			}
			return thing
		}).join(', ')
	}.`

	randomFavorites()
	const cycleFavorites = setInterval(randomFavorites, 5000)
	onDestroy(() => clearInterval(cycleFavorites))

	function date(date, template = 'MM/dd') {
		return format(new Date(date.year, date.month, date.day), template)
	}
</script>

<style type="text/scss">
	.home {
		display: block;

		@supports (display: flex) {
			display: flex;
			flex-direction: column;
			flex: 1;
		}
	}

	.intro {
		min-height: 70vh;
	}
</style>

<PageTitle />

<MainNav overlay />

<div class="home">
	<section class="intro | display-flex display-flex-column display-flex-justify-center | padding-top-xwide">

		<!-- intro -->
		<div class="padding-x-outside">
			<Wrapper width="xwide">
				<Wrapper centered={false}>
					<h1 class="t-scale-beta">{content.intro}</h1>
					{#if favoriteThings.length > 0}
						<p class="c-fg-tertiary | margin-top-xnarrow | t-font-accent t-heading t-scale-gamma">
							{favoriteThingsSubhead}
						</p>
					{/if}
					<Button
						prefetch={true}
						href="about"
						iconRight={arrow}
						class="margin-top"
					>
						A bit more about me
					</Button>
				</Wrapper>
			</Wrapper>
		</div>
	</section>

	<!-- TOC -->
	<section>
		<header class="padding-bottom padding-x-outside">
			<Wrapper width="xwide">
				<h2 class="t-case-upper t-font-accent t-scale-eta t-weight-bold">
					Table of contents
				</h2>
			</Wrapper>
		</header>
		{#each content.tableOfContents as item, i}
			<TocPanel number="0{i + 1}" link={item.link} heading={item.heading}>
				{#if item.content.type == 'image'}
					{#each item.content.images as image}
						{image}
					{/each}
				{/if}
				{#if item.content.type == 'list'}
					<Gallery gutter="wide">
						{#each item.content.posts as post}
							<li>
								<time
									class="c-fg-tertiary | display-block | padding-bottom-xnarrow | t-font-accent t-scale-eta"
									datetime={date(post.date, 'yyyy-M-dd')}
								>
									{date(post.date)}
								</time>
								<h4 class="t-scale-gamma">
									<a href="{post.path}">{post.title}</a>
								</h4>
							</li>
						{/each}
					</Gallery>
				{/if}
			</TocPanel>
		{/each}
	</section>
</div>
