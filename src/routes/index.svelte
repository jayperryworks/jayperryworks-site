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
	import Panel from '@/components/Panel.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let content

	let { intro } = content
	let { pictures, blog } = content.tableOfContents

	function date(date, template = 'MM.dd') {
		return format(new Date(date.year, date.month, date.day), template)
	}
</script>

<PageTitle />

<MainNav segment="/" overlay />

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
					<h1 class="type-scale-alpha">{@html intro.headline}</h1>
				</Wrapper>
				<Wrapper 
					class="type-scale-delta type-heading type-leading-default | padding-top"
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
					class="type-link-undecorated type-case-upper type-fontype-accent type-scale-eta type-weightype-bold"
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
	<Panel id={pictures.slug}>
		<header class="padding-bottom-wide">
			<Wrapper width="xwide">
				<a
					class="toc-number type-scale-gamma type-font-accent type-link-undecorated | color-fg-secondary | padding-bottom-narrow"
					href={pictures.cta.link}
				>
					01
				</a>
				<h2 class="type-scale-alpha">
					<a href={pictures.cta.link}>{pictures.heading}</a>
				</h2>
			</Wrapper>
		</header>
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
							<Passage html={pictures.blurb} class="type-scale-delta type-heading type-leading-default"/>
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
						class="cover-image | type-link-undecorated"
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
	</Panel>

	<!-- blog -->
	<Panel id={blog.slug}>
		<header class="padding-bottom-wide">
			<Wrapper width="xwide">
				<a
					class="toc-number type-scale-gamma type-font-accent type-link-undecorated | color-fg-secondary | padding-bottom-narrow"
					href={blog.cta.link}
				>
					02
				</a>
				<h2 class="type-scale-alpha">
					<a href={blog.cta.link}>{blog.heading}</a>
				</h2>
			</Wrapper>
		</header>
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
							class="c-fg-tertiary | display-block | padding-bottom-xnarrowRight | type-fontype-accent type-scale-eta"
							datetime={date(post.date, 'yyyy-M-dd')}
						>
							<a
								class="type-link-undecorated"
								href={post.path}
							>
								{date(post.date)}
							</a>
						</time>
						<h4 class="type-scale-gamma">
							<a href="{post.path}">{post.title}</a>
						</h4>
						{#if post.subtitle}
							<p class="type-heading type-scale-delta type-fontype-accent | c-fg-tertiary | padding-top-xxnarrowRight">
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
	</Panel>
</main>

<style>
	.toc-number {
		display: block;
	}

	.toc-link {
		display: none;
	}

	.cover-image {
		display: block;
		position: relative;
		height: 50vh;
	}

	@supports (display: flex) {
		.panel {
			min-height: 100vh;
			display: flex;
			flex-direction: column;
			flex: 1;
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