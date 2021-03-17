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
	import FavoriteThings from '@/components/FavoriteThings.svelte'
	import Gallery from '@/components/Gallery.svelte'
	import Icon from '@/components/Icon.svelte'
	import MainNav from '@/components/MainNav.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import ResponsivePicture from '@/components/ResponsivePicture.svelte'
	import TocPanel from '@/components/TocPanel.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	export let content

	function date(date, template = 'MM.dd') {
		return format(new Date(date.year, date.month, date.day), template)
	}
</script>

<PageTitle />

<MainNav overlay />

<div class="home">
	<section class="intro | display-flex display-flex-column display-flex-justify-center | padding-top-xwide">

		<!-- intro -->
		<div class="padding-x-outside padding-y-wide">
			<Wrapper width="xwide">
				<Wrapper width="wide" centered={false}>
					<h1 class="t-scale-alpha">{@html content.intro.headline}</h1>
				</Wrapper>
				<Wrapper 
					class="t-scale-delta t-heading t-leading-default | padding-top"
					centered={false}
				>
					{@html content.intro.blurb}
				</Wrapper>
				<Button
					prefetch={true}
					href={content.intro.cta.link}
					iconRight={arrow}
					class="margin-top-wide"
				>
					{content.intro.cta.label}
				</Button>
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

		<!-- pictures -->
		<TocPanel
			number={1}
			link={content.tableOfContents.pictures.cta.link}
			heading={content.tableOfContents.pictures.heading}
			cta={content.tableOfContents.pictures.cta}
			intro={content.tableOfContents.pictures.blurb}
		>
			<Wrapper
				class="display-flex display-flex-column display-flex-fill"
				width="xwide"
				centered
				flex
			>
				<a
					class="display-flex-fill | t-link-undecorated"
					href={content.tableOfContents.pictures.cta.link}
				>
					<ResponsivePicture
						sources={content.tableOfContents.pictures.coverImage.versions}
						alt={content.tableOfContents.pictures.heading}
						fill
					/>
				</a>
			</Wrapper>
		</TocPanel>

		<!-- blog -->
		<TocPanel
			number={2}
			link={content.tableOfContents.blog.cta.link}
			heading={content.tableOfContents.blog.heading}
			cta={content.tableOfContents.blog.cta}
		>
			<Wrapper
				class="display-flex-fill display-flex display-flex-column display-flex-justify-center"
				width="xwide"
				centered
				flex
			>
				<Wrapper width="wide" centered={false}>
					<Gallery gutter="xwide" style="--min-width: 300px;">
						{#each content.tableOfContents.blog.list.posts as post}
							<li>
								<time
									class="c-fg-tertiary | display-block | padding-bottom-xnarrow | t-font-accent t-scale-eta"
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
									<p class="t-heading t-scale-delta t-font-accent | c-fg-tertiary | padding-top-xxnarrow">
										<a href={post.path}>{post.subtitle}</a>
									</p>
								{/if}
							</li>
						{/each}
					</Gallery>
				</Wrapper>
			</Wrapper>
		</TocPanel>
	</section>
</div>

<style>
	.home {
		display: block;
	}

	@supports (display: flex) {
		.home {
			display: flex;
			flex-direction: column;
			flex: 1;
		}
	}

	.intro {
		min-height: 80vh;
	}
</style>