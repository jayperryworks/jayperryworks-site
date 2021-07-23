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

<PageTitle highlightColor = "{{ h: 50, s: 10, l:90 }}" />

<MainNav segment="/" overlay />

<main class="fill-vertical">

	<!-- intro -->
	<Panel
		border="{false}"
		padding="{{
			x: 'outside',
			top: 'xwide',
			bottom: 'narrow'
		}}"
	>
		<Wrapper
			class="fill-vertical | padding-top-wide"
			flex
			width="xwide"
		>
			<header class="fill-vertical justify-center | padding-bottom-xwide">
				<Wrapper width="wide" centered={false}>
					<h1 class="type-leading-xtight">{@html intro.headline}</h1>
				</Wrapper>
				<Wrapper 
					centered={false}
					class="type-scale-delta type-heading type-leading-default | padding-top padding-bottom-wide"
				>
					<Passage html={intro.blurb}/>
				</Wrapper>
				<Button
					href={intro.cta.link}
					iconRight={arrowRight}
					prefetch={true}
				>
					{intro.cta.label}
				</Button>
			</header>

			<!-- TOC link -->
			<div class="toc-link">
				<a
					class="type-link-undecorated type-font-accent type-weight-light type-scale-eta"
					href={`#${pictures.slug}`}
				>
					<Icon
						align="baseline"
					  margin="right"
					  svg={arrowDown}
					/>
					Table of contents
				</a>
			</div>
		</Wrapper>
	</Panel>

	<!-- pictures -->
	<Panel id={pictures.slug}>
		<header class="padding-bottom-wide">
			<Wrapper width="xwide">
				<a
					class="toc-number type-scale-gamma type-font-accent type-link-undecorated type-weight-xlight | color-fg-secondary | padding-bottom-narrow"
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
			class="fill-vertical"
			width="xwide"
			flex
		>
			<div class="flag">
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
							contain
						/>
					</a>
				</div>
			</div>
		</Wrapper>
	</Panel>

	<!-- blog -->
	<Panel id={blog.slug} class="padding-y-flow-wide">
		<header>
			<Wrapper width="xwide">
				<a
					class="toc-number type-scale-gamma type-font-accent type-link-undecorated type-weight-xlight | color-fg-secondary | padding-bottom-narrow"
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
			class="fill-vertical justify-center"
			width="xwide"
			flex
		>
			<Gallery gutter="xwide">
				{#each blog.list.posts as post, index}
					<li
						class:medium:show="{index >= 4 && index < 6}"
						class:xlarge:show="{index >= 6}"
					>
						<time
							class="color-fg-secondary | display-block | padding-bottom-xnarrow | type-font-accent type-weight-light type-scale-eta"
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
							<p class="type-heading type-scale-delta type-font-accent type-weight-light | color-fg-secondary | padding-top-xxnarrow">
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
		:global(.fill-vertical) {
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		.justify-center {
			justify-content: center;
			align-items: flex-start;
		}

		.toc-link {
			display: block;
			margin-top: auto;
		}

		.flag {
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			flex: 1;
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
		}
	}
</style>