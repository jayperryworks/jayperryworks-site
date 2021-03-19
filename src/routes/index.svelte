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
	import arrowDown from 'icons/arrow-down.svg'
	import arrowRight from 'icons/arrow-right.svg'
	import Bookend from '@/components/Bookend.svelte'
	import Button from '@/components/Button.svelte'
	import Card from '@/components/HomeTOCCard.svelte'
	import FavoriteThings from '@/components/FavoriteThings.svelte'
	import Gallery from '@/components/Gallery.svelte'
	import Icon from '@/components/Icon.svelte'
	import MainNav from '@/components/MainNav.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import Passage from '@/components/Passage.svelte'
	import ResponsivePicture from '@/components/ResponsivePicture.svelte'
	import TocPanel from '@/components/TocPanel.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let content

	let { intro } = content
	let { pictures, blog } = content.tableOfContents

	function date(date, template = 'MM.dd') {
		return format(new Date(date.year, date.month, date.day), template)
	}
</script>

<PageTitle />

<MainNav overlay />

<main class="display-flex display-flex-column display-flex-fill">

	<!-- intro -->
	<section class="intro | display-flex display-flex-column display-flex-fill | padding-top-xwide padding-x-outside">
		<Wrapper
			class="display-flex display-flex-column display-flex-fill | padding-top-wide"
			width="xwide"
			flex
		>
			<div class="display-flex display-flex-column display-flex-fill display-flex-justify-center display-flex-align-start | padding-bottom-xwide">
				<Wrapper width="wide" centered={false}>
					<h1 class="t-scale-alpha">{@html intro.headline}</h1>
				</Wrapper>
				<Wrapper 
					class="t-scale-delta t-heading t-leading-default | padding-top"
					centered={false}
				>
					{@html intro.blurb}
				</Wrapper>
				<Button
					prefetch={true}
					href={intro.cta.link}
					iconRight={arrowRight}
					class="margin-top-wide"
				>
					{intro.cta.label}
				</Button>
			</div>
			<nav class="toc-link | padding-bottom-narrow">
				<a
					class="t-link-undecorated t-case-upper t-font-accent t-scale-eta t-weight-bold"
					href={`#${pictures.slug}`}
				>
					<Icon
					  margin="right"
					  svg={arrowDown}
					/>
					Table of contents
				</a>
			</nav>
		</Wrapper>
	</section>

	<!-- TOC -->
	<!-- pictures -->
	<TocPanel 
		heading={pictures.heading}
		id={pictures.slug}
		link={pictures.cta.link}
		number={1}
	>
		<Wrapper
			class="display-flex-column display-flex-fill"
			width="xwide"
			flex
		>
			<Wrapper centered={false} class="margin-y-between-wide">
				
				{#if pictures.blurb}
					<Passage html={pictures.blurb}/>
				{/if}
				{#if pictures.cta}
					<Button
						prefetch={true}
						href={pictures.cta.link}
						iconRight={arrowRight}
					>
						{pictures.cta.label}
					</Button>
				{/if}
			</Wrapper>
			<a
				class="cover-image | t-link-undecorated"
				href={pictures.cta.link}
			>
				<ResponsivePicture
					sources={pictures.coverImage.versions}
					alt={pictures.heading}
					fill
				/>
			</a>
		</Wrapper>
	</TocPanel>

	<!-- blog -->
	<TocPanel
		number={2}
		link={blog.cta.link}
		heading={blog.heading}
		id={blog.slug}
	>
		<Wrapper
			class="display-flex-fill display-flex display-flex-column display-flex-justify-center"
			width="wide"
			flex
		>
			<Gallery gutter="xwide" style="--min-width: 300px;">
				{#each blog.list.posts as post}
					<li>
						<time
							class="c-fg-tertiary | display-block | padding-bottom-xnarrowRight | t-font-accent t-scale-eta"
							datetime={date(post.date, 'yyyy-M-dd')}
						>
							<a
								class="t-link-undecorated"
								href={post.path}
							>
								{date(post.date)}
							</a>
						</time>
						<h4 class="t-scale-gamma">
							<a href="{post.path}">{post.title}</a>
						</h4>
						{#if post.subtitle}
							<p class="t-heading t-scale-delta t-font-accent | c-fg-tertiary | padding-top-xxnarrowRight">
								<a href={post.path}>{post.subtitle}</a>
							</p>
						{/if}
					</li>
				{/each}
			</Gallery>
		</Wrapper>
		<div>
			{#if blog.cta}
				<Button
					prefetch={true}
					href={blog.cta.link}
					iconRight={arrowRight}
				>
					{blog.cta.label}
				</Button>
			{/if}
		</div>
	</TocPanel>
</main>

<style>
	.toc-link {
		display: none;
	}

	.cover-image {
		display: block;
		position: relative;
		height: 50vh;
	}
	
	@media screen and (min-width: 100em) {
		.cover-image {

		}
	}

	@supports (display: flex) {
		.intro {
			min-height: 100vh;
		}

		.toc-link {
			display: block;
			margin-top: auto;
		}
	}
</style>