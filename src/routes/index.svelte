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
	import Button from '@/components/Button.svelte'
	import Gallery from '@/components/Gallery.svelte'
	import Icon from '@/components/Icon.svelte'
	import MainNav from '@/components/MainNav.svelte'
	import OutdentedBlurb from '@/components/OutdentedBlurb.svelte'
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
					<Passage html={intro.blurb}/>
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

			<!-- TOC link -->
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

	<!-- pictures -->
	<TocPanel 
		heading={pictures.heading}
		id={pictures.slug}
		link={pictures.cta.link}
		number={1}
	>
		<Wrapper
			class="display-flex-fill display-flex display-flex-column"
			width="xwide"
			flex
		>
			<div class="flag display-flex-fill">
				<div class="flag-item blurb">
					<Wrapper
						class="margin-y-flow-wide"
						centered={false}
					>
						
						{#if pictures.blurb}
							<Passage html={pictures.blurb} class="t-scale-delta t-heading t-leading-default"/>
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
				</div>
				<div class="flag-item image">
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
				</div>
			</div>
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
			width="xwide"
			flex
		>
			<Gallery gutter="xwide" style="--min-width: 300px;">
				{#each blog.list.posts as post, index}
					<li
						class:hide-below@xlarge={index >= 6}
						class:hide-below@medium={index >= 4}
					>
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
		<Wrapper width="xwide" flex>
			{#if blog.cta}
				<Button
					prefetch={true}
					href={blog.cta.link}
					iconRight={arrowRight}
				>
					{blog.cta.label}
				</Button>
			{/if}
		</Wrapper>
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

	@supports (display: flex) {
		.intro {
			min-height: 100vh;
		}

		.toc-link {
			display: block;
			margin-top: auto;
		}

		.flag {
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
		}

		.flag-item {
			display: flex;
			flex-direction: column;
		}

		.flag-item.blurb {
			flex: 0 1 50ch;
		}

		.flag-item.image {
			flex: 1 1 600px;
			justify-content: center;
		}
	}
</style>