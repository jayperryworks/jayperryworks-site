<script context="module">
	export async function preload({ params, query }) {
	  const response = await this.fetch('design.json');
	  const data = await response.json();

	  if (response.status !== 200) {
	    this.error(response.status, data.message);
	    return;
	  }

	  return { content: data };
	}
</script>

<script>
	import arrowRight from 'icons/arrow-right.svg';
	import Button from '@/components/Button.svelte';
	import Collage from '@/components/Collage.svelte';
	import DeviceFrame from '@/components/DeviceFrame.svelte';
	import Gallery from '@/components/Gallery.svelte';
	import MainNav from '@/components/MainNav.svelte';
	import PageTheme from '@/components/PageTheme.svelte';
	import PageTitle from '@/components/PageTitle.svelte';
	import Panel from '@/components/Panel.svelte';
	import Passage from '@/components/Passage.svelte';
	import ResponsivePicture from '@/components/ResponsivePicture.svelte';
	import Wrapper from '@/components/Wrapper.svelte';

	export let content;
	let { title, intro, clients, toc } = content;
</script>

<PageTitle title="Design" />
<PageTheme />

<MainNav segment="design" />

<header class="padding-x-outside padding-top-xwide padding-y-flow">
	<h1>{title}</h1>
	<Passage html="{intro}" />
</header>

<section class="padding-x-outside padding-top-wide padding-y-flow">
	<h2>{clients.title}</h2>
	<Passage html="{clients.intro}" />
	<Wrapper centered="{false}">
		<Gallery bullets class="no-padding-top">
			{#each clients.items as client}
				<li><span class="type-scale-epsilon bullet">{client}</span></li>
			{/each}
		</Gallery>
	</Wrapper>
</section>

<section class="padding-top-wide">
	<header class="padding-x-outside padding-bottom-wide padding-y-flow">
		<h2>{toc.title}</h2>
		<Passage html="{toc.intro}" />
	</header>
	{#each toc.items as project}
		<Panel id="{project.slug}" centered>
			<Wrapper width="xxwide" flex>
				<div class="flag">
					<div class="flag-item figure">
						<Collage>
							{#each project.images as image}
								<div class="{image.width || 'default'} {image.priority ? `priority:${image.priority}` : 'priority:1'}">
									{#if image.device}
										<DeviceFrame
											image="{image.source.versions}"
											alt="{image.alt || project.title}"
											type="{image.device}"
										/>
									{:else}
										<ResponsivePicture
											sources="{image.source.versions}"
											alt="{image.alt || project.title}"
											class="margin-x-auto"
										/>
									{/if}
								</div>
							{/each}
						</Collage>
					</div>
					<div class="flag-item blurb">
						<h3>{project.title}</h3>
						<p class="type-subheading type-scale-delta padding-bottom">
							{project.subhead}
						</p>
						<Button
							iconRight="{arrowRight}"
							href="{project.path}"
						>
							Read more
						</Button>
					</div>
				</div>
			</Wrapper>
		</Panel>
	{/each}
</section>

<style>
	.bullet {
		padding-left: 1em;
		display: block;
	}

	.bullet::before {
		content: '\2022';
		line-height: var(--type-leading-default);
		display: block;
		position: absolute;
		top: 0;
		left: 0;
	}

	.flag {
		--gutter: var(--space-medium);

		display: grid;
		grid-gap: var(--gutter);
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		align-items: center;
	}

	@media screen and (min-width: 50em) {
		.flag {
			--gutter: var(--space-wide);
		}
	}

	.flag-item.figure {
		text-align: center;
		padding-bottom: 1em;
		padding-bottom: var(--gutter);
	}

	@supports (display: grid) {
		.flag-item.figure {
			padding-bottom: 0;
		}
	}

	@media screen and (min-width: 25em) {
		.flag-item.figure {
			grid-column: span 2;
		}
	}

	.flag :global(img) {
		max-height: 80vh;
	}
</style>
