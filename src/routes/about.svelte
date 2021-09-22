<script context="module">
	export async function preload() {
		const response = await this.fetch('about.json')
		const content = await response.json()

		if (response.status !== 200) {
			this.error(response.status, content.message)
			return
		}

		return { content }
	}
</script>

<script>
	import MainNav from '@/components/MainNav.svelte'
	import PageTheme from '@/components/PageTheme.svelte'
	import PageTitle from '@/components/PageTitle.svelte'
	import PostBody from '@/components/PostBody.svelte'
	import ResponsiveImage from '@/components/ResponsiveImage.svelte'
	import Wrapper from '@/components/Wrapper.svelte'

	// blocks
	import Passage from '@/components/Passage.svelte'
	import Figure from '@/components/Figure.svelte'

	export let content
	let { title, subtitle, body, highlight } = content
</script>

<PageTitle title="Profile" />
<PageTheme color="{highlight}" />

<MainNav segment="about" />
<main>
	<article class="
		padding-x-outside
		padding-y-xwide
	">
		<header>
			<Wrapper width="wide"class="padding-bottom-wide">
				<h1>{title}</h1>
				{#if subtitle}
					<p class="subtitle padding-top-xxnarrow type-font-accent type-weight-xlight color-fg-secondary type-scale-beta">
						{subtitle}
					</p>
				{/if}
			</Wrapper>
		</header>

		<!-- <PostBody blocks={content.body} /> -->
		<div class="blocks padding-y-flow-wide">
			{#each body as slice}
				<Wrapper
					width="{slice.prominence}"
					class="block-{slice.type}"
				>
					{#if slice.type === 'passage'}
						<Passage html="{slice.body}" />
					{/if}

					{#if slice.type === 'figure'}
						<div class="type-align-center">
							<figure>
								<ResponsiveImage
									sources="{slice.image}"
									alt="{slice.alt}"
									border="{slice.border}"
								/>
								{#if slice.caption}
									<figcaption>{@html slice.caption}</figcaption>
								{/if}
							</figure>
						</div>
					{/if}
				</Wrapper>
			{/each}
		</div>
	</article>
</main>

<style>
	@media screen and (min-width: 40em) {
		h1, .subtitle {
			text-align: center;
		}
	}

	.blocks :global(.block-heading + .block-passage) {
	  padding-top: var(--space-narrow);
	}

	/* when two sections of type follow one another, add "invisible" spacing between so they feel like one continuous flow of text */
	.blocks :global(.block-passage + .block-passage) {
	  padding-top: var(--space-medium);
	}
</style>
